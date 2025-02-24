using System;
using AutoMapper;
using BiddService.AServices;
using BiddService.DTOs;
using BiddService.Models;
using Contract;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;

namespace BiddService.Controllers;


[ApiController]
[Route("api/[controller]")]

public class BidsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly GrpcAuctionClient _grpcAuctionClient;

    public BidsController(IMapper mapper, IPublishEndpoint publishEndpoint, GrpcAuctionClient grpcAuctionClient)
{
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
        _grpcAuctionClient = grpcAuctionClient;
    }

    [Authorize]
    [HttpPost]

    public async Task<ActionResult<BidsDto>> PlaceBid(string auctionId, int amount)
    {

        var auction = await DB.Find<AuctionsEntities>().OneAsync(auctionId);



        if (auction == null)
        {

           auction=_grpcAuctionClient.GetAuction(auctionId);
           if (auction==null ) return BadRequest("Nie mozna zatwierdzić oferty");
        
        
        }

        if (auction.Seller == User.Identity.Name)
        {
            return BadRequest("Nie możesz składać ofert dla swojej aukcji  ");
        }



        var bid = new Bids
        {

            Amount = amount,
            AuctionId = auctionId,
            Bidder = User.Identity.Name
        };

        if (auction.AuctionEnd < DateTime.UtcNow)
        {

            bid.BidStatus = BidStatus.Finished;

        }
        else
        {

            var highestBid = await DB.Find<Bids>()
                   .Match(a => a.AuctionId == auctionId)
                   .Sort(b => b.Descending(x => x.Amount))
                   .ExecuteFirstAsync();

            if (highestBid != null && amount > highestBid.Amount || highestBid == null)
            {
                bid.BidStatus = amount > auction.ReservePrice
                ? BidStatus.Accepted
                : BidStatus.AcceptedBelowReserve;

            }

            if (highestBid != null && bid.Amount <= highestBid.Amount)
            {

                bid.BidStatus = BidStatus.TooLow;

            }
        }


        await DB.SaveAsync(bid);
        await _publishEndpoint.Publish(_mapper.Map<PlacedBids>(bid));
        return Ok(_mapper.Map<BidsDto>(bid));


    }

    [HttpGet("{auctionId}")]
    public async Task<ActionResult<List<BidsDto>>> GetBidsForAuction(string auctionId)
    {

        var bids = await DB.Find<Bids>()
            .Match(a => a.AuctionId == auctionId)
            .Sort(b => b.Descending(a => a.BidTime))
            .ExecuteAsync();

        return bids.Select(_mapper.Map<BidsDto>).ToList();
    }

}

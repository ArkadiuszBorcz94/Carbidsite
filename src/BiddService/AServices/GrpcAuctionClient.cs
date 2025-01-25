using System;
using System.Reflection.Metadata;
using AuctionService;
using BiddService.Models;
using Grpc.Net.Client;
using MassTransit.Futures.Contracts;

namespace BiddService.AServices;

   
public class GrpcAuctionClient
{

private readonly ILogger<GrpcAuctionClient>_logger;
   private readonly IConfiguration _config;

public GrpcAuctionClient(ILogger<GrpcAuctionClient> logger, IConfiguration config)

{
   _logger=logger;
   _config=config;

}

public AuctionsEntities GetAuction(string id){

    _logger.LogInformation("Używam GRPC Service");
    var channel = GrpcChannel.ForAddress(_config["GrpcAuction"]);
    var client =new GrpcAuction.GrpcAuctionClient(channel);
    var request= new GetAuctionRequest{Id = id };

    try 
    {
        var reply =client.GetAuction(request);
        var auction= new AuctionsEntities
        {

                ID=reply.Auction.Id,
                AuctionEnd=DateTime.Parse(reply.Auction.AuctionEnd),
                Seller= reply.Auction.Seller,
                ReservePrice=reply.Auction.ReservePrice

            };
             return auction;  

    }
    catch(Exception ex){

        _logger.LogError(ex, "Nie można użyć servera Grpc");
        return null;
    }


}

}

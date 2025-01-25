using System;
using AuctionService.Data;
using Grpc.Core;

namespace AuctionService.AServices;

public class GrpcAuctionService: GrpcAuction.GrpcAuctionBase
{
    private readonly AuctionDbContext _dbContext;

    public GrpcAuctionService(AuctionDbContext dbContext)
{
        _dbContext = dbContext;
    }

    public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request, ServerCallContext context)
    {

        Console.WriteLine("----> Otrzymano rządanie GRPC dla aucji ");

        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(request.Id)) 
        ?? throw new RpcException(new Status(StatusCode.NotFound, "Nie znaleziono"));
        var response =new GrpcAuctionResponse
        {
            Auction= new GrpcAuctionModel
            {
                    AuctionEnd=auction.AuctionEnd.ToString(),
                    Id=auction.Id.ToString(),
                    ReservePrice=auction.ReservePrice,
                    Seller= auction.Seller

            }

        };
        return response;

    }

}

using System;
using AuctionService.Data;
using AuctionService.Entities;
using Contract;
using MassTransit;

namespace AuctionService.Consumers;

public class FinishedAuctionConsumer : IConsumer<FinishedAuctions>
{
   
    private readonly AuctionDbContext _dbContext;

    public FinishedAuctionConsumer(AuctionDbContext dbContext)
    {
       
        _dbContext = dbContext;
    }
    public async Task Consume(ConsumeContext<FinishedAuctions> context)
    {

        Console.WriteLine("--> Oferta konsumencka została zakończona");
       var auction=await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

       if(context.Message.ItemSold)

       {
        auction.Winner= context.Message.Winner;
        auction.SoldAmount=context.Message.Amount;

       }
        auction.Status = auction.SoldAmount > auction.ReservePrice
            ? Status.Finished :Status.ReserveNoMet;

            await _dbContext.SaveChangesAsync();
    }
}

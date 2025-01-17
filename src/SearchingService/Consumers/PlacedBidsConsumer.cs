using System;
using Contract;
using MassTransit;
using MongoDB.Entities;
using SearchingService.Models;

namespace SearchingService.Consumers;

public class PlacedBidsConsumer : IConsumer<PlacedBids>
{
    public async Task Consume(ConsumeContext<PlacedBids> context)
    {
        Console.WriteLine("Używamy PlacedBidConsumer");
        var auction =await DB.Find<Item>().OneAsync(context.Message.AuctionId);
        
        if(context.Message.BidStatus.Contains("Zaakceptowano")
        && context.Message.Amount>auction.CurrentHighBid)

{

            auction.CurrentHighBid=context.Message.Amount;
            await auction.SaveAsync();

}
    }
}

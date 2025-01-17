using System;
using Contract;
using MassTransit;
using MongoDB.Entities;
using SearchingService.Models;

namespace SearchingService.Consumers;

public class FinishedAuctionsConsumer : IConsumer<FinishedAuctions>
{
    public async Task Consume(ConsumeContext<FinishedAuctions> context)
    {
        
      var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);
      if( context.Message.ItemSold)

      {
        auction.Winner= context.Message.Winner;
        auction.SoldAmount= (int)context.Message.Amount;

      }


        auction.Status="Zakończono";
        await auction.SaveAsync();

    }
}

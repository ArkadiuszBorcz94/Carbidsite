


using BiddService.Models;
using Contract;
using MassTransit;
using MongoDB.Entities;

namespace BiddService.Consumers;

public class CreatedAuctionsConsumer : IConsumer<CreatedAuctions>
{
    public async Task Consume(ConsumeContext<CreatedAuctions> context)
    {
       var auction = new AuctionsEntities
       {

        ID= context.Message.Id.ToString(),
        Seller= context.Message.Seller,
        AuctionEnd= context.Message.AuctionEnd,
        ReservePrice= context.Message.ReservePrice

        
       };
        Console.WriteLine("--> nowe dane do skonsumowania");
       await auction.SaveAsync();
    }
}

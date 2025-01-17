using System;
using AuctionService.Data;
using Contract;
using MassTransit;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace AuctionService.Consumers;

public class PlacedBidsConsumer : IConsumer<PlacedBids>
{
    private readonly AuctionDbContext _dbContext;

    public PlacedBidsConsumer(AuctionDbContext dbContext)
    {
       _dbContext = dbContext;
    }
    public async Task Consume(ConsumeContext<PlacedBids> context)
    {

        Console.WriteLine("--> Oferta konsumencka została ustanowiona");

        //metoda asynchroniczna przekaże na m tylo aukcję podmiotu powiązanego z Itemem
        var auction =await _dbContext.Auctions.FindAsync(context.Message.AuctionId);



    //Jeśli oferta jest wyższa niż bieżąca najwyższa to aktualizujemy oferte, ejeżeli nie ma najwyższej to aktualna staje się najwyższa
        if(auction.CurrentHighBid==null|| context.Message.BidStatus.Contains("Zaakceptowano")
        && context.Message.Amount> auction.CurrentHighBid)
        {

            auction.CurrentHighBid=context.Message.Amount;
            await _dbContext.SaveChangesAsync();
        }
       
    }
}

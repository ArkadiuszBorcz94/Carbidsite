using System;
using AuctionNotifService.Hubs;
using Contract;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace AuctionNotifService.Consumers;

public class CreatedAuctionConsumer : IConsumer<CreatedAuctions>
{
    private readonly IHubContext<AuctionNotifHubs> _hubContext;

    public CreatedAuctionConsumer(IHubContext<AuctionNotifHubs>hubContext) 
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<CreatedAuctions> context)
    {
      Console.WriteLine("-----------Otrzymano powiadomienie o stworzonej aukcji");
      await _hubContext.Clients.All.SendAsync("CreatedAuctions", context.Message);
    }
}

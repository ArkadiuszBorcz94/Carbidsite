using System;
using AuctionNotifService.Hubs;
using Contract;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace AuctionNotifService.Consumers;

public class PlacedBidsConsumer : IConsumer<PlacedBids>
{
    private readonly IHubContext<AuctionNotifHubs> _hubContext;

    public PlacedBidsConsumer(IHubContext<AuctionNotifHubs>hubContext) 
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<PlacedBids> context)
    {
      Console.WriteLine("-----------Otrzymano powiadomienie o nwej ofercie");
      await _hubContext.Clients.All.SendAsync("PlacedBidsAuctions", context.Message);
    }
}

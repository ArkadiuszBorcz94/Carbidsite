using System;
using AuctionNotifService.Hubs;
using Contract;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace AuctionNotifService.Consumers;

public class FinishedAuctionConsumer : IConsumer<FinishedAuctions>
{
       private readonly IHubContext<AuctionNotifHubs> _hubContext;

    public FinishedAuctionConsumer(IHubContext<AuctionNotifHubs>hubContext) 
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<FinishedAuctions> context)
    {
      Console.WriteLine("-----------Otrzymano powiadomienie o zakończone aukcji");
      await _hubContext.Clients.All.SendAsync("FinishedAuctions", context.Message);
    }
}

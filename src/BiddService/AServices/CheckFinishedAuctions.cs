using System;
using BiddService.Models;
using Contract;
using MassTransit;
using MongoDB.Entities;

namespace BiddService.AServices;

public class CheckFinishedAuctions : BackgroundService
{

    private readonly ILogger<CheckFinishedAuctions> _logger;
    private readonly IServiceProvider _services;
    public CheckFinishedAuctions(ILogger<CheckFinishedAuctions> logger, IServiceProvider services)
    {
        _logger = logger;
        _services = services;



    }




    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Zaczynam szukać zakończonych aukcji");

        stoppingToken.Register(() => _logger.LogInformation("Przestaje wyszukiwać"));
        while (!stoppingToken.IsCancellationRequested)
        {

            await CheckAuctions(stoppingToken);
            await Task.Delay(5000, stoppingToken);

        }
    }

    private async Task CheckAuctions(CancellationToken stoppingToken)
    {
        var finishedAuctions = await DB.Find<AuctionsEntities>()
        .Match(x => x.AuctionEnd <= DateTime.UtcNow)
        .Match(x => !x.Finished)
        .ExecuteAsync(stoppingToken);
        if (finishedAuctions.Count == 0) return;

        _logger.LogInformation("==> Znalazłem {count} zakończonych aukcji ", finishedAuctions.Count);

        using var scope = _services.CreateScope();
        var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();


        foreach (var auction in finishedAuctions)
        {
            auction.Finished = true;
            await auction.SaveAsync(null, stoppingToken);
            var winningBid = await DB.Find<Bids>()
            .Match(a => a.AuctionId == auction.ID)
            .Match(b => b.BidStatus == BidStatus.Accepted)
            .Sort(x => x.Descending(s => s.Amount))
            .ExecuteFirstAsync(stoppingToken);

            await endpoint.Publish(new FinishedAuctions
            {
                ItemSold = winningBid != null,
                AuctionId = auction.ID,
                Winner = winningBid?.Bidder,
                Amount = winningBid?.Amount,
                Seller = auction.Seller
            }, stoppingToken);

        }
    }
}


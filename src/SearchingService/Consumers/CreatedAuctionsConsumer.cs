using System;
using AutoMapper;
using Contract;
using MassTransit;
using MongoDB.Entities;
using Polly;
using SearchingService.Models;

namespace SearchingService.Consumers;

public class CreatedAuctionsConsumer : IConsumer<CreatedAuctions>
{
    private readonly IMapper _mapper;
   
    public CreatedAuctionsConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }


        //wysłannie kominikatu o stworzeonej aukcji do servis bus
    public async Task Consume(ConsumeContext<CreatedAuctions> context)
    {
        Console.WriteLine("--> Stworzono aukcję do poczekalni "+ context.Message.Id);

        var item = _mapper.Map<Item>(context.Message);
        await item.SaveAsync();

    }
}

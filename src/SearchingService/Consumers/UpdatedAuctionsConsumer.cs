using System;
using AutoMapper;
using Contract;
using MassTransit;
using MongoDB.Entities;
using SearchingService.Models;



namespace SearchingService.Consumers;

public class UpdatedAuctionsConsumer :IConsumer<UpdatedAuctions>
{

private readonly IMapper _mapper;
   
    public UpdatedAuctionsConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }


        //wysłannie kominikatu o stworzeonej aukcji do servis bus
    public async Task Consume(ConsumeContext<UpdatedAuctions> context)
    {
        Console.WriteLine("--> Zaktualizowano aukcję w poczekalni updated"+ context.Message.Id);

        var item = _mapper.Map<Item>(context.Message);
        
        //auktalizacja bazy MongDB
        var result = await DB.Update<Item>()
         .Match(a=> a.ID==context.Message.Id)
         .ModifyOnly(x=> new
            {
            x.Color,
            x.Make,
            x.Model,
            x.Year,
            x.Milage,

         }, item)
         .ExecuteAsync();
        
         if(!result.IsAcknowledged)
         throw new MessageException(typeof(UpdatedAuctions), "Wystąpił problem z podczas aktualizowania MongoDB");

    }


}

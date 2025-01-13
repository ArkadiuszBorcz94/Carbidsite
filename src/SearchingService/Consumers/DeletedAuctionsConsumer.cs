using System;
using Contract;
using MassTransit;
using MongoDB.Entities;
using SearchingService.Models;

namespace SearchingService.Consumers;

public class DeletedAuctionsConsumer : IConsumer<DeletedAuctions>
{
    public async Task Consume(ConsumeContext<DeletedAuctions> context)
    {
      Console.WriteLine("-->Aukcja została usuniętaz poczekalni "+ context.Message.Id);
     
     // usuniecie aukcji z wybranym id
     
      var result = await DB.DeleteAsync<Item>(context.Message.Id);

    if (!result.IsAcknowledged)
    throw new MessageException(typeof(DeletedAuctions), "Wystąpił problem podczas usuwania");

    }
}

// using System;
// using Contract;
// using MassTransit;

// namespace SearchingService.Consumers;


        // przykład jak można dodać funkcjonalność kiedy ktoś wprowadzi złąnazwę modelu auta by zmienił na właściwą i dodał do bazy danych ten wyjątek 




// public class CreatedAuctionsFailConsumer : IConsumer<Fault<CreatedAuctions>>

// {

//     public async Task Consume(ConsumeContext<Fault<CreatedAuctions>>context)
//     {

//        Console.WriteLine("--> Błędne stworzenie aukcji");
//        var exception = context.Message.Exceptions.First();
//        if(exception.ExceptionType=="System.ArgumentException")
//        {
//         context.Message.Message.Model="FooBar";
//         await context.Publish(context.Message.Message);

//        }
//        else
//        {
//         Console.WriteLine("");
//        }

//     }


// }

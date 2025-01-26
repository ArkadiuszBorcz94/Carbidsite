using AuctionNotifService.Consumers;
using AuctionNotifService.Hubs;

using MassTransit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMassTransit(x=>
{
  x.AddConsumersFromNamespaceContaining<CreatedAuctionConsumer>();
   x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("notif", false));
   
    x.UsingRabbitMq((context, cfg)=>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host=>
        {
            
            //nasza mikrosuługa będzie mogła łączyć sięna dal z RabbitMQ poziomie development
            //jeśli nie zostanie podana naqzwa użytkowanika to zostanie ustawiona na guest i to samo z hasłem
        host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
        host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));

        });
         cfg.ConfigureEndpoints(context);

    });

});


builder .Services.AddSignalR();
var app = builder.Build();

app.MapHub<AuctionNotifHubs>("/notifications");

app.Run();

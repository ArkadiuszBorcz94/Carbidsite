using System.Net;
using MassTransit;
using Polly;
using Polly.Extensions.Http;
using SearchingService.Consumers;
using SearchingService.Data;
using SearchingService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHttpClient<AuctionSvcHttpClient>().AddPolicyHandler(GetPolicy());



//Konfiguracja RabbitMQ, będzie używał localhost do komunikacji

builder.Services.AddMassTransit(x=>
{

    x.AddConsumersFromNamespaceContaining<CreatedAuctionsConsumer>();
   
    //zmiana formatowanie dla createdAuctionsConsumer podczas używania endpointu dodaje przedrostek "search-"
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));
   
    x.UsingRabbitMq((context, cfg)=>
    {
        
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host=>
        {
            
            //nasza mikrosuługa będzie mogła łączyć sięna dal z RabbitMQ poziomie development
            //jeśli nie zostanie podana naqzwa użytkowanika to zostanie ustawiona na guest i to samo z hasłem
        host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
        host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));

        });

        
     cfg.ReceiveEndpoint("search-created-auctions", e=>
    {
        //ponawianie 5 razy co 5 sekund przywrócenie aukcji z message box jeśli mongoDb nie odpowiada

        e.UseMessageRetry(r => r.Interval(5, 5));
        e.ConfigureConsumer<CreatedAuctionsConsumer>(context);
    });

    cfg.ConfigureEndpoints(context);

    });

});


var app = builder.Build();

// Configure the HTTP request pipeline.




app.UseAuthorization();

app.MapControllers();
app.Lifetime.ApplicationStarted.Register(async ()=>
{
    try
{

await DbInitializer.InitDb(app);

}
catch (Exception e)

{

Console.WriteLine(e);

}
});





app.Run();


//obsługa wyjątku jeśli komunikacja z innym serwisem nie nastyąpiła, będziemy próblowali nawiązać połączenie co trzy sekundy


static IAsyncPolicy<HttpResponseMessage>GetPolicy()
    => HttpPolicyExtensions
        .HandleTransientHttpError()
        .OrResult(msg=>msg.StatusCode == HttpStatusCode.NotFound)
        .WaitAndRetryForeverAsync(_=>TimeSpan.FromSeconds(3));
    

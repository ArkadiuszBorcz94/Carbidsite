using BiddService.AServices;
using BiddService.Consumers;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;
using MongoDB.Entities;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddMassTransit(x=>
{
    x.AddConsumersFromNamespaceContaining<CreatedAuctionsConsumer>();
   x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));
   
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

//weryfikowanie tokenu ,przez kogo został faktycznie wydany iu zweryfikuje go z serwerm identity gdzie options authority pobiera i ustawia uprawnienia

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentitficationServiceUrl"];
        options.RequireHttpsMetadata= false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });



builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddHostedService<CheckFinishedAuctions>();
builder.Services.AddScoped<GrpcAuctionClient>();


var app = builder.Build();

// Configure the HTTP request pipeline.




app.UseAuthorization();

app.MapControllers();
await DB.InitAsync("BidDb", MongoClientSettings.FromConnectionString(builder.Configuration.GetConnectionString("BidDbConnection")));
app.Run();

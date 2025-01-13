using AuctionService.Data;
using MassTransit;
using Microsoft.CodeAnalysis.FlowAnalysis;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Query.ExpressionTranslators.Internal;

var builder = WebApplication.CreateBuilder(args);

// Dodanie serwisu do kontenera.

builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
  
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); 

//Konfiguracja RabbitMQ, będzie używał localhost do komunikacji
builder.Services.AddMassTransit(x=>
{
   x.AddEntityFrameworkOutbox<AuctionDbContext>(o =>
   {

    o.QueryDelay = TimeSpan.FromSeconds(10);
    
    o.UsePostgres();
    o.UseBusOutbox();
   });
   
   
    x.UsingRabbitMq((context, cfg)=>
    {
    cfg.ConfigureEndpoints(context);

    });

});

var app = builder.Build();

// Configure the HTTP request pipeline.


app.UseAuthorization();

app.MapControllers();

try
{
    DbInitializer.InitDb(app);
}
catch (Exception e)
{
    
   Console.WriteLine(e);
}

app.Run();

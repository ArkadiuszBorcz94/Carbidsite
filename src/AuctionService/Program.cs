using AuctionService.AServices;
using AuctionService.Data;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.CodeAnalysis.FlowAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
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


builder.Services.AddGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.


//musi nastąpić autentykacja przed autoryzacją ponieważ wyskoczy błąd 401 trzeba zweryfikować kto jest kim zani dostanie dostęp


app.UseAuthentication();


app.UseAuthorization();

app.MapControllers();

app.MapGrpcService<GrpcAuctionService>();

try
{
    DbInitializer.InitDb(app);
}
catch (Exception e)
{
    
   Console.WriteLine(e);
}

app.Run();

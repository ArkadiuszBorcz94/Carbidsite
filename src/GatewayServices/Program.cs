using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);


//konfiguracja serwera proxy
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));


//dodanie uwierzytelniania, ( kopia z AuctionService ) musi być identyczna
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentitficationServiceUrl"];
        options.RequireHttpsMetadata= false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

  //  builder.Services.AddCors(options => 
//{
 //   options.AddPolicy("customPolicy", b => 
  //  {
  //      b.AllowAnyHeader()
            //.AllowAnyMethod().AllowCredentials().WithOrigins(builder.Configuration["IdentitficationServiceUrl"]);
  //  });
//});
    
var app = builder.Build();

//app.UseCors();

app.MapReverseProxy();

app.UseAuthentication();
app.UseAuthorization();




app.Run();

using System;
using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchingService.Models;
using SearchingService.Services;

namespace SearchingService.Data;

public class DbInitializer
{

public static async Task InitDb(WebApplication app)
{

//Zainicjowanie bazy danych MONGO DB
await DB.InitAsync("SearchDb" , MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));


//Stworzenie indeksu wyszukiwania po których można wyszukiwać 
await DB.Index<Item>()
.Key(x =>x.Make, KeyType.Text)
.Key(x =>x.Model, KeyType.Text)
.Key(x =>x.Color, KeyType.Text)
.CreateAsync();


var count = await DB.CountAsync<Item>();


using var scope = app.Services.CreateScope();
var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();
var items = await httpClient.GetItemsForSearchDb();

Console.WriteLine(items.Count + " Aukcje zwrócono z Auction service");


//wykonujemy połączenie z bazą danych tylko jeśli mamy coś do zapisania 
if (items.Count>0) await DB.SaveAsync(items);


}
}

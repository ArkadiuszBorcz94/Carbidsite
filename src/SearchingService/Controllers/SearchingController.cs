using System;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchingService.Models;
using SearchingService.SolutionHelper;

namespace SearchingService.Controllers;

[ApiController]
[Route("api/search")]
public class SearchingController : ControllerBase
{

[HttpGet]


public async Task<ActionResult<List<Item>>> SearchItems([FromQuery] SearchParam searchParam)

    {

        //Tworzymy najpierw zapytanie
        var querry =DB.PagedSearch<Item, Item>();


    

       //sortowanie Itemów po Marce pojazdu
        querry.Sort(x=>x.Ascending(a=> a.Make));
    
        
         //funkcja wyszukiwania po wprowadzonej nazwie (searchTerm) oraz sortowanie według wyniku tekstowego
        //sprawdzanie czy mamy wyszukiwane hasło, jeżeli tak ti bvędzie dopasowane
        if (!string.IsNullOrEmpty(searchParam.SearchTerm))
        {
            querry.Match(Search.Full, searchParam.SearchTerm).SortByTextScore() ;
        }

       ///sortowanie po selekcji
        querry =searchParam.OrderBy switch
        {

            // sortowanie po marce auta
            "make"=> querry.Sort(x => x.Ascending(a=>a.Make)), 
           
            // sortowanie po dacie utworzenia  

            "new"=> querry.Sort(x => x.Descending(a=>a.CreatedAt)),    
            
            //domyślne sortowanie po aukcjach kończących się
            _=>querry.Sort(x=> x.Ascending(a=>a.AuctionEnd))
        };

        //filtrowanie po selekcji

        querry=searchParam.FilterBy switch
        {
         "finished"=>querry.Match(x=> x.AuctionEnd<DateTime.UtcNow),
            "endingSoon"=>querry.Match(x=>x.AuctionEnd<DateTime.UtcNow.AddHours(6)&& x.AuctionEnd>DateTime.UtcNow),
            _=> querry.Match(x=>x.AuctionEnd>DateTime.UtcNow)
       
        };

        //wyświetlanie po sprzedawcy
        if (!string.IsNullOrEmpty(searchParam.Seller))
        {
         querry.Match(x=>x.Seller==searchParam.Seller);

        }

        //wyswietlanie po zwycięzcy aukcji

         if (!string.IsNullOrEmpty(searchParam.Winner))
        {
         querry.Match(x=>x.Seller==searchParam.Winner);

        }

        querry.PageNumber(searchParam.PageNumber);
        querry.PageSize(searchParam.PageSize);
        
        var result = await querry.ExecuteAsync();

       //Zwracana lista Itemów      
        return Ok(new 
        {
        results=result.Results,
        pageCount=result.PageCount,
        totalCount= result.TotalCount
        
        });

    }

}

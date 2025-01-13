using System;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contract;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;


[ApiController]

[Route("api/auctions")]
public class AuctionsController:ControllerBase
{

private readonly AuctionDbContext _context;
private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
{
    _context=context;
    _mapper=mapper;
    _publishEndpoint = publishEndpoint;
        
    }

[HttpGet]
public async Task<ActionResult<List<AuctionDto>>>GetAllAuctions(string date)
{

    var querry=_context.Auctions.OrderBy(x=>x.Item.Make).AsQueryable();

    if (!string.IsNullOrEmpty(date))
    {
     querry=querry.Where(x=>x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime())>0);
    

    }

   return await querry.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();

}

[HttpGet("{id}")]
public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
{
    var auction = await _context.Auctions
     .Include(x => x.Item)
     .FirstOrDefaultAsync(x => x.Id == id);
    
    if (auction==null) return NotFound();

    return _mapper.Map<AuctionDto>(auction);
}



[HttpPost]
public async Task<ActionResult<AuctionDto>>CreateAuction(CreateAuctionDto auctionDto)
{

    var auction = _mapper.Map<Auction>(auctionDto);
    //Trzeba dodać bierzącego użytkownika jako sprzedającego
    auction.Seller= "test";

    _context.Auctions.Add(auction);

     var newAuction= _mapper.Map<AuctionDto>(auction);


    //mapowanie dla stworzeonej aukkcji
    //publikujemy jako obiekt utworzony na aukcji
    await _publishEndpoint.Publish(_mapper.Map<CreatedAuctions>(newAuction));

    var result =await _context.SaveChangesAsync()>0;

   

    if (!result) return BadRequest("Nie można zapisać zmian w bazie danych");

    

     return CreatedAtAction (nameof(GetAuctionById),
         new{auction.Id}, newAuction);
}

[HttpPut("{id}")]

public async Task<ActionResult<AuctionDto>>UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto )
{
    var auction =await _context.Auctions.Include(x=> x.Item)
        .FirstOrDefaultAsync(x=> x.Id==id);


        if (auction==null) return NotFound();


        //Trzeba dodać sprawdzenie sprzedawcy czy jest równe nazwie użytkownika

        auction.Item.Make= updateAuctionDto.Make?? auction.Item.Make;
        auction.Item.Model= updateAuctionDto.Model?? auction.Item.Model;
        auction.Item.Color= updateAuctionDto.Color?? auction.Item.Color;
        auction.Item.Milage= updateAuctionDto.Milage?? auction.Item.Milage;
        auction.Item.Year= updateAuctionDto.Year?? auction.Item.Year; 

        //mapowanie dla zauktualizowanej aukcji
        await _publishEndpoint.Publish(_mapper.Map<UpdatedAuctions>(auction));
         
         //jeśli magistrala usług nie działa to zapisze wiadomość do skrzynki nadawczej  kiedy servcis bus zaczn ie działać zapisze zmiany do bazy danych
        var result = await _context.SaveChangesAsync()>0;

        if (result)return Ok();
        return BadRequest("Wystąpił problem w zapisywaniu zmian w bazie danych");
    }


    [HttpDelete("{id}")]

        public async Task<ActionResult>DeleteAuction(Guid id)
    {

        var auction=await _context.Auctions.FindAsync(id);

        if(auction==null) return NotFound();


         //Trzeba dodać sprawdzenie sprzedawcy czy jest równe nazwie użytkownika


        _context.Auctions.Remove(auction);

        //mapowanie dla usuwanej aukcji
         await _publishEndpoint.Publish<DeletedAuctions>(new {Id = auction.Id.ToString() });

        var result =await _context.SaveChangesAsync()>0;
        
        if(!result) return BadRequest("Wystąpił problem w zapisywaniu zmian w bazie danych");
        return Ok();

    }


}


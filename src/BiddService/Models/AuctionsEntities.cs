using System;
using MongoDB.Entities;

namespace BiddService.Models;

public class AuctionsEntities: Entity
{

public DateTime AuctionEnd {get; set;}

public string Seller {get; set;}

public int ReservePrice {get; set;}
public bool Finished {get; set;}



}

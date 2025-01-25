using System;
using MongoDB.Entities;

namespace BiddService.Models;

public class Bids :Entity
{
    public string AuctionId {get; set;}
    public string Bidder  {get; set;}
    public DateTime BidTime  {get; set;}=DateTime.UtcNow;
    public int Amount  {get; set;}
    public BidStatus BidStatus  {get; set;}




}

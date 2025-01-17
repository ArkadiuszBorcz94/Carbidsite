using System;

namespace Contract;

public class FinishedAuctions
{
    public bool ItemSold{get; set;}
    public string AuctionId {get; set;}
    public string Seller {get; set;}
    public string Winner {get; set;}
    public int? Amount {get; set;}


}

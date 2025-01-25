using System;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BiddService.Models;

public enum BidStatus
{

Accepted,
AcceptedBelowReserve,
TooLow,
Finished
}

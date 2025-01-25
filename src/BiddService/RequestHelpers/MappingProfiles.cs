using System;
using AutoMapper;
using BiddService.DTOs;
using BiddService.Models;
using Contract;

namespace BiddService.RequestHelpers;

public class MappingProfiles:Profile
{

public MappingProfiles()
{

    CreateMap<Bids, BidsDto>();
    CreateMap<Bids, PlacedBids>();
}



}

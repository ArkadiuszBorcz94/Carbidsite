using System;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Contract;

namespace AuctionService.RequestHelpers;

public class MappingProfiles:Profile
{
public MappingProfiles()
{
    CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item); 
    CreateMap<Item, AuctionDto>();
    CreateMap<CreateAuctionDto, Auction>()
        .ForMember(d => d.Item, o => o.MapFrom(s => s));
    CreateMap<CreateAuctionDto, Item>();
    CreateMap<AuctionDto, CreatedAuctions>();
   
   //aktualizujemy tutaj właściwości przedmiotu
    CreateMap<Auction, UpdatedAuctions>().IncludeMembers(a => a.Item);

    CreateMap<Item, UpdatedAuctions>();

}


}

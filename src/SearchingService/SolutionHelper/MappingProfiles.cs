using System;
using AutoMapper;
using Contract;
using SearchingService.Models;

namespace SearchingService.SolutionHelper;

public class MappingProfiles : Profile

{

    public MappingProfiles()
    {

        CreateMap<CreatedAuctions, Item>();
        CreateMap<UpdatedAuctions, Item>();
    }

}

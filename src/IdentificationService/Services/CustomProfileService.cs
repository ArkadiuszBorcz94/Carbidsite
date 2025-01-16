using System;
using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentificationService.Models;
using IdentityModel;
using Microsoft.AspNetCore.Identity;

namespace IdentificationService.Services;

public class CustomProfileService : IProfileService

{
    private readonly UserManager<ApplicationUser> _userManager;

    public CustomProfileService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }


    //dzieki tej funkcji można dodać żadanie o dodatkowe informacje do naszego tokena
    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
       var user=await _userManager.GetUserAsync(context.Subject);
       var existingClaims = await _userManager.GetClaimsAsync(user);

        var claims = new List<Claim>
        {
            new Claim("username", user.UserName)
        };

        context.IssuedClaims.AddRange(claims);
        context.IssuedClaims.Add(existingClaims.FirstOrDefault(x=> x.Type==JwtClaimTypes.Name));
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
      return Task.CompletedTask;
    }
}

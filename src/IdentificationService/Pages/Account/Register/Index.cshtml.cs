using System.Security.Claims;
using IdentificationService.Models;
using IdentificationService.Pages.Account.Register;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace IdentificationService.Pages.Register
{

    [SecurityHeaders]
    [AllowAnonymous]
    public class Index : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public Index(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [BindProperty]
        public RegisterViewModel Input { get; set; }
         [BindProperty]
        public bool RegisterSuccess { get; set; }
        public IActionResult OnGet(string returnUrl)
        {
        Input= new RegisterViewModel
        {
            ReturnUrl=returnUrl,
        };

        return Page();

        }

        public async Task<IActionResult>OnPost()
        {

            if (Input.Button !="register") return Redirect("~/");
           
           //Walidacja wprowadzonych danych
            if(ModelState.IsValid)
            {
             //Jesli walidacja danych wprowadzonych jest poprawna program przystępuje do tworzenia nowego użytkownika
            var user =new ApplicationUser
            {
            UserName=Input.Username,
            Email=Input.Email,
            EmailConfirmed= true

            };

            //Następnie przy pomocy menagera użytkowników towrzony jest użyykownik z loginem i hasłem

            var result =await _userManager.CreateAsync(user, Input.Password);
           
           
           //jeżeli proces zakończył się powodzeniem zwracana jest wartość bool przed zwóceniem strony
            if (result.Succeeded)
                {
                
                await _userManager.AddClaimsAsync(user, new Claim[] 
                {

                    new Claim(JwtClaimTypes.Name, Input.FullName)
                });

                RegisterSuccess= true;

                }
            }

            return Page();
        }
    }
}

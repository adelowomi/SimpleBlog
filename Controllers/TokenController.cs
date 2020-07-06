using System;
using System.IdentityModel.Tokens.Jwt;
using AspNet.Security.OpenIdConnect.Primitives;
using AspNet.Security.OpenIdConnect.Server;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SimpleBlog.Models;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using SimpleBlog.Utilities;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;
using OpenIdConnectExtensions = AspNet.Security.OpenIdConnect.Extensions.OpenIdConnectExtensions;

namespace SimpleBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public TokenController(
            IOptions<IdentityOptions> identityOptions,
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            RoleManager<Role> roleManager)
        {
            _identityOptions = identityOptions;
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("login", Name = nameof(TokenExchange))]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> TokenExchange(User user)
        {
            var UserToLogin = await _userManager.FindByEmailAsync(user.Email);
            if (UserToLogin == null) return BadRequest(new ResponseFormat
            {
                Error = true,
                ErrorMessage = "There is no User with this email on our system"
            });

            var token = GenerateJSONWebToken(UserToLogin);
            if (token != null)
            {
                UserToLogin.Token = token;
                return Ok(new ResponseFormat
                {
                    Success = true,
                    Data = UserToLogin
                });
            }

            return BadRequest(new ResponseFormat
            {
                Error = true,
                ErrorMessage = "An Error Occured Please try again after some time"
            });

        }

        public string GenerateJSONWebToken(User user)
        {
            var SecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Globals.JWTKey));
            var Credentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                    issuer: Globals.JWTIssuer,
                    audience: Globals.JWTIssuer,
                    claims,
                    expires: DateTime.Now.AddMinutes(15),
                    signingCredentials: Credentials
                );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }

        [Authorize]
        [HttpGet]
        public string Get()
        {
            return "Authorised";
        }
    }
}

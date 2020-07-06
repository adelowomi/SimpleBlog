using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Interfaces;
using SimpleBlog.Models;
using SimpleBlog.Utilities;

namespace SimpleBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;

        public UserController(IUserService userService,UserManager<User> userManager)
        {
            _userService = userService;
            _userManager = userManager;
        }

        [HttpPost("register", Name = nameof(CreateUserAsync))]
        [ProducesResponseType(201)]
        public async Task<ActionResult> CreateUserAsync(User NewUser)
        {
            try
            {
                var created = await _userService.CreateUser(NewUser);
                if (created.Succeeded) 
                return Created("",new ResponseFormat{
                    Success = true,
                    Data = {}
                });
                return BadRequest(new ResponseFormat{
                    Error = true,
                    ErrorMessage = created.ErrorMessage
                });
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return BadRequest(new ResponseFormat{
                    Error = true,
                    ErrorMessage = "An error occured please try again after some time."
                });
            }
        }

        public async Task<User> GetLoggedInUser(){
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var Email = claim[0].Value; 

            var LoggedInUser = await _userManager.FindByEmailAsync(Email);
            return LoggedInUser;
        }
    }
}

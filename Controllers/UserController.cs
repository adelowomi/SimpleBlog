using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public UserController(IUserService userService)
        {
            _userService = userService;
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
    }
}

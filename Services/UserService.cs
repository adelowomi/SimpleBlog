using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SimpleBlog.DataContext;
using SimpleBlog.Interfaces;
using SimpleBlog.Models;

namespace SimpleBlog.Services
{
    public class UserService : IUserService
    {
        Context _context;
        private readonly UserManager<User> _userManager;

        public UserService(Context context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<(bool Succeeded, string ErrorMessage)> CreateUser(User NewUser)
        {
            var ExistingUser = _userManager.FindByEmailAsync(NewUser.Email).Result;
            if (ExistingUser != null)
            {
                return (false, "A user with the specified Email Address already exists");
            }
            var Created = await _userManager.CreateAsync(NewUser, NewUser.Password);
            if (!Created.Succeeded)
            {
                var FirstError = Created.Errors.FirstOrDefault()?.Description;
                return (false, FirstError);
            }

            return (true, null);
        }

        public async Task<User> GetById(int Id)
        {
            var ThisUser = Stripped(await _userManager.Users
                .SingleOrDefaultAsync(x => x.Id == Id));
            return ThisUser;
        }

        public User Stripped(User user)
        {
            user.Password = null;
            user.PasswordHash = null;
            user.SecurityStamp = null;
            return user;
        }

        public async Task<User> GetByEmail(string Email)
        {
            var ThisUser = Stripped(await _userManager.FindByEmailAsync(Email));
            return ThisUser;
        }
    }
}

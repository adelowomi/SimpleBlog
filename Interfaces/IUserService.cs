using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleBlog.Models;

namespace SimpleBlog.Interfaces
{
    public interface IUserService
    {
        public Task<(bool Succeeded, string ErrorMessage)> CreateUser(User NewUser);
        public Task<User> GetById(int Id);

        public Task<User> GetByEmail(string Email);
    }
}

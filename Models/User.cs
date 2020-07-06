using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SimpleBlog.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsStudioOwner { get; set; }
        public string ProfileImage { get; set; }
        public string FacebookUrl {get;set;}
        public string TwitterUrl {get;set;}
        public string LinkedInUrl {get;set;}
        public string Description {get;set;}

        [NotMapped]
        public string Password { get; set; }

        [NotMapped] 
        public string Token { get; set; }
    }
}

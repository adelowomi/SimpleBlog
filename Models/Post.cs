using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SimpleBlog.Models
{
    public class Post
    {
        public int  Id { get; set; }
        public string Title { get; set; }
        public string Quote{ get; set; }
        public string Content { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public string PostImageUrl { get; set; }
        public string ImageThimbnailUrl { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
        [NotMapped]
        public User Author { get; set; }
        [NotMapped]
        public List<Like> Likes { get; set; }
        [NotMapped]
        public List<Comment> Comments { get; set; }
        [NotMapped]
        public Category Category {get;set;}

    }
}

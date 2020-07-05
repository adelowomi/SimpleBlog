using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleBlog.Models;

namespace SimpleBlog.Interfaces
{
    public interface IPostService
    {
        public int AddNewPost(Post NewPost);

        public Post GetById(int Id);
        public List<Post> ListPosts();
        public List<Post> ListByUserId(int Id);

        public List<Post> ListByCategory(int Id);

        public bool Delete(int Id);

    }
}

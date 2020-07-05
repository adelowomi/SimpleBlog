using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleBlog.DataContext;
using SimpleBlog.Interfaces;
using SimpleBlog.Models;
using SimpleBlog.Utilities;

namespace SimpleBlog.Services
{
    public class PostService : IPostService
    {
        private Context _context;

        public PostService(Context context)
        {
            _context = context;
        }
        public  int AddNewPost(Post NewPost)
        {
            try
            {
                 _context.Posts.AddAsync(NewPost);
                 _context.SaveChangesAsync();
                return NewPost.Id;
            }
            catch (Exception e)
            {
                Logger.Error(e);
                throw;
            }
        }


        public Post GetById(int Id)
        {
            try
            {
                var ThisPost = _context.Posts.Find(Id);
                if (ThisPost != null)
                {
                    return ThisPost;
                }
                return null;
            }
            catch (Exception e)
            {
                Logger.Error(e);
                return null;
            }
        }

        public List<Post> ListPosts()
        {
            try
            {
                return _context.Posts.ToList();
            }
            catch (Exception e)
            {
                Logger.Error(e);
                return null;
            }
        }

        public List<Post> ListByUserId(int Id)
        {
            try
            {
                return _context.Posts.AsQueryable().Where(post => post.UserId == Id).ToList();
            }
            catch (Exception e)
            {
                Logger.Error(e);
                return null;
            }
        }

        public List<Post> ListByCategory(int Id)
        {
            try
            {
                return _context.Posts.AsQueryable().Where(post => post.CategoryId == Id).ToList();
            }
            catch (Exception e)
            {
                Logger.Error(e);
                return null;
            }
        }

        public bool Delete(int Id)
        {
            var ThisPost = GetById(Id);
            _context.Posts.Remove(ThisPost);
            _context.SaveChanges();
            return true;
        }
    }
}

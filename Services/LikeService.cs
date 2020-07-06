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
    public class LikeService : ILikeService
    {
        private Context _context;

        public LikeService(Context context)
        {
            _context = context;
        }
        public List<Like> ListPostLikesById(int Id)
        {
            try
            {
                return _context.Likes.AsQueryable().Where(Like => Like.PostId == Id).ToList();
            }
            catch (Exception e)
            {
                Logger.Error(e);
                return null;
            }
        }

        public bool DeleteByPostId(int Id)
        {
            var Likes = ListPostLikesById(Id);
            _context.Likes.RemoveRange(Likes);
            _context.SaveChanges();
            return true;
        }
        public bool LikePost(Like NewLike){
            _context.Likes.Add(NewLike);
            _context.SaveChanges();
            return true;
        }
    }
}

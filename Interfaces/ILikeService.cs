using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleBlog.Models;

namespace SimpleBlog.Interfaces
{
    public interface ILikeService
    {
        public List<Like> ListPostLikesById(int Id);
        public bool DeleteByPostId(int Id);
        public bool LikePost(Like NewLike);
    }
}

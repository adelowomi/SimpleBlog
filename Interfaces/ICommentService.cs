using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleBlog.Models;

namespace SimpleBlog.Interfaces
{
    public interface ICommentService
    {
        public int AddNewComment(Comment NewComment);
        public List<Comment> ListByPostId(int Id);
        public List<Comment> ListByUserId(int Id);
        public bool DeleteByPostId(int id);
    }
}

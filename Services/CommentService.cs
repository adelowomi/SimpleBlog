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
    public class CommentService : ICommentService
    {
        private Context _context;

        public CommentService(Context context)
        {
            _context = context;
        }
        public int AddNewComment(Comment NewComment)
        {
            try
            {
                _context.Comments.Add(NewComment);
                //_context.Comments.SaveChanges();
                return NewComment.Id;
            }
            catch (Exception e)
            {
                Logger.Error(e);
                throw;
            }
        }

        public List<Comment> ListByPostId(int Id)
        {
            return _context.Comments.AsQueryable().Where(comment => comment.PostId == Id).ToList();
        }

        public List<Comment> ListByUserId(int Id)
        {
            return _context.Comments.AsQueryable().Where(comment => comment.UserId == Id).ToList();
        }

        public bool DeleteByPostId(int Id)
        {
            var Comments = ListByPostId(Id);
            _context.Comments.RemoveRange(Comments);
            _context.SaveChanges();
            return true; 
        }
    }
}

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Interfaces;
using SimpleBlog.Models;
using SimpleBlog.Utilities;

namespace SimpleBlog.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IUserService _userService;
        public CommentController(ICommentService commentService, IUserService userService)
        {
            _commentService = commentService;
            _userService = userService;
        }

        [HttpPost("postcomment", Name = nameof(PostComment))]
        [ProducesResponseType(201)]
        public async Task<ActionResult> PostComment(Comment comment)
        {

            var ExistingUser = _userService.GetByEmail(comment.Email);
            if (ExistingUser.Result == null)
            {
                var user = new User();
                user.Email = comment.Email;
                user.UserName = comment.Email;
                user.FirstName = comment.Name;
                user.Password = "Password@123";
                var response = await _userService.CreateUser(user);
                if (!response.Succeeded)
                {
                    return Ok(new ResponseFormat
                    {
                        Error = true,
                        ErrorMessage = response.ErrorMessage
                    });
                }
            }
            comment.UserId = _userService.GetByEmail(comment.Email).Id;
            var Added = _commentService.AddNewComment(comment);
            if (Added >= 1)
            {
                return Ok(new ResponseFormat
                {
                    Success = true,
                    Data = null
                });
            }
            else
            {
                return Ok(new ResponseFormat
                {
                    Error = true,
                });
            }
        }
            
    }

}

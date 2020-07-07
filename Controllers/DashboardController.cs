using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Interfaces;
using SimpleBlog.Models;
using SimpleBlog.Utilities;

namespace SimpleBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IPostService _postService;
        private readonly ICommentService _commentService;
        private readonly ILikeService _likeService;

        public DashboardController(UserManager<User> userManager, IPostService postService, ICommentService commentService, ILikeService likeService)
        {
            _userManager = userManager;
            _postService = postService;
            _commentService = commentService;
            _likeService = likeService;
        }

        [Authorize]
        [HttpGet("data", Name = nameof(GetStats))]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async  Task<ActionResult> GetStats()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var Email = claim[0].Value; 

            var LoggedInUser = await _userManager.FindByEmailAsync(Email);
            var AllPosts = _postService.ListByUserId(LoggedInUser.Id);
            var postCount = AllPosts.Count;
            var commentCount = 0;
            var likeCount = 0;
            int[] likePercent = new int[2];

            foreach(Post post in AllPosts)
            {
                var thisPostLikeCount = _likeService.ListPostLikesById(post.Id).Count;
                var thisPostCommentCount = _commentService.ListByPostId(post.Id).Count;

                commentCount += thisPostCommentCount;
                likeCount  += thisPostLikeCount;
            }

            if(likeCount != 0){
                likePercent[0] = (postCount / likeCount) * 100;
                likePercent[1] =  likePercent[0] - 100;
            }else{
                likePercent[0] = 0;
                likePercent[1] =  0;
            }
          
            
            var Result = new {
                postCount = postCount,
                commentCount = commentCount,
                likeCount = likeCount,
                likePercent = likePercent
            };

            return Ok(new ResponseFormat{
                Success = true,
                Data = Result
            });

            
        }
    }
}
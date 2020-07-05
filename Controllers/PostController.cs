using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Interfaces;
using SimpleBlog.Models;
using SimpleBlog.Utilities;

namespace SimpleBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly ICommentService _commentService;
        private readonly ILikeService _likeService;
        private readonly IUserService _userService;
        private readonly ICategoryService _categoryService;
        private readonly IWebHostEnvironment _environment;

        public PostController(IPostService postService, ICommentService commentService, ILikeService likeService, IUserService userService, ICategoryService categoryService, IWebHostEnvironment environment)
        {
            _postService = postService;
            _commentService = commentService;
            _likeService = likeService;
            _userService = userService;
            _categoryService = categoryService;
            _environment = environment;
        }

        [HttpPost("postimg", Name = nameof(Upload))]
        [ProducesResponseType(201)]
        public ActionResult Upload(IFormFile img)
        {
            var url = new ImageProcessor().UploadImage(img);
            return Ok(url);
        }

        [HttpPost("newpost", Name = nameof(CreatePost))]
        [ProducesResponseType(201)]
        public ActionResult CreatePost(Post NewPost)
        {
            if (NewPost != null)
            {
                if (NewPost.Image != null)
                {
                    var url = new ImageProcessor(_environment).UploadImage(NewPost.Image);
                    if (url != null)
                    {
                        NewPost.PostImageUrl = url;
                    }
                }
                var Response = _postService.AddNewPost(NewPost);
                if (Response >= 1)
                {
                    return Ok(new ResponseFormat
                    {
                        Success = true,
                        Data = Response
                    });
                }
                return BadRequest(new ResponseFormat
                {
                    Error = true,
                    ErrorMessage = "We could not process the request at this time"
                });
            }
            return BadRequest(new ResponseFormat
            {
                Error = true,
                ErrorMessage = "Post can not be null"
            });
        }

        [HttpGet("getpost/{Id}", Name = nameof(GetPostById))]
        [ProducesResponseType(400)]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetPostById(int Id)
        {
            {
                var Post = _postService.GetById(Id);
                if (Post != null)
                {
                    Post.Comments = _commentService.ListByPostId(Post.Id);
                    Post.Likes = _likeService.ListPostLikesById(Post.Id);
                    Post.Author = await _userService.GetById(Post.UserId);
                    Post.Category = _categoryService.GetById(Post.CategoryId);
                    return Ok(new ResponseFormat
                    {
                        Success = true,
                        Data = Post
                    });
                }

                return NotFound(new ResponseFormat
                {
                    Error = true,
                    ErrorMessage = "Not Found"
                });
            }
        }

        [HttpPost("delete/{Id}", Name = nameof(DeletePost))]
        [ProducesResponseType(400)]
        [ProducesResponseType(200)]
        public ActionResult DeletePost(int Id)
        {
            try
            {
                var CommentDeleted = _commentService.DeleteByPostId(Id);
                var LikesDeleted = _likeService.DeleteByPostId(Id);
                if (CommentDeleted && LikesDeleted)
                {
                    var PostDeleted = _postService.Delete(Id);
                    return Ok(new ResponseFormat
                    {
                        Success = true
                    });
                }
                return BadRequest(new ResponseFormat
                {
                    Success = false,
                    Error = true,
                    ErrorMessage = "We can not delete this post at the moment, Please try again Later"
                });
            }
            catch (Exception e)
            {
                Logger.Error(e);
                return BadRequest(new ResponseFormat
                {
                    Success = false,
                    Error = true,
                    ErrorMessage = "We can not delete this post at the moment, Please try again Later"
                });
            }
        }

        [HttpGet("list", Name = nameof(ListPosts))]
        [ProducesResponseType(400)]
        [ProducesResponseType(200)]
        public async Task<ActionResult> ListPosts()
        {
            var AllPosts = _postService.ListPosts();
            foreach (Post post in AllPosts)
            {
                post.Comments = _commentService.ListByPostId(post.Id);
                post.Likes = _likeService.ListPostLikesById(post.Id);
                post.Author = await _userService.GetById(post.UserId);
                post.Category = _categoryService.GetById(post.CategoryId);
            }
            return Ok(new ResponseFormat
            {
                Success = true,
                Data = AllPosts
            });
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Interfaces;
using SimpleBlog.Utilities;

namespace SimpleBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize]
        [HttpGet("list", Name = nameof(ListCategories))]
        public ActionResult ListCategories(){
            var AllCategories = _categoryService.ListAllCategories();
            return Ok(new ResponseFormat{
                Success = true,
                Data = AllCategories 
            });
        }
    }
}
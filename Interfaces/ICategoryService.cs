using System.Collections.Generic;
using SimpleBlog.Models;

namespace SimpleBlog.Interfaces
{
    public interface ICategoryService
    {
         public List<Category> ListAllCategories();
        public Category GetById(int categoryId);
    }
}
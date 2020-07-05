using System;
using System.Collections.Generic;
using System.Linq;
using SimpleBlog.DataContext;
using SimpleBlog.Interfaces;
using SimpleBlog.Models;

namespace SimpleBlog.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly Context _context;
        public CategoryService(Context context)
        {
            _context = context;
        }

        public List<Category> ListAllCategories()
        {
            return _context.Categories.ToList();
        }

        public Category GetById(int Id){
            return _context.Categories.Find(Id);
        }
    }
}
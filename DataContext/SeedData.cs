using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SimpleBlog.Models;

namespace SimpleBlog.DataContext
{
    public class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider services)
        {
            await AddTestUsers(

                services.GetRequiredService<UserManager<User>>());
            await AddTesData(services.GetRequiredService<Context>());
        }

        public static async Task AddTesData(Context context)
        {
            if (context.Posts.Any())
            {
                //Already has data 
                return;
            }
            else
            {
                context.Posts.Add(new Post
                {
                    Id = 1,
                    Title = "Random Title",
                    Quote = "This is also a sample bloqQuote to display to users when the first see the post card",
                    UserId = 1,
                    CategoryId = 2,
                    Content = "This is a Test Content and it will display as a placeholder for all the pages while in test"
                });
                context.Comments.Add(new Comment
                {
                    Id = 1,
                    PostId = 1,
                    UserId = 1,
                    Message = "This is a default comment"
                });
                context.Comments.Add(new Comment
                {
                    Id = 2,
                    PostId = 1,
                    UserId = 1,
                    Message = "This is a another default comment"
                });
                context.Likes.Add(new Like
                {
                    Id = 1,
                    PostId = 1,
                    UserId = 1
                });
                context.Categories.Add(new Category
                {
                    Id = 1,
                    Name = "Design"
                });
                context.Categories.Add(new Category
                {
                    Id = 2,
                    Name = "Technology"
                });
                context.Categories.Add(new Category
                {
                    Id = 3,
                    Name = "Innovation"
                });
            }

            await context.SaveChangesAsync();
        }

        private static async Task AddTestUsers(UserManager<User> userManager)
        {
            var dataExists = userManager.Users.Any();
            if (dataExists)
            {
                return;
            }



            // Add a test user
            var user = new User
            {
                Email = "admin@blog.local",
                UserName = "admin@blog.local",
                FirstName = "Admin",
                LastName = "Tester",
                Description = "This is a brief description of the author of this post and it will be as detailed",
                FacebookUrl = "www.facebook.com/adelowomi",
                TwitterUrl = "www.twitter.com/adelowomi",
                LinkedInUrl = "www.Linkedin.com/adelowomi"
            };

            await userManager.CreateAsync(user, "Supersecret123!!");

        }

    }
}

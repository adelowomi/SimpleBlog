using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OpenIddict.Validation.AspNetCore;
using SimpleBlog.DataContext;
using SimpleBlog.Interfaces;
using SimpleBlog.Models;
using SimpleBlog.Services;
using SimpleBlog.Utilities;


namespace SimpleBlog
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build());
            });
            //Set up in-memory database for quick development

           services.AddDbContext<Context>(
               options =>
               {
                   options.UseInMemoryDatabase("Blogdb");
                   options.UseOpenIddict<int>();
               });

           services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton<IConfiguration>(provider => Configuration);
            // Uncomment this for production
            //services.AddDbContext<Context>(options =>
            //{
            //    options.UseSqlServer(Configuration.GetConnectionString("StudiomartConnection"));
            //    options.UseOpenIddict<int>();
            //});

            //Add OpenIddict for Authentication and Authorization
            //services.AddOpenIddict()
            //    .AddCore(options =>
            //    {
            //        options.UseEntityFrameworkCore()
            //            .UseDbContext<Context>()
            //            .ReplaceDefaultEntities<int>();
            //    })
            //    .AddServer(options =>
            //    {
            //        options.UseMvc();
            //        options.EnableTokenEndpoint("/token");
            //        options.AllowPasswordFlow();
            //        options.AcceptAnonymousClients();
            //    })
            //    .AddValidation();

            //ASP.NET Core Identity should use the same clam names as OpenIdDict
            services.Configure<IdentityOptions>(options =>
            {
                options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
            });

            var environment = Configuration.GetSection("ApplicationSettings");
            var conections = Configuration.GetSection("ConnectionStrings");

            //Add Custom services here to allow for dependency injections in my controller
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<ILikeService, LikeService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICategoryService, CategoryService>();

            AddIdentityCoreServices(services);
            Globals.Variables = environment;
            Globals.Connectoins = conections;
            Globals.Init();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = Globals.JWTIssuer,
                            ValidAudience = Globals.JWTIssuer,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Globals.JWTKey))
                        };
                    }
                );

            services.AddMvc();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
        private static void AddIdentityCoreServices(IServiceCollection services)
        {
            var builder = services.AddIdentityCore<User>();
            builder = new IdentityBuilder(
                builder.UserType,
                typeof(Role),
                builder.Services
            );

            builder.AddRoles<Role>()
                .AddEntityFrameworkStores<Context>()
                .AddDefaultTokenProviders()
                .AddSignInManager<SignInManager<User>>();
        }
    }
}

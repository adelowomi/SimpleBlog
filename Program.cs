using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using SimpleBlog.DataContext;
using SimpleBlog.Utilities;

namespace SimpleBlog
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var host = CreateHostBuilder(args).Build();
            ConfigureSerilog();
            InitializeDatabase(host);
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.AddConsole();


                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                        .UseSerilog();
                });
        //public static void Main(string[] args)
        //{
        //    CreateHostBuilder(args).Build().Run();
        //}

        //public static IHostBuilder CreateHostBuilder(string[] args) =>
        //    Host.CreateDefaultBuilder(args)
        //        .ConfigureWebHostDefaults(webBuilder =>
        //        {
        //            webBuilder.UseStartup<Startup>();
        //        });

        public static void InitializeDatabase(IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    SeedData.InitializeAsync(services).Wait();
                }
                catch (Exception ex)
                {
                    Logger.Error(ex);
                    return;
                }
            }
        }

        public static void ConfigureSerilog()
        {
            var LoggerMinimumLevelConfiguration = new LoggerConfiguration()
                .MinimumLevel;
            if (LoggerMinimumLevelConfiguration != null)
                Log.Logger = LoggerMinimumLevelConfiguration.Information()
                    .WriteTo.Console()
                    .WriteTo.MSSqlServer(Globals.ConnectionString, "Log")
                    .CreateLogger();

            Log.Information("Logger is Working");
            Logger.Info("This is my first tdd thing");
        }
    }
}

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Sinks.MSSqlServer;

namespace SimpleBlog.Utilities
{
    public class Logger
    {
        private static IConfiguration Configuration;
        public Logger(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static void LogNow(Exception ex, string Type)
        {
            try
            {
                Log.Logger.ForContext("Type", Type).Information(ex.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public static bool Info(string ex)
        {
            try
            {
                LogNow(new Exception(ex), MethodBase.GetCurrentMethod().Name);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
        public static void Error(Exception ex)
        {
            LogNow(ex, MethodBase.GetCurrentMethod().Name);
        }
        public static void Error(string ex)
        {
            LogNow(new Exception(ex), MethodBase.GetCurrentMethod().Name);
        }

        public static void Debug(string ex)
        {
            LogNow(new Exception(ex), MethodBase.GetCurrentMethod().Name);
        }
    }
}

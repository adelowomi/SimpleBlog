using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SimpleBlog.Utilities
{
    public class Globals
    {
        public static IConfiguration Connectoins;
        public static IConfiguration Variables;

        public static string ConnectionString;

        public static void Init()
        {
            ConnectionString = Connectoins["StudiomartConnection"];
        }
    }
}

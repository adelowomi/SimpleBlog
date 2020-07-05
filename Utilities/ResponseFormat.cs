using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Utilities
{
    public class ResponseFormat
    {
        public bool Success  { get; set; }
        public Object Data { get; set; }
        public bool Error { get; set; }
        public string ErrorMessage { get; set; }
    }
}

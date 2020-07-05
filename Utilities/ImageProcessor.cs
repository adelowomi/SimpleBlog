using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace SimpleBlog.Utilities
{
    public class ImageProcessor
    {
        private readonly IWebHostEnvironment _environment;

        public ImageProcessor()
        {
        }

        public ImageProcessor(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public string UploadImage(IFormFile file)
        {
            if (file.Length > 0)
            {
                if (!Directory.Exists(_environment.WebRootPath + "\\images\\" + file.Name))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "\\images\\" + file.Name);
                }

                using (FileStream fileStream =
                    System.IO.File.Create(_environment.WebRootPath + "\\images\\" + file.Name))
                {
                    file.CopyTo(fileStream);
                    fileStream.Flush();
                    return "\\images\\" + file.Name;
                }
            }

            return "Image Upload Failed";
        }

    }
}

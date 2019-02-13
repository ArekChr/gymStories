using System;
using System.IO;
using System.Net.Http.Headers;
using gymNotebook.Core.Exceptions;
using Microsoft.AspNetCore.Http;

namespace gymNotebook.Core.Domain
{
    public class Image : Entity
    {
        public byte[] Content { get; protected set; }

        protected Image()
        {
        }

        public Image(IFormFile content)
        {
            SetContent(content);
        }

        public void SetContent(IFormFile file)
        {
            if (!IsImage(file))
            {
                throw new DomainException(ErrorCodes.InvalidFileFormat, "Invalid image format, acceptable formats: jpg/jpeg");
            }
        
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                Content = fileBytes;
            }
        }

        public bool IsImage(IFormFile file)
        {
            if(file.ContentType != "image/jpeg")
            {
                return false;
            }

            return true;
        }
    }
}

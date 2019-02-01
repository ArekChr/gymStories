using System;
using System.IO;
using System.Net.Http.Headers;
using gymNotebook.Core.Exceptions;
using Microsoft.AspNetCore.Http;

namespace gymNotebook.Core.Domain
{
    public class Image : Entity
    {
        public Guid UserId { get; protected set; }
        public byte[] Content { get; protected set; }

        public Image()
        {
        }

        public Image(Guid userId, IFormFile content)
        {
            UserId = userId;
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
            var fileName = ContentDispositionHeaderValue
                .Parse(file.ContentDisposition)
                .FileName
                .Trim('"');
  
            return fileName.EndsWith(".jpg") || fileName.EndsWith(".jpeg");
        }
    }
}

using gymNotebook.Infrastructure.Commands;
using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class ImageGuid : IResult
    {
        public Guid Id { get; set; }

        public ImageGuid(Guid id)
        {
            Id = id;
        }
    }
}

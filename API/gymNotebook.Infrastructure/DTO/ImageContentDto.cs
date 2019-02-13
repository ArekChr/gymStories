using gymNotebook.Infrastructure.Commands;

namespace gymNotebook.Infrastructure.DTO
{
    public class ImageDto : IResult
    {
        public byte[] Content { get; set; }
    }
}

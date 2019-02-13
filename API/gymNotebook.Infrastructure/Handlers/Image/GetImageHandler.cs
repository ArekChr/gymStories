using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Image;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Image
{
    public class GetImageHandler : IResultHandler<GetImage, ImageDto>
    {
        private readonly IImageService _imageService;

        public GetImageHandler(IImageService imageService)
        {
            _imageService = imageService;
        }

        public async Task<ImageDto> HandleAsync(GetImage command)
        {
            return await _imageService.GetAsync(command.Id);
        }
    }
}

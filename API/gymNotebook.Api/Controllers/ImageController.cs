using System;
using System.Threading.Tasks;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Image;
using gymNotebook.Infrastructure.DTO;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Image")]
    public class ImageController : ApiControllerBase
    {
        private readonly IImageRepository _imageRepository;

        public ImageController(ICommandDispatcher commandDispatcher, IResultDispatcher resultDispatcher, IImageRepository imageRepository)
            : base(commandDispatcher, resultDispatcher)
        {
            _imageRepository = imageRepository;
        }

        [HttpGet("{imageId}")]
        public async Task<IActionResult> Get([FromRoute]Guid imageId)
        {
            //var image = await DispatchAsync<GetImage, ImageDto>(command);

            var image = await _imageRepository.GetAsync(imageId);

            return File(image.Content, "image/jpeg");
        }
    }
}
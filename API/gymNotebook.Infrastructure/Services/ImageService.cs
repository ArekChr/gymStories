using AutoMapper;
using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IImageService : IService
    {
        Task UploadImageAsync(Guid userId, IFormFile file);
        Task<ImageDto> GetAsync(Guid id);
    }

    public class ImageService : IImageService, IService
    {
        private readonly IUserRepository _userRepository;
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;

        public ImageService(IUserRepository userRepository, IImageRepository imageRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _imageRepository = imageRepository;
            _mapper = mapper;
        }

        public async Task UploadImageAsync(Guid userId, IFormFile file)
        {
            var user = await _userRepository.GetAsync(userId);
            if(user == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidUserId, $"User with id: '{userId}' does not exists.");
            }
        }

        public async Task<ImageDto> GetAsync(Guid id)
        {
            var image = await _imageRepository.GetAsync(id);

            return _mapper.Map<Image, ImageDto>(image);
        }
    }
}

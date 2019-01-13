using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IImageService
    {
        Task UploadImageAsync(Guid userId, IFormFile file);
    }

    public class ImageService : IImageService, IService
    {
        private readonly IUserRepository _userRepository;

        public ImageService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task UploadImageAsync(Guid userId, IFormFile file)
        {
            var user = await _userRepository.GetAsync(userId);
            if(user == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidUserId, $"User with id: '{userId}' does not exists.");
            }

            
        }
    }
}

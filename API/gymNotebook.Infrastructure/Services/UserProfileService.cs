using AutoMapper;
using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Profile = gymNotebook.Core.Domain.Profile;

namespace gymNotebook.Infrastructure.Services
{
    public interface IUserProfileService : IService
    {
        Task<ProfileDto> GetAsync(Guid userId);
        Task<ProfileListDto> SearchAsync(string param);
        Task UploadImageAsync(Guid userId, IFormFile file);
    }

    public class UserProfileService : IUserProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IUserRepository _userRepository;
        private readonly IImageRepository _imageRepository;

        private readonly IMapper _mapper;

        public UserProfileService(IProfileRepository profileRepository, IUserRepository userRepository, IImageRepository imageRepository, IMapper mapper)
        {
            _profileRepository = profileRepository;
            _userRepository = userRepository;
            _imageRepository = imageRepository;
            _mapper = mapper;
        }

        public async Task<ProfileDto> GetAsync(Guid userId)
        {
            var user = await _userRepository.GetAsync(userId);
            if(user == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidUserId, $"User with id: {userId} does not exists.");
            }
            var profile = await _profileRepository.GetAsync(userId);
            var profileDto = _mapper.Map<Profile, ProfileDto>(profile);
            profileDto.Email = user.Email;
            return profileDto;
        }

        public async Task<ProfileListDto> SearchAsync(string param)
        {
            var @params = param.Split(' ');
            var profiles = await _profileRepository.SearchAsync(@params);

            var profileDtos =_mapper.Map<IEnumerable<Profile>, IEnumerable<ProfileDto>>(profiles);
            return new ProfileListDto(profileDtos);
        }

        public async Task UploadImageAsync(Guid userId, IFormFile file)
        {
            var user = await _userRepository.GetAsync(userId);
            if (user == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidUserId, $"User with id: '{userId}' does not exists.");
            }

            var image = new Image(userId, null);
            if (file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    //string s = Convert.ToBase64String(fileBytes);
                    image.SetContent(fileBytes);
                }
            }

            var profile = await _profileRepository.GetAsync(userId);
            if (profile.ImageId != Guid.Empty)
            {
                await _imageRepository.UpdateAsync(image);
            }
            else
            {
                await _imageRepository.AddAsync(image);
                profile.SetImage(image.Id);
                await _profileRepository.UpdateAsync(profile);
            }
        }
    }
}

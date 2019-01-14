using AutoMapper;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Exceptions;
using System;
using System.Threading.Tasks;
using Domain = gymNotebook.Core.Domain;

namespace gymNotebook.Infrastructure.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IUserRepository _userRepository;

        private readonly IMapper _mapper;

        public UserProfileService(IProfileRepository profileRepository, IUserRepository userRepository, IMapper mapper)
        {
            _profileRepository = profileRepository;
            _userRepository = userRepository;
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

            var profileDto = _mapper.Map<Domain.Profile, ProfileDto>(profile);
            profileDto.Email = user.Email;
            return profileDto;
        }
    }

    public interface IUserProfileService : IService
    {
        Task<ProfileDto> GetAsync(Guid userId);
    }
}

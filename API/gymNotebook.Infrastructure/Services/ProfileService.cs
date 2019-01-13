using AutoMapper;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Exceptions;
using System;
using System.Threading.Tasks;
using Domain = gymNotebook.Core.Domain;

namespace gymNotebook.Infrastructure.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IMapper _mapper;

        public ProfileService(IProfileRepository profileRepository, IMapper mapper)
        {
            _profileRepository = profileRepository;
            _mapper = mapper;
        }

        public async Task<ProfileDto> GetAsync(Guid userId)
        {
            var profile = await _profileRepository.GetAsync(userId);
            if(profile == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidProfile, $"Profile with userId: {userId} does not exists.");
            }
            return _mapper.Map<Domain.Profile, ProfileDto>(profile);
        }
    }

    public interface IProfileService : IService
    {
        Task<ProfileDto> GetAsync(Guid userId);
    }
}

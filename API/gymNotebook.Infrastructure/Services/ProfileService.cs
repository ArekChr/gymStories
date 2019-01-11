using AutoMapper;
using gymNotebook.Core.Repositories;

namespace gymNotebook.Infrastructure.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IMapper _mapper;
    }

    public interface IProfileService
    {
    }
}

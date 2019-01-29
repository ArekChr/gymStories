using System;
using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.DTO;
using AutoMapper;
using gymNotebook.Infrastructure.Exceptions;
using NLog;

namespace gymNotebook.Infrastructure.Services
{
    public interface IUserService : IService
    {
        Task<UserDto> GetAsync(string email);

        Task RegisterAsync(string email, string password, string firstName, string lastName, DateTime dateOfBirth, string gender);

        Task LoginAsync(string email, string password);
    }

    public class UserService : IUserService
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger(); // object reference null
        private readonly IUserRepository _userRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly IMapper _mapper;
        private readonly IEncrypter _encrypter;

        public UserService(IUserRepository userRepository, IProfileRepository profileRepository, IEncrypter encrypter, IMapper mapper)
        {
            _userRepository = userRepository;
            _profileRepository = profileRepository;
            _mapper = mapper;
            _encrypter = encrypter;
        }

        public async Task<UserDto> GetAsync(string email)
        {
            var user = await _userRepository.GetAsync(email);

            return _mapper.Map<User, UserDto>(user);
        }

        public async Task LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetAsync(email);
            if(user == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidCredentials, "Invalid credentials");
            }
            var hash = _encrypter.GetHash(password, user.Salt);
            if (user.Password == hash)
            {
                return;
            }
            throw new ServiceException(ErrorServiceCodes.InvalidCredentials, "Invalid credentials");
        }

        public async Task RegisterAsync(string email, string password, string firstName, string lastName, DateTime dateOfBirth, string gender)
        {
            var user = await _userRepository.GetAsync(email);
            if(user != null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidEmail, $"User with email: '{email}' already exists.");
            }
            var salt = _encrypter.GetSalt(password);
            var hash = _encrypter.GetHash(password, salt);
            user = new User(email, hash, salt);
            var profile = new Core.Domain.Profile(
                userId: user.Id,
                firstName: firstName,
                dateOfBirth: dateOfBirth,
                gender: gender,
                lastName: lastName);

            await _userRepository.AddAsync(user);
            await _profileRepository.AddAsync(profile);

        }
    }
}

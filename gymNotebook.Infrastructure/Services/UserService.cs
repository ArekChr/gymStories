using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.DTO;
using AutoMapper;
using gymNotebook.Infrastructure.Exceptions;

namespace gymNotebook.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IEncrypter _encrypter;

        public UserService(IUserRepository userRepository, IEncrypter encrypter, IMapper mapper)
        {
            _userRepository = userRepository;
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
            var salt = _encrypter.GetSalt(password);
            var hash = _encrypter.GetHash(password, salt);
            if (user.Password == hash)
            {
                return;
            }
            throw new ServiceException(ErrorServiceCodes.InvalidCredentials, "Invalid credentials");
        }

        public async Task RegisterAsync(string username, string email, string password)
        {
            var user = await _userRepository.GetAsync(email);
            if(user != null)
            {
                throw new ServiceException(ErrorServiceCodes.EmailInUse, $"User with email: '{email}' already exists.");
            }
            var salt = _encrypter.GetSalt(password);
            var hash = _encrypter.GetHash(password, salt);
            user = new User(email, username, hash, salt);
            await _userRepository.AddAsync(user);
        }
    }
}

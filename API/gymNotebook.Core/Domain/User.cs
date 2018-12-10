using gymNotebook.Core.Exceptions;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace gymNotebook.Core.Domain
{
    public class User : Entity
    {
        private ISet<Training> _trainings = new HashSet<Training>();
        private ISet<Progress> _progress = new HashSet<Progress>();
        private ISet<Friend> _friends = new HashSet<Friend>();

        private static List<string> _roles = new List<string>
        {
            "user", "admin"
        };

        public string Role { get; protected set; }

        public string Username { get; protected set; }

        public string Email { get; protected set; }

        public string Password { get; protected set; }

        public string Salt { get; protected set; }

        public DateTime CreateAt { get; protected set; }

        public IEnumerable<Training> Trainings => _trainings;
        public IEnumerable<Progress> Progress => _progress;
        public IEnumerable<Friend> Friends => _friends;

        private static readonly Regex EmailRegex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
        private static readonly Regex NameRegex = new Regex("^(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._.-]+(?<![_.-])$");

        protected User()
        {
        }

        public User(string username, string email, string password, string salt)
        {
            Id = Guid.NewGuid();
            //SetRole(role);
            SetUsername(username);
            SetEmail(email);
            SetPassword(password);
            Salt = salt;
            CreateAt = DateTime.UtcNow;
        }

        public void SetUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                throw new DomainException(ErrorCodes.InvalidUsername, $"User can not have an empty username.");
            }
            else if(!NameRegex.IsMatch(username))
            {
                throw new DomainException(ErrorCodes.InvalidUsername, $"Invalid characters in username: {username}.");
            }
            Username = username;
        }

        public void SetEmail(string email)
        {
            
            if (!EmailRegex.Match(email).Success)
            {
                throw new DomainException(ErrorCodes.InvalidEmail, $"User can not have an empty email.");
            }
            Email = email.ToLowerInvariant();
        }

        public void SetRole(string role)
        {
            if (string.IsNullOrWhiteSpace(role))
            {
                throw new DomainException(ErrorCodes.InvalidRole, $"User can not have an empty role.");
            }
            role = role.ToLowerInvariant();
            if (!_roles.Contains(role))
            {
                throw new DomainException(ErrorCodes.InvalidRole, $"User can not have a role: '{role}'.");
            }
            Role = role;
        }

        public void SetPassword(string password)
        {
            var hasMiniMaxChars = new Regex(@".{6,20}");
            if (!hasMiniMaxChars.IsMatch(password))
            {
                throw new DomainException(ErrorCodes.InvalidPassword, $"Password should not be less than 6 or greater than 20 characters.");
            }

            var hasNumber = new Regex(@"[0-9]+");
            if (!hasNumber.IsMatch(password))
            {
                throw new DomainException(ErrorCodes.InvalidPassword, $"Password should contain At least one numeric value.");
            }
            Password = password;
        }
    }
}

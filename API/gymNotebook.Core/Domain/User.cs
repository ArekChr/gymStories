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
        private ISet<CommentUserRels> _comments = new HashSet<CommentUserRels>();
        private ISet<Post> _posts = new HashSet<Post>();
        private ISet<Follow> _follows = new HashSet<Follow>();

        private static List<string> _roles = new List<string>
        {
            "user", "admin"
        };

        public string Role { get; protected set; }
        public string Email { get; protected set; }
        public string Password { get; protected set; }
        public string Salt { get; protected set; }
        public DateTime CreateAt { get; protected set; }

        public Profile Profile { get; protected set; }
        public IEnumerable<Follow> Follows => _follows;
        public IEnumerable<Post> Posts => _posts;
        public IEnumerable<Training> Trainings => _trainings;
        public IEnumerable<Progress> Progress => _progress;
        public IEnumerable<Friend> Friends => _friends;
        public IEnumerable<CommentUserRels> CommentUserRels => _comments;

        private static readonly Regex EmailRegex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
        private static readonly Regex NameRegex = new Regex("^(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._.-]+(?<![_.-])$");

        protected User()
        {
        }

        public User(string email, string hash, string salt)
        {
            Id = Guid.NewGuid();
            //SetRole(role);
            SetEmail(email);
            Password = hash;
            Salt = salt;
            CreateAt = DateTime.UtcNow;
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

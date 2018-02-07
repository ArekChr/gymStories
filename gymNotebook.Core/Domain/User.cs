using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace gymNotebook.Core.Domain
{
    public class User : Entity
    {
        private ISet<Training> _trainings = new HashSet<Training>();
        private ISet<Progress> _progress = new HashSet<Progress>();

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
            CreateAt = DateTime.UtcNow;
        }

        public void AddTraining(Guid userId, Guid trainingId, string name, string description, byte difficulty)
        {
            _trainings.Add(new Training(userId, trainingId, name, description, difficulty));
        }

        public void AddProgress(float weight, float biceps, float chest, float thigh, float calf, float waist, float shoulders, float neck)
        {
            _progress.Add(new Progress(weight, biceps, chest, thigh, calf, waist, shoulders, neck));
        }

        public void SetUsername(string username)
        {
            if (!NameRegex.IsMatch(username))
            {
                throw new Exception($"User can not have an empty username.");
            }
            Username = username;
        }

        public void SetEmail(string email)
        {
            
            if (!EmailRegex.Match(email).Success)
            {
                throw new Exception($"User can not have an empty email.");
            }
            Email = email.ToLowerInvariant();
        }

        public void SetRole(string role)
        {
            if (string.IsNullOrWhiteSpace(role))
            {
                throw new Exception($"User can not have an empty role.");
            }
            role = role.ToLowerInvariant();
            if (!_roles.Contains(role))
            {
                throw new Exception($"User can not have a role: '{role}'.");
            }
            Role = role;
        }

        public void SetPassword(string password)
        {
            var hasMiniMaxChars = new Regex(@".{6,20}");
            if (!hasMiniMaxChars.IsMatch(password))
            {
                throw new Exception($"Password should not be less than 6 or greater than 20 characters.");
            }

            var hasNumber = new Regex(@"[0-9]+");
            if (!hasNumber.IsMatch(password))
            {
                throw new Exception($"Password should contain At least one numeric value.");
            }
            Password = password;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Core.Domain
{
    public class User : Entity
    {
        private ISet<Training> _trainings = new HashSet<Training>();

        public string Role { get; protected set; }

        public string Name { get; protected set; }

        public string Email { get; protected set; }

        public string Password { get; protected set; }

        public DateTime CreateAt { get; protected set; }

        public IEnumerable<Training> Trainings => _trainings;

        protected User()
        {
        }

        public User(Guid id, string role, string name, string email, string password)
        {
            Id = id;
            Role = role;
            Name = name;
            Email = email;
            Password = password;
            CreateAt = DateTime.UtcNow;
        }

        public void AddTraining(Guid id, string name, string description)
        {
            _trainings.Add(new Training(this, name, description));
        }
    }
}

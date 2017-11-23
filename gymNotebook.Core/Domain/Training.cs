using System;
using System.Collections.Generic;

namespace gymNotebook.Core.Domain
{
    public class Training : Entity
    {
        private ISet<Routine> _routines = new HashSet<Routine>();

        public Guid UserId { get; protected set; }

        public string Name { get; protected set; }

        public string Description { get; protected set; }

        public int Difficulty { get; protected set; }

        public IEnumerable<Routine> Toutines => _routines;

        protected Training()
        {
        }

        public Training(User user, Guid id, string name, string description, int difficulty)
        {
            Id = id;
            UserId = user.Id;
            Name = name;
            Description = description;
            Difficulty = difficulty;
        }

        public void AddRoutine(string name)
        {
            _routines.Add(new Routine(this, name));
        }

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new Exception($"Routine with id: '{Id}' can not have an empty name.");
            }
        }

        public void SetDescription(string description)
        {
            Description = description;
        }
    }
}
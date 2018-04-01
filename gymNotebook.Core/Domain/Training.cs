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

        public byte Difficulty { get; protected set; }

        public IEnumerable<Routine> Routines => _routines;

        protected Training()
        {
        }

        public Training(Guid userId, Guid trainingId, string name, string description, byte difficulty)
        {
            Id = trainingId;
            UserId = userId;
            SetName(name);
            SetDescription(description);
            SetDifficulty(difficulty);
        }

        public void SetUser(Guid userId)
        {
            if (userId == null)
            {
                throw new DomainException(ErrorCodes.InvalidTraining, "Training can not have an empty userId.");
            }
            UserId = userId;
        }

        public void AddRoutine(Guid trainingId, string name)
        {
            _routines.Add(new Routine(trainingId, name));
        }

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new DomainException(ErrorCodes.InvalidTraining, $"Training with id: '{Id}' can not have an empty name.");
            }
            Name = name;
        }

        public void SetDescription(string description)
        {
            Description = description;
        }

        public void SetDifficulty(byte difficulty)
        {
            Difficulty = difficulty;
        }
    }
}
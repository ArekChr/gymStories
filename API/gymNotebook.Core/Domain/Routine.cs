using System;
using System.Collections.Generic;
using gymNotebook.Core.Exceptions;

namespace gymNotebook.Core.Domain
{
    public class Routine : Entity
    {
        private ISet<Exercise> _exercises = new HashSet<Exercise>();

        public Guid TrainingId { get; protected set; }

        public string Name { get; protected set; }

        public IEnumerable<Exercise> Exercises => _exercises;

        protected Routine()
        {
        }

        public Routine(Guid trainingId, string name)
        {
            TrainingId = trainingId;
            SetName(name);
        }

        public void AddExercise(Guid routineId, string name, string description, string musclePart)
        {
            _exercises.Add(new Exercise(routineId, name, description, musclePart));
        }

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new DomainException(ErrorCodes.InvalidRoutine, $"Routine can not have an empty name.");
            }
            Name = name;
        }
    }
}
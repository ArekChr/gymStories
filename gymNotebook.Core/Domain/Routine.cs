using System;
using System.Collections.Generic;

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

        public Routine(Training training, string name)
        {

        }

        public void AddExercise(string name, string description)
        {
            _exercises(new Exercise(this, name, description));
        }
    }
}
using System;
using System.Collections.Generic;


namespace gymNotebook.Core.Domain
{
    public class Exercise : Entity
    {
        private ISet<Result> _results = new HashSet<Result>();

        public Guid RoutineId { get; protected set; }

        public string Name { get; protected set; }

        public string Description { get; protected set; }

        public string MusclePart { get; protected set; }

        public IEnumerable<Result> Results => _results;

        protected Exercise()
        {
        }

        public Exercise(Guid routineId, string name, string description, string musclePart)
        {
            RoutineId = routineId;
            SetName(name);
            SetDescription(description);
            SetMusclePart(musclePart);
        }

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new Exception($"Exercise with id: '{Id}' can not have an empty name.");
            }
            Name = name;
        }

        public void SetDescription(string description)
        {
            Description = description;
        }

        public void SetMusclePart(string musclePart)
        {
            if (string.IsNullOrWhiteSpace(musclePart))
            {
                throw new Exception($"Exercise with id: '{Id}' can not have empty muscle part.");
            }
            MusclePart = musclePart;
        }

        public void AddResult(Guid exerciseId, int numberSeries, int repetitions, float weight, string comments)
        {
            _results.Add(new Result(exerciseId, numberSeries, repetitions, weight, comments));
        }
    }
}
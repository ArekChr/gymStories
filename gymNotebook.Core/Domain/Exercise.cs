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

        public Exercise(Routine routine, string name, string description, string musclePart)
        {
            RoutineId = routine.Id;
            Name = name;
            Description = description;
            MusclePart = musclePart;
        }

        public void AddResult(Guid exerciseId, int numberSeries, int repetitions, float weight, string comments)
        {
            _results.Add(new Result(exerciseId, numberSeries, repetitions, weight, comments));
        }
    }
}
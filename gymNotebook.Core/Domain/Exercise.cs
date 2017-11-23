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

        public string MusclePart { get; set; }

        public IEnumerable<Result> Results => _results;

        protected Exercise()
        {
        }

        public Exercise(Routine routine, string name, string description)
        {
            RoutineId = routine.Id;
            Name = name;
            Description = description;
        }

        public void AddResult(int numberSeries, int repetitions, float weight, string comments)
        {
            _results.Add(new Result(this, numberSeries, repetitions, weight, comments));
        }
    }
}
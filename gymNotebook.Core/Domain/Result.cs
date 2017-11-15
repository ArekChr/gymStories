using System;

namespace gymNotebook.Core.Domain
{
    public class Result
    {
        public Guid ExerciseID { get; set; }

        public int NumberSeries { get; set; }

        public int Repetitions { get; set; }

        public float Weigth { get; set; }

        public string Comments { get; set; }

        public DateTime Datetime { get; set; }

        protected Result()
        {
        }

        public Result(Exercise exercise, int numberSeries, int Repetitions, float weight, string comments)
        {
            ExerciseID = exercise.Id;
        }
    }
}
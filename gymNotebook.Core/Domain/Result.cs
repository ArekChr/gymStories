using System;

namespace gymNotebook.Core.Domain
{
    public class Result : Entity
    {
        public Guid ExerciseId { get; protected set; }

        public int NumberSeries { get; protected set; }

        public int Repetitions { get; protected set; }

        public float Weigth { get; protected set; }

        public string Comments { get; protected set; }

        public DateTime CreatedAt { get; protected set; }

        protected Result()
        {
        }

        public Result(Guid exerciseId, int numberSeries, int repetitions, float weight, string comments)
        {
            ExerciseId = exerciseId;
            SetNumberSeries(numberSeries);
            Repetitions = repetitions;
            SetWeigth(weight);
            SetComment(comments);
            CreatedAt = DateTime.UtcNow;
        }

        public void SetComment(string comments)
        {
            Comments = comments;
        }

        public void SetNumberSeries(int numberSeries)
        {
            if(numberSeries == 0)
            {
                throw new Exception($"Number of series can not be equal to zreo.");
            }
            NumberSeries = numberSeries;
        }

        public void SetWeigth(float weigth)
        {
            Weigth = weigth;
        }
    }
}
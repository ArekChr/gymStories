using gymNotebook.Infrastructure.Commands;
using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class ResultDto : IResult
    {
        public Guid Id { get; set; }

        public Guid ExerciseId { get; set; }

        public int NumberSeries { get; set; }

        public int Repetitions { get; set; }

        public float Weigth { get; set; }
    }
}

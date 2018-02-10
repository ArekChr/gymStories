using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class ExerciseDto
    {
        public Guid Id { get; set; }

        public Guid RoutineId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string MusclePart { get; set; }
    }
}

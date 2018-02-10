using System.Collections.Generic;

namespace gymNotebook.Infrastructure.DTO
{
    public class AllRoutineDto : RoutineDto
    {
        public IEnumerable<ExerciseDto> Exercises { get; set; }
    }
}

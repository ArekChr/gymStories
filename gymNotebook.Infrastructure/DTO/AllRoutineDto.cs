using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.DTO
{
    public class AllRoutineDto : RoutineDto
    {
        public IEnumerable<ExerciseDto> Exercises { get; set; }
    }
}

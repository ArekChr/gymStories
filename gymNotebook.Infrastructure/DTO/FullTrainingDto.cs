using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.DTO
{
    public class FullTrainingDto : TrainingDto
    {
        public IEnumerable<AllRoutineDto> RoutinesDto { get; set; }
    }
}

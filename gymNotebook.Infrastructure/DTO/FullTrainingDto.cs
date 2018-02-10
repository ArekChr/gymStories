using System.Collections.Generic;

namespace gymNotebook.Infrastructure.DTO
{
    public class FullTrainingDto : TrainingDto
    {
        public IEnumerable<AllRoutineDto> RoutinesDto { get; set; }
    }
}

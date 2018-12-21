using gymNotebook.Infrastructure.Commands;
using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class RoutineDto : IResult
    {
        public Guid Id { get; set; }

        public Guid TrainingId { get; set; }

        public string Name { get; set; }
    }
}

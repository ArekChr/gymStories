using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.DTO
{
    public class RoutineDto
    {
        public Guid Id { get; set; }

        public Guid TrainingId { get; set; }

        public string Name { get; set; }
    }
}

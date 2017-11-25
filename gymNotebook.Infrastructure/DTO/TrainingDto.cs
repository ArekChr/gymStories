using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.DTO
{
    public class TrainingDto
    {
        public Guid id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Difficulty { get; set; }
    }
}

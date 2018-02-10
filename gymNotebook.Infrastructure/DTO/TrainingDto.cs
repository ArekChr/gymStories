using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class TrainingDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Difficulty { get; set; }
    }
}

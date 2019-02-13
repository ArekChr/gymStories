using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Progress
{
    public class UpdateProgress : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }

        public float Weight { get; set; }

        public float Biceps { get; set; }

        public float Chest { get; set; }

        public float Thigh { get; set; }

        public float Calf { get; set; }

        public float Waist { get; set; }

        public float Shoulders { get; set; }

        public float Neck { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}

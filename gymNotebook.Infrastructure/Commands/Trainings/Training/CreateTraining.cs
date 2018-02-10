﻿using System;

namespace gymNotebook.Infrastructure.Commands.Trainings.Training
{
    public class CreateTraining : ICommand
    {
        public Guid UserId { get; set; }

        public Guid TrainingId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public byte Difficulty { get; set; }
    }
}

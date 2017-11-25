using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Training
{
    public class UpdateTraining : ICommand
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Difficulty { get; set; }
    }
}

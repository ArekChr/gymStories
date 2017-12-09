using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Users
{
    public class CreateTraining
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Difficulity { get; set; }
    }
}

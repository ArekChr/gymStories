﻿using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Routines
{
    public class DeleteRoutine : AuthenticatedCommandBase
    {
        public Guid routineId { get; set; }
    }
}

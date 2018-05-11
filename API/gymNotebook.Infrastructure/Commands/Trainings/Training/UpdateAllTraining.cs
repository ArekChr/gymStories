using gymNotebook.Infrastructure.Commands.Trainings.Routines;
using System.Collections.Generic;

namespace gymNotebook.Infrastructure.Commands.Trainings.Training
{
    public class UpdateAllTraining : UpdateTraining
    {
        public IEnumerable<UpdateAllRoutines> updateAllRoutines { get; set; }
    }
}

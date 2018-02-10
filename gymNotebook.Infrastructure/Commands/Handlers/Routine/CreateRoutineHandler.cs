using gymNotebook.Infrastructure.Commands.Trainings.Routines;
using gymNotebook.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands.Handlers.Routine
{
    public class CreateRoutineHandler : ICommandHandler<CreateRoutine>
    {
        private readonly IRoutineService _routineService;

        public CreateRoutineHandler(IRoutineService routineService)
        {
            _routineService = routineService;
        }

        public async Task HandleAsync(CreateRoutine command)
        {
            await _routineService.CreateAsync(command.TrainingId, command.Name);
        }
    }
}

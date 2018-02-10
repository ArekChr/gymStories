using gymNotebook.Infrastructure.Commands.Trainings.Routines;
using gymNotebook.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands.Handlers.Routine
{
    public class DeleteRoutineHandler : ICommandHandler<DeleteRoutine>
    {
        private readonly IRoutineService _routineService;

        public DeleteRoutineHandler(IRoutineService routineService)
        {
            _routineService = routineService;
        }

        public async Task HandleAsync(DeleteRoutine command)
        {
            await _routineService.DeleteAsync(command.routineId);
        }
    }
}

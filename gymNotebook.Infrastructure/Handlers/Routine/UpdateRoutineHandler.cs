using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Routines;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Routine
{
    public class UpdateRoutineHandler : ICommandHandler<UpdateRoutine>
    {
        private readonly IRoutineService _routineService;

        public UpdateRoutineHandler(IRoutineService routineService)
        {
            _routineService = routineService;
        }

        public async Task HandleAsync(UpdateRoutine command)
        {
            await _routineService.UpdateAsync(command.TrainingId, command.Name);
        }
    }
}

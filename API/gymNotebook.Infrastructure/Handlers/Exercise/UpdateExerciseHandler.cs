using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Exercises;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Exercise
{
    public class UpdateExerciseHandler : ICommandHandler<UpdateExercise>
    {
        private readonly IExerciseService _exerciseService;

        public UpdateExerciseHandler(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        public async Task HandleAsync(UpdateExercise command)
        {
            await _exerciseService.UpdateAsync(command.Id, command.Name, command.Description, command.MusclePart);
        }
    }
}

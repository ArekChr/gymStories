using gymNotebook.Infrastructure.Commands.Trainings.Exercises;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands.Handlers.Exercise
{
    public class DeleteExerciseHandler : ICommandHandler<DeleteExercise>
    {
        private readonly IExerciseService _exerciseService;

        public DeleteExerciseHandler(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        public async Task HandleAsync(DeleteExercise command)
        {
            await _exerciseService.DeleteAsync(command.id);
        }
    }
}

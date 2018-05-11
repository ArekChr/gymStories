using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Training;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Training
{
    public class UpdateTrainingHandler : ICommandHandler<UpdateTraining>
    {
        private readonly ITrainingService _trainingService;

        public UpdateTrainingHandler(ITrainingService trainingService)
        {
            _trainingService = trainingService;
        }

        public async Task HandleAsync(UpdateTraining command)
        {
            await _trainingService.UpdateAsync(command.TrainingId, command.Name, command.Description, command.Difficulty);
        }
    }
}

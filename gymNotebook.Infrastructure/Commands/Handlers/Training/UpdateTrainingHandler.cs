using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.Commands.Training;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands.Handlers.Training
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

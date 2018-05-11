using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Training;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Training
{
    public class CreateTrainingHandler : ICommandHandler<CreateTraining>
    {
        private readonly ITrainingService _trainingService;

        public CreateTrainingHandler(ITrainingService trainingService)
        {
            _trainingService = trainingService;
        }

        public async Task HandleAsync(CreateTraining command)
        {
            await _trainingService.CreateAsync(command.UserId, command.TrainingId, command.Name, command.Description, command.Difficulty);
        }
    }
}

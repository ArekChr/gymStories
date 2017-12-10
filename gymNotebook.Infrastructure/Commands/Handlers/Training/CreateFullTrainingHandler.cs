using gymNotebook.Infrastructure.Commands.Trainings.Training;
using gymNotebook.Infrastructure.Services;
using System;
using System.Collections;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands.Handlers.Training
{
    public class CreateFullTrainingHandler : ICommandHandler<CreateFullTraining>
    {
        private readonly IFullTrainingService _fullTrainingService;

        public CreateFullTrainingHandler(IFullTrainingService fullTrainingService)
        {
            _fullTrainingService = fullTrainingService;
        }

        public async Task HandleAsync(CreateFullTraining command)
        {
            await _fullTrainingService.CreateAsync(command);
        }
    }
}

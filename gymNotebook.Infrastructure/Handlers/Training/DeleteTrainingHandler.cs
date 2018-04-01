using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Training;
using gymNotebook.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Training
{
    public class DeleteTrainingHandler : ICommandHandler<DeleteTraining>
    {
        private readonly ITrainingService _trainingService;

        public DeleteTrainingHandler(ITrainingService trainingService)
        {
            _trainingService = trainingService;
        }

        public async Task HandleAsync(DeleteTraining command)
        {
            await _trainingService.DeleteAsync(command.trainingId);
        }
    }
}

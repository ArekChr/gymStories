using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Progress;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Progress
{
    public class UpdateProgressHandler : ICommandHandler<UpdateProgress>
    {
        private readonly IProgressService _progressService;

        public UpdateProgressHandler(IProgressService progressService)
        {
            _progressService = progressService;
        }

        public async Task HandleAsync(UpdateProgress command)
        {
            await _progressService.UpdateAsync(command.Id, command.Weight, command.Biceps, command.Chest,
                command.Thigh, command.Calf, command.Waist, command.Shoulders, command.Neck);
        }
    }
}

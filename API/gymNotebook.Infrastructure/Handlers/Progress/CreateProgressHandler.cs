using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Progress;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Progress
{
    public class CreateProgressHandler : ICommandHandler<CreateProgress>
    {
        private readonly IProgressService _progressService;

        public CreateProgressHandler(IProgressService progressService)
        {
            _progressService = progressService;
        }

        public async Task HandleAsync(CreateProgress command)
        {
            await _progressService.CreateAsync(command.UserId, command.CreatedAt, command.Weight, command.Biceps, command.Chest, 
                command.Thigh, command.Calf, command.Waist, command.Shoulders, command.Neck);
        }
    }
}

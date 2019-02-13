using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Progress;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Progress
{
    public class GetProgressHandler : ICommandHandler<GetProgress>
    {
        private readonly IProgressService _progressService;

        public GetProgressHandler(IProgressService progressService)
        {
            _progressService = progressService;
        }

        public async Task HandleAsync(GetProgress command)
        {
            await _progressService.GetAsync(command.Id);
        }
    }
}

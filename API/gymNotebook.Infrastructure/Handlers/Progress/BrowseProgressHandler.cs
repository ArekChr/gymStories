using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Progress;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Progress
{
    public class BrowseProgressHandler : IResultHandler<BrowseProgress, ProgressListDto>
    {
        private readonly IProgressService _progressService;

        public BrowseProgressHandler(IProgressService progressService)
        {
            _progressService = progressService;
        }

        public async Task<ProgressListDto> HandleAsync(BrowseProgress command)
        {
            return await _progressService.BrowseAsync(command.UserId);
        }
    }
}

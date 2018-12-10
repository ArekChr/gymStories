using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Progress;
using gymNotebook.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Progress
{
    public class DeleteProgressHandler : ICommandHandler<DeleteProgress>
    {
        private readonly IProgressService _progressService;

        public DeleteProgressHandler(IProgressService progressService)
        {
            _progressService = progressService;
        }

        public async Task HandleAsync(DeleteProgress command)
        {
            await _progressService.DeleteAsync(command.Id);
        }
    }
}

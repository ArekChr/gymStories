using gymNotebook.Infrastructure.Commands.Trainings.Results;
using gymNotebook.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands.Handlers.Result
{
    public class DeleteResultHandler : ICommandHandler<DeleteResult>
    {
        private readonly IResultService _resultService;

        public DeleteResultHandler(IResultService resultService)
        {
            _resultService = resultService;
        }

        public async Task HandleAsync(DeleteResult command)
        {
            await _resultService.DeleteAsync(command.Id);
        }
    }
}

using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Results;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Result
{
    public class UpdateResultHandler : ICommandHandler<UpdateResult>
    {
        private readonly IResultService _resultService;

        public UpdateResultHandler(IResultService resultService)
        {
            _resultService = resultService;
        }

        public async Task HandleAsync(UpdateResult command)
        {
            await _resultService.UpdateAsync(command.Id, command.Repetitions, command.Weigth, command.Comments);
        }
    }
}

using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Results;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Results
{
    public class CreateResultHandler : ICommandHandler<CreateResult>
    {
        private readonly IResultService _resultService;

        public CreateResultHandler(IResultService resultService)
        {
            _resultService = resultService;
        }

        public async Task HandleAsync(CreateResult command)
        {
            await _resultService.CreateAsync(command.ExerciseId, command.NumberSeries, 
                command.Repetitions, command.Weigth, command.Comments);
        }
    }
}

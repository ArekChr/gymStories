using gymNotebook.Infrastructure.Commands.Trainings.Exercises;
using gymNotebook.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands.Handlers.Exercise
{
    public class CreateExerciseHandler : ICommandHandler<CreateExercise>
    {
        private readonly IExerciseService _exerciseService;

        public CreateExerciseHandler(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        public async Task HandleAsync(CreateExercise command)
        {
            await _exerciseService.CreateAsync(command.RoutineId, command.Name, command.Description, command.MusclePart);
        }
    }
}

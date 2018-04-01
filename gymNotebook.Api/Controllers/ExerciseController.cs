using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Exercises;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Route("api/Exercise")]
    [Produces("application/json")]
    public class ExerciseController : ApiControllerBase
    {
        private readonly IExerciseService _exerviseService;

        public ExerciseController(IExerciseService exerviseService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _exerviseService = exerviseService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromHeader]Guid routineId)
        {
            var exercises = await _exerviseService.BrowseAsync(routineId);

            return Json(exercises);
        }

        [HttpGet("name")]
        public async Task<IActionResult> Get(Guid routineId, string name)
        {
            var exercises = await _exerviseService.GetAsync(routineId, name);

            return Json(exercises);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateExercise command)
        {
            await DispatchAsync(command);

            return Created($"/routine/{command.Name}", null);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]UpdateExercise command)
        {
            await DispatchAsync(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]DeleteExercise command)
        {
            await DispatchAsync(command);

            return NoContent();
        }
    }
}
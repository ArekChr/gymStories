using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Exercises;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Authorize]
    public class ExerciseController : ApiControllerBase
    {
        private readonly IExerciseService _exerviseService;

        public ExerciseController(IExerciseService exerviseService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _exerviseService = exerviseService;
        }

        // GET: api/Exercise
        [HttpGet("id")]
        public async Task<IActionResult> Get([FromHeader]Guid routineId)
        {
            var exercises = await _exerviseService.BrowseAsync(routineId);

            return Json(exercises);
        }

        // GET: api/Exercise/5
        [HttpGet("{name}")]
        public async Task<IActionResult> Get(Guid routineId, string name)
        {
            var exercises = await _exerviseService.GetAsync(routineId, name);

            return Json(exercises);
        }

        // POST: api/Exercise
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateExercise command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return Created($"/routine/{command.Name}", null);
        }

        // PUT: api/Exercise/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody]UpdateExercise command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }

        // DELETE: api/Exercise/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromBody]DeleteExercise command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }
    }
}
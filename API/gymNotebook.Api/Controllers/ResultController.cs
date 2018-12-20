using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Results;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Route("api/Result")]
    [Produces("application/json")]
    public class ResultController : ApiControllerBase
    {
        private readonly IResultService _resultService;

        public ResultController(IResultService resultService, 
            ICommandDispatcher commandDispatcher,
            IResultDispatcher resultDispatcher)
            : base(commandDispatcher, resultDispatcher)
        {
            _resultService = resultService;
        }

        [HttpGet("id")]
        public async Task<IActionResult> Get([FromHeader]Guid routineId)
        {
            var exercises = await _resultService.BrowseAsync(routineId);

            return Json(exercises);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> Get(Guid routineId, int numberSeries)
        {
            var exercises = await _resultService.GetAsync(routineId, numberSeries);

            return Json(exercises);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateResult command)
        {
            await DispatchAsync(command);

            return Created($"/Result/{command.NumberSeries}", null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody]UpdateResult command)
        {
            await DispatchAsync(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromBody]DeleteResult command)
        {
            await DispatchAsync(command);

            return NoContent();
        }
    }
}
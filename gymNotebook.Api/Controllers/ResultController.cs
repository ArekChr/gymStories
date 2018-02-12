using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Results;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Authorize]
    public class ResultController : ApiControllerBase
    {
        private readonly IResultService _resultService;

        public ResultController(IResultService resultService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _resultService = resultService;
        }
        // GET: api/Result
        [HttpGet("id")]
        public async Task<IActionResult> Get([FromHeader]Guid routineId)
        {
            var exercises = await _resultService.BrowseAsync(routineId);

            return Json(exercises);
        }

        // GET: api/Result/5
        [HttpGet("{name}")]
        public async Task<IActionResult> Get(Guid routineId, int numberSeries)
        {
            var exercises = await _resultService.GetAsync(routineId, numberSeries);

            return Json(exercises);
        }

        // POST: api/Result
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateResult command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return Created($"/Result/{command.NumberSeries}", null);
        }

        // PUT: api/Result/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody]UpdateResult command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }

        // DELETE: api/Result/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromBody]DeleteResult command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }
    }
}
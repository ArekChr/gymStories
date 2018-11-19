using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Progress;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/progress")]
    public class ProgressController : ApiControllerBase
    {
        private readonly IProgressService _progressService;

        public ProgressController(IProgressService progressService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _progressService = progressService;
        }

        [HttpGet("browse/{userId}")]
        public async Task<IActionResult> GetAll(Guid userId)
        {
            var progress = await _progressService.BrowseAsync(userId);

            return Json(progress);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var exercises = await _progressService.GetAsync(id);

            return Json(exercises);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateProgress command)
        {
            await DispatchAsync(command);

            return Created($"/progress/id", command);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]UpdateProgress command)
        {
            await DispatchAsync(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]DeleteProgress command)
        {
            await DispatchAsync(command);

            return NoContent();
        }
    }
}
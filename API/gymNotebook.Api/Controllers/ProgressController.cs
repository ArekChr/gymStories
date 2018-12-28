using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Progress;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/progress")]
    public class ProgressController : ApiControllerBase
    {
        private readonly IProgressService _progressService;

        public ProgressController(IProgressService progressService, 
            ICommandDispatcher commandDispatcher, 
            IResultDispatcher resultDispatcher) 
            : base(commandDispatcher, resultDispatcher)
        {
            _progressService = progressService;
        }

        [HttpGet("browse")]
        public async Task<IActionResult> GetAll(BrowseProgress command)
        {
            var results = await DispatchAsync<BrowseProgress, ProgressListDto>(command);

            return Json(results.ProgressList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(GetProgress command)
        {
            await DispatchAsync(command);

            return Json(null);
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
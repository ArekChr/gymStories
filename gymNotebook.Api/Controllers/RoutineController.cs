using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Routines;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Authorize]
    public class RoutineController : ApiControllerBase
    {
        private readonly IRoutineService _routineService;

        public RoutineController(IRoutineService routineService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _routineService = routineService;
        }

        // GET: Routine
        [HttpGet("")]
        public async Task<IActionResult> Get([FromHeader]Guid trainingId)
        {
            var routines = await _routineService.BrowseAsync(trainingId);

            return Json(routines);
        }

        // GET: api/Routine/5
        [HttpGet("{name}")]
        public async Task<IActionResult> Get(Guid trainingId, string name)
        {
            var routine = await _routineService.GetAsync(trainingId, name);

            return Json(routine);
        }
        
        // POST: api/Routine
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateRoutine command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return Created($"/routine/{command.Name}", null);
        }
        
        // PUT: api/Routine/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody]UpdateRoutine command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }
        
        // DELETE: api/Routine/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

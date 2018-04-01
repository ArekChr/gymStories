using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Routines;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Route("api/Routine")]
    [Produces("application/json")]
    public class RoutineController : ApiControllerBase
    {
        private readonly IRoutineService _routineService;

        public RoutineController(IRoutineService routineService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _routineService = routineService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromHeader]Guid trainingId)
        {
            var routines = await _routineService.BrowseAsync(trainingId);

            return Json(routines);
        }

        [HttpGet("name")]
        public async Task<IActionResult> Get(Guid trainingId, string name)
        {
            var routine = await _routineService.GetAsync(trainingId, name);

            return Json(routine);
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateRoutine command)
        {
            await DispatchAsync(command);

            return Created($"/routine/{command.Name}", null);
        }
        
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]UpdateRoutine command)
        {
            await DispatchAsync(command);

            return NoContent();
        }
        
        [HttpDelete]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}

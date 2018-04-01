using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Training;
using Microsoft.AspNetCore.Authorization;

namespace gymNotebook.Api.Controllers
{

    public class TrainingController : ApiControllerBase
    {
        private readonly ITrainingService _trainingService;

        public TrainingController(ITrainingService trainingService, 
            ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _trainingService = trainingService;
        }

        // GET trainings
        [HttpGet("")]
        public async Task<IActionResult> Get([FromHeader]string userId)
        {
            Guid _userId = new Guid(userId);
            var trainings = await _trainingService.BrowseAsync(_userId);

            return Json(trainings);
        }

        // GET trainings/5
        [HttpGet("{trainingId}")]
        public async Task<IActionResult> Get(Guid trainingId)
        {
            var training = await _trainingService.GetAsync(trainingId);

            return Json(training);
        }

        // POST trainings
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateTraining command)
        {
            command.TrainingId = Guid.NewGuid();
            await CommandDispatcher.DispatchAsync(command);

            return Created($"/training/{command.TrainingId}", null);
        }

        // PUT trainings/5
        [HttpPut("{trainingId}")]
        public async Task<IActionResult> Put([FromBody]UpdateTraining command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }

        // DELETE trainings/5
        [HttpDelete("{trainingId}")]
        public async Task<IActionResult> Delete(DeleteTraining command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }
    }
}

using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Trainings.Training;
using Microsoft.AspNetCore.Authorization;
using NLog;

namespace gymNotebook.Api.Controllers
{
    [Route("api/Training")]
    [Produces("application/json")]
    public class TrainingController : ApiControllerBase
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        private readonly ITrainingService _trainingService;

        public TrainingController(ITrainingService trainingService,
            ICommandDispatcher commandDispatcher,
            IResultDispatcher resultDispatcher)
            : base(commandDispatcher, resultDispatcher)
        {
            _trainingService = trainingService;
        }

        [HttpGet("userId")]
        public async Task<IActionResult> Get([FromHeader]string userId)
        {
            Logger.Info("Fetching trainings.");
            Guid _userId = new Guid(userId);
            var trainings = await _trainingService.BrowseAsync(_userId);

            return Json(trainings);
        }

        [HttpGet]
        public async Task<IActionResult> Get(Guid trainingId)
        {
            var training = await _trainingService.GetAsync(trainingId);

            return Json(training);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateTraining command)
        {
            command.TrainingId = Guid.NewGuid();
            await DispatchAsync(command);

            return Created($"/training/{command.TrainingId}", null);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]UpdateTraining command)
        {
            await DispatchAsync(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteTraining command)
        {
            await DispatchAsync(command);

            return NoContent();
        }
    }
}

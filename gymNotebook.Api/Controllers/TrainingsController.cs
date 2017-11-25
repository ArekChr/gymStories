using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands.Training;

namespace gymNotebook.Api.Controllers
{
    [Route("[controller]")]
    public class TrainingsController : Controller
    {
        private readonly ITrainingService _trainingService;

        public TrainingsController(ITrainingService trainingService)
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
            await _trainingService.CreateAsync(command.UserId, command.TrainingId, command.Name, command.Description, command.Difficulty);

            return Created($"/trainings/{command.TrainingId}", null);
        }

        // PUT trainings/5
        [HttpPut("{trainingId}")]
        public async Task<IActionResult> Put(Guid trainingId, [FromBody]UpdateTraining command)
        {
            await _trainingService.UpdateAsync(trainingId, command.Name, command.Description, command.Difficulty);

            return NoContent();
        }

        // DELETE trainings/5
        [HttpDelete("{trainingId}")]
        public async Task<IActionResult> Delete(Guid trainingId)
        {
            await _trainingService.DeleteAsync(trainingId);

            return NoContent();
        }
    }
}

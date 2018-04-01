using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using gymNotebook.Infrastructure.Commands.Trainings.Training;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands;

namespace gymNotebook.Api.Controllers
{
    [Route("api/FullTraining")]
    [Produces("application/json")]
    public class FullTrainingController : ApiControllerBase
    {
        private readonly ITrainingService _trainingService;

        public FullTrainingController(ITrainingService trainingService,
            ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _trainingService = trainingService;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody]CreateFullTraining command)
        {
            command.TrainingId = Guid.NewGuid();
            await DispatchAsync(command);

            return Created($"/trainings/{command.TrainingId}", null);
        }
        
        [HttpDelete]
        public void Delete(int id)
        {
        }
    }
}

using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Profile;
using gymNotebook.Infrastructure.DTO;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Profile")]
    public class ProfileController : ApiControllerBase
    {
        public ProfileController(ICommandDispatcher commandDispatcher, IResultDispatcher resultDispatcher)
            : base(commandDispatcher, resultDispatcher)
        {
        }

        [HttpGet]
        public async Task<IActionResult> Get(GetProfile command)
        {
            var results = await DispatchAsync<GetProfile, ProfileDto>(command);

            return Json(results);
        }

    }
}
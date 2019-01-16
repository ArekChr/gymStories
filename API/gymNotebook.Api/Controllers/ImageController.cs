using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Image")]
    public class ImageController : ApiControllerBase
    {
        public ImageController(ICommandDispatcher commandDispatcher, IResultDispatcher resultDispatcher)
            : base(commandDispatcher, resultDispatcher)
        {
        }

        //[HttpGet("browse")]
        //public async Task<IActionResult> GetAll(BrowseProgress command)
        //{
        //    var results = await DispatchAsync<BrowseProgress, ProgressListDto>(command);

        //    return Json(results.ProgressList);
        //}
    }
}
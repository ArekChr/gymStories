using gymNotebook.Infrastructure.Commands;
using System.Collections.Generic;

namespace gymNotebook.Infrastructure.DTO
{
    public class ProgressListDto : IResult
    {
        public IEnumerable<ProgressDto> ProgressList { get; set; }
    }
}

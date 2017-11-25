using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.DTO
{
    public class ResultDetailDto : ResultDto
    {
        public string Comments { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}

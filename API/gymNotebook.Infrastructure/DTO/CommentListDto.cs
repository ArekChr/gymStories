using gymNotebook.Infrastructure.Commands;
using System;
using System.Collections.Generic;

namespace gymNotebook.Infrastructure.DTO
{
    public class CommentListDto : IResult
    {
        public IList<CommentDto> CommentList { get; set; }

        public CommentListDto(IList<CommentDto> commentDtos)
        {
            CommentList = commentDtos;
        }
    }
}

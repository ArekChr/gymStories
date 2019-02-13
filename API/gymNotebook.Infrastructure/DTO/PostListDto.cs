using gymNotebook.Infrastructure.Commands;
using System.Collections.Generic;

namespace gymNotebook.Infrastructure.DTO
{
    public class PostListDto : IResult
    {
        public IList<PostDto> PostList { get; set; }

        public PostListDto(IList<PostDto> posts)
        {
            PostList = posts;
        }
    }
}

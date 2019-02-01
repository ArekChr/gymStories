using gymNotebook.Infrastructure.Commands;
using System.Collections.Generic;

namespace gymNotebook.Infrastructure.DTO
{
    public class PostListDto : IResult
    {
        public IList<PostDto> PostList { get; set; }

        public IList<ImageDto> ImageList { get; set; }

        public PostListDto(IList<PostDto> posts, IList<ImageDto> images)
        {
            PostList = posts;
            ImageList = images;
        }
    }
}

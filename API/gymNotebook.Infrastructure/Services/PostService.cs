using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.Commands.Posts;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Exceptions;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IPostService : IService
    {
        Task<PostDto> GetAsync(Guid id);

        Task<PostListDto> BrowseAsync(Guid userId);

        Task CreateAsync(CreatePost post);

        Task UpdateAsync(Guid id, Guid userId, string description);

        Task DeleteAsync(Guid id, Guid userId);
    }

    public class PostService : IPostService
    {
        private readonly IPostRepository postRepository;
        private readonly IImageRepository imageRepository;
        private readonly IUserRepository userRepository;
        private readonly IFollowRepository followRepository;

        public PostService(IPostRepository postRepository, IImageRepository imageRepository, IUserRepository userRepository, IFollowRepository followRepository)
        {
            this.postRepository = postRepository;
            this.imageRepository = imageRepository;
            this.userRepository = userRepository;
            this.followRepository = followRepository;
        }

        public async Task<PostListDto> BrowseAsync(Guid userId, int quantity)
        {
            var user = await userRepository.GetAsync(userId);
            if(user == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidUserId, $"User with id: {userId} does not exists.");
            }
            var follows = await followRepository.BrowseFollowedAsync(userId);
            if(follows.Count == 0)
            {
                return null;
            }
            var posts = await postRepository.BrowseAsync(userId);
            if(posts.Count == 0)
            {
                return null;
            }
            var imageIds = posts.Select(x => x.Id).Where(x => x != Guid.Empty).ToList();
            var images = await imageRepository.BrowseAsync(imageIds);
        }

        public async Task CreateAsync(CreatePost post)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteAsync(Guid id, Guid userId)
        {
            throw new NotImplementedException();
        }

        public async Task<PostDto> GetAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(Guid id, Guid userId, string description)
        {
            throw new NotImplementedException();
        }
    }
}

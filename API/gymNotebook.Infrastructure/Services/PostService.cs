using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using gymNotebook.Core.Domain;
using Microsoft.AspNetCore.Http;

namespace gymNotebook.Infrastructure.Services
{
    public interface IPostService : IService
    {
        Task<PostDto> GetAsync(Guid id);

        Task<PostListDto> BrowseAsync(Guid userId, DateTime? startDate, int quantity);

        Task CreateAsync(string description, Guid userId, IFormFile file);

        Task UpdateAsync(Guid id, Guid userId, string description);

        Task DeleteAsync(Guid id, Guid userId);
    }

    public class PostService : IPostService
    {
        private readonly IPostRepository postRepository;
        private readonly IImageRepository imageRepository;
        private readonly IUserRepository userRepository;
        private readonly IFollowRepository followRepository;
        private readonly IMapper mapper;

        public PostService(IPostRepository postRepository, IImageRepository imageRepository, IUserRepository userRepository, IFollowRepository followRepository, IMapper mapper)
        {
            this.postRepository = postRepository;
            this.imageRepository = imageRepository;
            this.userRepository = userRepository;
            this.followRepository = followRepository;
            this.mapper = mapper;
        }

        public async Task<PostListDto> BrowseAsync(Guid userId, DateTime? startDate, int quantity)
        {
            var follows = await followRepository.BrowseFollowedAsync(userId);
            if(follows.Count == 0)
            {
                return null;
            }
            var followersId = follows.Select(x => x.FollowerId).ToList();
            var posts = await postRepository.BrowseHomeAsync(followersId, startDate, quantity);
            if(posts.Count == 0)
            {
                return new PostListDto(null);
            }

            var postsDto = mapper.Map<IList<Post>, IList<PostDto>>(posts);

            return new PostListDto(postsDto);
        }

        public async Task CreateAsync(string description, Guid userId, IFormFile file)
        {
            var user = await userRepository.GetAsync(userId);
            if (user == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidUserId, $"User with id: {userId} does not exist.");
            }
            var image = new Image(file);
            var post = new Post(description, image.Id, userId);

            await postRepository.AddAsync(post);
            await imageRepository.AddAsync(image);
        }

        public async Task DeleteAsync(Guid id, Guid userId)
        {
            var user = await userRepository.GetAsync(userId);
            if (user == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidUserId, $"User with id: {userId} does not exist.");
            }

            var post = await postRepository.GetAsync(id);
            var image = await imageRepository.GetAsync(post.ImageId);
            //TODO: delete image, comments, post
        }

        public async Task<PostDto> GetAsync(Guid id)
        {
            var post = await this.postRepository.GetAsync(id);
            if(post == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidPost, $"Post with id: {id} does not exists.");
            }

            return mapper.Map<Post, PostDto>(post);
        }

        public async Task UpdateAsync(Guid id, Guid userId, string description)
        {
            throw new NotImplementedException();
        }
    }
}

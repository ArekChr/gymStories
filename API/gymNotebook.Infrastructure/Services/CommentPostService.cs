using AutoMapper;
using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface ICommentPostService
    {
        Task<CommentDto> CreateAsync(Guid postId, Guid userId, string content);
        Task<CommentListDto> BrowseAsync(Guid postId);
    }

    public class CommentPostService : ICommentPostService, IService
    {
        private IPostRepository _postRepository;
        private ICommentPostRepository _commentPostRepository;
        private readonly IMapper _mapper;

        public CommentPostService(IPostRepository postRepository, ICommentPostRepository commentPostRepository, IMapper mapper)
        {

            _postRepository = postRepository;
            _commentPostRepository = commentPostRepository;
            _mapper = mapper;
        }

        public async Task<CommentDto> CreateAsync(Guid postId, Guid userId, string content)
        {
            var post = await _postRepository.GetAsync(postId);
            if(post == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidPost, $"Post with id: {postId} doest not exists.");
            }

            var commentPostRel = new CommentPostRels(postId, userId, content);
            var comment = await _commentPostRepository.CreateAsync(commentPostRel);
            post.IncrementComent();
            await _postRepository.UpdateAsync(post);

            return _mapper.Map<Comment, CommentDto>(comment.Comment);
        }

        public async Task<CommentListDto> BrowseAsync(Guid postId)
        {
            var commentsRels = await _commentPostRepository.BrowseAsync(postId);
            if(commentsRels == null)
            {
                throw new ServiceException(ErrorServiceCodes.InvalidPost, $"Post with id: {postId} does not exists.");
            }
            var comments = commentsRels.Select(x => x.Comment).ToList();
            var commentPostDto = _mapper.Map<IList<Comment>, IList<CommentDto>>(comments);

            return new CommentListDto(commentPostDto);
        }
    }
}

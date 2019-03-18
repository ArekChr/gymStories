using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Core.Repositories
{
    public interface ICommentPostRepository : IRepository
    {
        Task<IList<CommentPostRels>> BrowseAsync(Guid postId);
        Task<CommentPostRels> CreateAsync(CommentPostRels commentPostRels);
    }
}

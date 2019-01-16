using System;

namespace gymNotebook.Core.Domain
{
    public class Image : Entity
    {
        public Guid UserId { get; protected set; }
        public byte[] Content { get; protected set; }

        protected Image()
        {
        }
    }
}

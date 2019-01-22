using System;

namespace gymNotebook.Core.Domain
{
    public class Image : Entity
    {
        public Guid UserId { get; protected set; }
        public byte[] Content { get; protected set; }

        public Image()
        {
        }

        public Image(Guid userId, byte[] content)
        {
            UserId = userId;
            SetContent(content);
        }

        public void SetContent(byte[] content)
        {
            Content = content;
        }
    }
}

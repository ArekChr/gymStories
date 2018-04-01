using gymNotebook.Core.Domain;
using System;

namespace gymNotebook.Tests.FactoryObjects
{
    public class TrainingFactory
    {
        private readonly Training _current;

        public TrainingFactory(Guid Id)
        {
            _current = new Training(Guid.Empty, Id, "Training_1", "Test Training", 1);
        }

        public Training Create(Guid id)
        {
            return this._current;
        }
        public TrainingFactory With(Guid userId)
        {
            _current.SetUser(userId);
            return this;
        }
    }
}

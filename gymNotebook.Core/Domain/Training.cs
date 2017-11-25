﻿using System;
using System.Collections.Generic;

namespace gymNotebook.Core.Domain
{
    public class Training : Entity
    {
        private ISet<Routine> _routines = new HashSet<Routine>();

        public Guid UserId { get; protected set; }

        public string Name { get; protected set; }

        public string Description { get; protected set; }

        public int Difficulty { get; protected set; }

        public IEnumerable<Routine> Routines => _routines;

        protected Training()
        {
        }

        public Training(Guid userId, Guid trainingId, string name, string description, int difficulty)
        {
            Id = trainingId;
            UserId = userId;
            SetName(name);
            SetDescription(description);
            SetDifficulty(difficulty);
        }

        public void AddRoutine(string name)
        {
            _routines.Add(new Routine(this, name));
        }

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new Exception($"Routine with id: '{Id}' can not have an empty name.");
            }
            Name = name;
        }

        public void SetDescription(string description)
        {
            Description = description;
        }

        public void SetDifficulty(int difficulty)
        {
            Difficulty = difficulty;
        }
    }
}
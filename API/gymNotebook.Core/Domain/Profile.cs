using gymNotebook.Core.Exceptions;
using System;
using System.Collections.Generic;

namespace gymNotebook.Core.Domain
{
    public class Profile : Entity
    {
        private ISet<Follow> _following = new HashSet<Follow>();
        private ISet<Rate> _rates = new HashSet<Rate>();

        public Guid UserId { get; protected set; }
        public string FirstName { get; protected set; }
        public string LastName { get; protected set; }
        public string Gender { get; protected set; }
        public string Location { get; protected set; }
        public string Description { get; protected set; }
        public Guid ImageId { get; protected set; }
        public bool IsTrainer { get; protected set; }
        public float AverageRates { get; protected set; }
        public int FollowingCount { get; protected set; }
        public int FollowersCount { get; protected set; }
        public string AccountType { get; protected set; }
        public DateTime AccountTypeExpiration { get; protected set; }
        public DateTime DateOfBirth { get; protected set; }
        public DateTime UpdatedAt { get; protected set; }
        public IEnumerable<Follow> Following => _following;
        public IEnumerable<Rate> Rates => _rates;

        protected Profile()
        {
        }

        public Profile(string firstName, string lastName, DateTime dateOfBirth, string gender, Guid userId)
        {
            UserId = userId;
            SetFirstName(firstName);
            SetLastName(lastName);
            SetGender(gender);
            DateOfBirth = dateOfBirth;
            UpdatedAt = DateTime.UtcNow;
            FollowersCount = 0;
            FollowingCount = 0;
            AverageRates = 0;
            IsTrainer = false;
        }

        public void SetGender(string gender)
        {
            if(gender != "Male" && gender != "Female")
            {
                throw new DomainException(ErrorCodes.InvalidProfile, $"Invalid gender: {gender}, possible options: Male/Female.");
            }
            Gender = gender;
        }

        public void SetFirstName(string firstName)
        {
            if (string.IsNullOrEmpty(firstName))
            {
                throw new DomainException(ErrorCodes.InvalidProfile, $"First name can not be empty.");
            }
            FirstName = firstName;
        }

        public void SetLastName(string lastName)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                throw new DomainException(ErrorCodes.InvalidProfile, $"Last name can not be empty.");
            }
            LastName = lastName;
        }
    }
}

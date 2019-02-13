using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Profile
{
    public class UpdateProfileData : AuthenticatedCommandBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string Gender { get; set; }
    }
}

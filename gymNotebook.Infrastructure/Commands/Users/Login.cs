﻿using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Users
{
    public class Login : ICommand
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}

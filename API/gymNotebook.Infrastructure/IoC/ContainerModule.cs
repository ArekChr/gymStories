﻿using Autofac;
using gymNotebook.Infrastructure.IoC.Modules;
using gymNotebook.Infrastructure.Mappers;
using Microsoft.Extensions.Configuration;

namespace gymNotebook.Infrastructure.IoC
{
    public class ContainerModule : Autofac.Module
    {
        private readonly IConfiguration _configuration;

        public ContainerModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterInstance(AutoMapperConfig.Initialize()).SingleInstance();
            builder.RegisterModule<CommandModule>();
            builder.RegisterModule<ResultModule>();
            builder.RegisterModule<RepositoryModule>();
            builder.RegisterModule<MongoModule>();
            builder.RegisterModule<SqlModule>();
            builder.RegisterModule<ServiceModule>();
            builder.RegisterModule(new SettingsModule(_configuration));
        }
    }
}

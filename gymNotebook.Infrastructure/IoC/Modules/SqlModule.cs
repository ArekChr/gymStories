using Autofac;
using gymNotebook.Infrastructure.EF;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace gymNotebook.Infrastructure.IoC.Modules
{
    public class SqlModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assembly = typeof(SqlModule).GetTypeInfo().Assembly;

            builder.RegisterAssemblyTypes(assembly)
                   .Where(x => x.IsAssignableTo<ISqlRepository>())
                   .AsImplementedInterfaces()
                   .InstancePerLifetimeScope();
        }
    }
}

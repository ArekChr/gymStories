using Autofac;
using gymNotebook.Infrastructure.Commands;
using System.Reflection;

namespace gymNotebook.Infrastructure.IoC.Modules
{
    public class ResultModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assembly = typeof(CommandModule).GetTypeInfo().Assembly;

            builder.RegisterAssemblyTypes(assembly)
                   .AsClosedTypesOf(typeof(IResultHandler<,>))
                   .InstancePerLifetimeScope();

            builder.RegisterType<CommandDispatcher>()
                .As<IResultDispatcher>()
                .InstancePerLifetimeScope();
        }
    }
}

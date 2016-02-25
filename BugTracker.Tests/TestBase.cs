using System;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using BugTracker.App;
using BugTracker.App.Models;
using BugTracker.Data.Entities;
using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Entities;
using BugTracker.Shared.Command.Utils;
using BugTracker.Shared.Command.Utils.Abstract;
using BugTracker.Shared.Logging;

using log4net;
using log4net.Appender;
using log4net.Core;
using log4net.Layout;
using log4net.Repository.Hierarchy;

using Microsoft.Practices.Unity;

using Moq;

using NUnit.Framework;

namespace BugTracker.Tests
{
    public abstract class TestBase
    {
        private IUnityContainer unityContainer;

        protected ICommandFactory CommandFactory { get; private set; }

        protected ILog Logger { get; private set; }

        protected ICommandExecutor CommandExecutor { get; private set; }

        private MockRepository mockRepository;

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            var logger = this.CreateLogger();

            this.Logger = logger;
        }

        [SetUp]
        public void SetupDependencyObjects()
        {
            // NOTE: The mocks created in this method are not supposed to be verified at the end of the test.
            // Thus they areen't created with the CreateMock*() Methods.

#if !NCRUNCH
            this.Logger.Debug($"**!!** TEST START: {TestContext.CurrentContext.Test.Name}");
#endif

            this.unityContainer = new UnityContainer();

            this.mockRepository = new MockRepository(MockBehavior.Strict);

            this.CommandExecutor = new CommandExecutor(this.Logger);

            this.CommandFactory = new CommandFactory(this.Logger, this.unityContainer);

            this.RegisterInstanceForDI<ILog>(this.Logger);
            this.RegisterInstanceForDI<ICommandExecutor>(this.CommandExecutor);
            this.RegisterInstanceForDI<ICommandFactory>(this.CommandFactory);

            AutoMapperConfig.Initialize();
        }

        /// <summary>
        /// Resolves an instance of <typeparamref name="T"/> with the help of the unity container for this test instance.
        /// </summary>
        protected T Resolve<T>()
        {
            var instance = this.unityContainer.Resolve<T>();
            return instance;
        }

        protected T ResolveApiController<T>() where T : ApiController
        {
            var controllerInstance = this.unityContainer.Resolve<T>();

            controllerInstance.Request = new HttpRequestMessage();
            controllerInstance.Configuration = new HttpConfiguration();

            return controllerInstance;
        }

        /// <summary>
        /// Creates a mock of <typeparamref name="T"/>.
        /// The mock is verified at the end of the test if all expected setups were met.
        /// </summary>
        protected Mock<T> CreateMock<T>(MockBehavior behavior = MockBehavior.Strict) where T : class
        {
            return this.mockRepository.Create<T>(behavior);
        }

        /// <summary>
        /// Creates a mock of <typeparamref name="T"/> and registers it in the unity container.
        /// The mock is verified at the end of the test if all expected setups were met.
        /// </summary>
        protected Mock<T> CreateMockAndRegisterInDI<T>(MockBehavior behavior = MockBehavior.Strict) where T : class
        {
            var mock = this.CreateMock<T>(behavior);
            this.RegisterInstanceForDI<T>(mock.Object);
            return mock;
        }

        [TearDown]
        public void TearDownDependencyObjects()
        {
            this.mockRepository.VerifyAll();

            this.unityContainer?.Dispose();

#if !NCRUNCH
            this.Logger.Debug($"**!!** TEST ENDED: {TestContext.CurrentContext.Test.Name}");
#endif
        }

        protected CommandBase<T> CreateCommandMock<T>(CommandResult<T> commandResult)
        {
            var commandMock = this.CreateMock<CommandBase<T>>(MockBehavior.Strict);
            commandMock.Setup(x => x.CanExecuteAsync()).ReturnsAsync(new CanExecuteCommandResult(true));
            commandMock.Setup(x => x.ExecuteAsync()).ReturnsAsync(commandResult);
            return commandMock.Object;
        }

        protected CommandBase CreateCommandMock(CommandResult commandResult)
        {
            var commandMock = this.CreateMock<CommandBase>(MockBehavior.Strict);
            commandMock.Setup(x => x.CanExecuteAsync()).ReturnsAsync(new CanExecuteCommandResult(true));
            commandMock.Setup(x => x.ExecuteAsync()).ReturnsAsync(commandResult);
            return commandMock.Object;
        }

        private void RegisterInstanceForDI<T>(T instance)
        {
            this.unityContainer.RegisterInstance<T>(instance);
        }

        private ILog CreateLogger()
        {
            // http://www.ronaldrosier.net/Blog/2013/05/11/create_a_log4net_logger_in_code
            var hierarchy = (Hierarchy)LogManager.GetRepository();

            // since the current type is abstract, the inheriter's type is taken
            var logger = hierarchy.LoggerFactory.CreateLogger(hierarchy, this.GetType().FullName);
            logger.Hierarchy = hierarchy;

            hierarchy.AddRenderer(typeof(Exception), new ExceptionObjectLogger());

            logger.AddAppender(this.CreateConsoleAppender());

            logger.Repository.Configured = true;

            hierarchy.Threshold = Level.All;
            logger.Level = Level.All;

            ILog log = new LogImpl(logger);
            return log;
        }

        private IAppender CreateConsoleAppender()
        {
            var patternLayout = new PatternLayout("%date [%thread] %-5level %logger [%property{NDC}] - %message%newline");

            var consoleAppender = new ConsoleAppender
            {
                Threshold = Level.All,
                Layout = patternLayout
            };

            consoleAppender.ActivateOptions();
            return consoleAppender;
        }
    }
}
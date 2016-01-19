# BugTracker

## Fundamental principles

- Validation of input data (everything that enters the application) must happen right at the application's border (eg: ASP.net, WebAPI, Database, 3rd party services, etc). After that, data is considered as safe to use which means no `data == null`, `userId <= -1` or other plausibility checks are required. Read [Appendix A - Why is <null> evil?](#Appendix_A) for explanation.
- Never return null from a method. If something cannot be found, throw an exception!
- Use the try-get-pattern (eg. `bool TryGetByXYZ(int, out object)` or `bool TryParse(string, out object)`) instead a null-checks on return values. (For the `async` version see the `async` section)
- Access modifier must be as restrictive as possible.
- `using`-statements must be placed at the start of the file, outside of the namespace declaration
- Multiple classes per file are not allowed (except non-generic and generic implementations of the same type).
- Using `#regions` is prohibited
- Names of methods should expose their intent
- Documentation (if any) must contain _why_ something happen, _not how_.
- Base classes must be postfixed with `Base`.
- Mutable class properties must be exposed as `Properties`, not as `Fields`.
- Prefer the use of IList<T> for public api's instead of IEnumerable<T> to signal that the collection is materialized. Otherwise the consumer of your public methods can get confused and call `.ToList()` on your collections.
- Avoid throwing the base exception type `Exception`. Instead, find or create appropiate exception types like `NotSupportedExpection` or `InvalidOperationException`.
- Avoid **ANY** static properties or methods!
- Please avoid returning method returns like `return GetSomeobject(...)` or passing method returns as parameters like `collection.AddRange(GetMassiveArray(...))`. Instead, assign the output to a variable and return this one instead. Exceptions to this rule are: `return returnValue.ToTaskResult();` and `return ex.ToExceptionTaskResult();`.

## Name schema

- Name an assembly or namespace singular or plural?
    - If it's related to a topic: singular
        - eg. BugTracker.Database
    - If it's a collection of the "same" type: plural
        - eg. BugTracker.Database.Entities

- Assemblies
    - Place your project in the appropiate folder (applications, libraries, etc.) and name the folder as your assembly name except the prefix "BugTracker.".
    - The project file itself has to be named exactly as the assembly name, eg. BugTracker.SomeLibrary.

- Assembly postfixes
    - `.Tests` for unit tests
    - `.Models` for collection of shared POCO models (not database entities)
    - `.Database` for database projects that contains the db context and the entities as a subfolder
    - `.WebAPI` for web api projects
    - `.WinService` for windows services
    - `.Shared` contains only extensions to the BugTracker.Shared framework (usually not needed at all!)
    - `.WinApp` for winform applications
    - `.WpfApp` for wpf applications
    - `.WebApp` for pure html/js/css projects that run on the client (does not contains api projects, databse, ...)

## Async programming

We use the `async` and `await` whenever possible to keep the application "fluid".

### Extensions

The class `ObjectExtensions` contains useful methods to wrap objects with task-results or with `Maybe`.
That means you can use `someObject.ToTaskResult()` instead `Task.FromResult(someObject)`, same with `ToMaybe`.

### Try-Get pattern with `async` (`Maybe<T>`)

Once you use async in your method signature you're not allowed to use `ref` or `out` anymore.
Since we __never ever__ return null, we have to use a `Nullable<T>`-alike construct to mimic the same for classes.

```cs
Task<Maybe<User>> TryGetByNameAsync(string name);
```

Notice the `Try` method name prefix to indicate, that we return a `Maybe<T>` here.

### Warning CS1998 - using of `async` but lacks of `await`

Sometimes you have to implement or override methods that return a Task.

If you have `async` in your method signature but you don't have an awaitable code in your methods you will get the following error:
> This async method lacks 'await' operators and will run synchronously. Consider using the 'await' operator to await non-blocking API calls, or 'await Task.Run(...)' to do CPU-bound work on a background thread.

This error has it's raison d'&ecirc;tre (reason for existance) because a thoughtless usage of `async` signals the reader that he has to lookout for awaitable code, which is not the case if the warning shows up.
Please use the following components in your synchronious methods:

For `Task` (non-generic) return
```cs
public Task Run()
{
    // do something
    return Task.CompletedTask;
}
```

For `Task<T>` return
```cs
public Task<int> Run()
{
    // do something
    int result = 1 + 2;
    return result.ToTaskResult();
}
```

For exception handling
```cs
try
{
    return returnValue.ToTaskResult();
}
catch (Exception ex)
{
    return ex.ToExceptionTaskResult();
    // --OR--
    return ex.ToExceptionTaskResult<TReturnType>();
}
```

## Definition of core components

### [Dependency Injection](https://msdn.microsoft.com/en-us/library/dn178469(v=pandp.30).aspx) via [Unity](https://msdn.microsoft.com/en-us/library/dn170416.aspx)

#### Register an Interface to an Implementation

You need to create a public class, inheriting from `BugTracker.Shared.Infrastructure.IDependencyModule` and place it at `ProjectNamespace.DependencyModules`.
There you get access to the unityContainer to register types, instances or factories.
You will also get the infromation which kind of registration is required (eg. Normal, Web). This is necessary to set the lifetime manager (eg. PerThread, PerRequest, etc.).
Omit named registrations unless you have a really good reason to not to do so.
Always specify the LifetimeManager even it's the default one.
```cs
public class CommandDepencencyModule : IDependencyModule
{
    public void Register(IUnityContainer unityContainer, RegistrationMode mode)
    {
        unityContainer.RegisterType<IInterfaceName, ConcreteImplementation>(new ContainerControlledLifetimeManager());
        // ...
    }
}
```

#### Consuming dependencies

To gain access to components use only the [Constructor Injection](https://msdn.microsoft.com/en-us/library/dn178463(v=pandp.30).aspx#sec12).
```cs
public DataTable(ILog logger, IUserAccess userAccess)
{
  ...
}
```

### Parameter validation (`Check`)

The component `Check` is used to unify validation code. Please extend this component with necessary assertions instead duplicating validation code.

It's capable to signal mismatches to ReSharper via the [Code Annotation](https://www.jetbrains.com/resharper/help/Reference__Code_Annotation_Attributes.html).
Please note that you **DO NOT** need to validate dependency injection parameters since unity will throw an exception if it can't find a requested dependency.

### Constants

We have static classes with static constants to avoid the massive use of magic strings.
Please add all your lexical identifiers into these classes. Have a look at `Constants` for more information.

### Command pattern

The command pattern allows you to pack various steps for a certain task into a single place.
It could be seen as a compilation of validation steps, calls to repository methods to the database context and logic, 
wrapped with try/catch to reduce error checking and logging in case of an error.
Notice that a command without return value (eg. DeleteUser) has to inherit from CommandBase instead of the generic version.

A typical command looks like that:
```cs
public class CreateUserCommand : CommandBase<User>
{
    private readonly ILog logger;
    private readonly IUserAccess userAccess;
    private UserModel userModelToSave;

    public CreateUserCommand(ILog logger, IUserAccess userAccess)
    {
        this.logger = logger;
        this.userAccess = userAccess;
    }

    public void InitializeWithUserModel(UserModel userModel)
    {
        userModelToSave = userModel;
    }

    protected override async Task<CanExecuteCommandResult> CanExecuteAsync()
    {
        if (userModelToSave == null)
        {
            return CanExecuteCommandResult.Error("UserModel is null.");
        }

        if (userModelToSave.Name == null)
        {
            return CanExecuteCommandResult.Error("Name is null.");
        }

        var userExists = await userAccess.ExistsByNameAsync(userModelToSave.Name);
        if (userExists)
        {
            return CanExecuteCommandResult.Error($"User with name '{userModelToSave.Name}' already exists.");
        }

        return await base.CanExecuteAsync();
    }

        protected override Task<CommandResult<User>> ExecuteAsync()
        {
            var user = new User { Name = userModelToSave.Name };
            
            logger.Debug("Adding user to database");

            userAccess.AddNewUserAsync(user);
            
            var commandResult = CommandResult<User>.FromSuccess(user);
            return commandResult.ToTaskResult();
        }
}
```

The methods of a command you can define are:

- Constructor
    - Define here your dependencies which get injected later on
- `InitializeWithUserModel(UserModel)` (or whatever name will be appropiate)
    - A method that will be used by the `CommandRepository` to pass additional parameters to the command.
   You can have more than one if you plan to deal with more than one business case in your command.
   Please pay attention that this methods are not guarded and may throw erros if you're not careful.
- `CanExecuteAsync`
    - Put your validation logic here and return violations via `CanExecuteCommandResult.Error`.
- `ExecuteAsync`
    - Put your execution logic here. Please remember that you don't have to deal with database savings.

### CommandRepository pattern
_needs dependency injection registration_

The command repository is a collection of methods that create commands, 
initialize them and return them in form of `CommandBase` or `CommandBase<ReturnType>`.

A typical command repository looks loke that:
```cs
public class CommandRepository
{
    private readonly ICommandFactory commandFactory;

    public CommandRepository(ICommandFactory commandFactory)
    {
        this.commandFactory = commandFactory;
    }

    public CommandBase<User> CreateUser(UserModel userModel)
    {
        CreateUserCommand command = commandFactory.CreateCommand<CreateUserCommand, User>();
        command.InitializeWithUserModel(userModel);
        return command;
    }
}
```

### CommandExecutor

This component is allowed to execute a command.
It coordinates the call to initialization, validation and execution
and returns a CommandResult or `CommandResult<TResult>` which indicates if
the execution was successful or in turn contains the error.

### Logging

To obtain a logger you need to depend on `ILog` located in the Common.Logging NuGet package.
The type of the logger is determined while building up the dependency graph so you don't have
to set any type arguments for the logger.

### Bootstrapper

The Bootstrapper is used to start up the essential components of the infrastructure like Unity for Dependency Injection.

### CommandFactory

The CommandFactory is used to create commands in the CommandRepository and logs errors in case of initialization problems.
Never bypass this component to create commands.

## Testing

### Test template

```cs
namespace <AssemblyUnderTest>.Tests.<NamespaceOfComponentUnderTest>
{
    [TestFixture]
    public class <ComponentUnderTest>Tests : TestBase
    {
        [Test]
        public async void <MethodName>_<Input/Behaviour>_<ExpectedResult>()
        {
            // arrange
            <Test setup goes here>

            // act
            <A single line that we really want to test>

            // assert
            <Assertions goes here>
        }
    }
}
```

Always add the `arrange`, `act` and `assert` sections so that a reader of the test can easily identify what the test is doing.
Please make sure that you only have a single line in the `act` section so that we know in which state the test is broken.

### TestBase

The TestBase contains important components that you usually would obtain via Dependency Injection like a Logger or the CommandExecutor.
Please inherit from this base class to gain access to this elements instead creating them yourself.

### Dependency Injection, Testing and Mocking (Moq)

We don't use Dependency Injection in tests, therefore you have to mock every 
object that you need yourself or (in common situations) provide it via a derivated 
class from TestBase.

Sometimes it's handy to use the original implementations. In such cases, set your implementations to be visible to the test framework:
```cs
[assembly: InternalsVisibleTo("BugTracker.TestUtils")]
```

#### Moq

To create a mock use the `TestBase.CreateMock` or `TestBase.CreateMockAndRegisterInDI` method.
Creating the mock with the `CreateMock*` methods ensure that the mocks are verified (check if all setups are used) after the tests.
Also, always create the mocks with behavior `MockBehavior.Strict` to ensure that the mock is only doing what you have setup before.

```cs
// arrange
var userAccessMock = CreateMock<IUserAccess>();
userAccessMock.Setup(...);

// act
// ...

// assert
// ...
```

## Configuration (`web.config`, `app.config`)

### log4net

Per default, log4net does not log exception data into the logfiles. This can be problematic when it comes to command results and other exceptions that contains such data (eg. current user id, etc).
To get this information into the logs, we need to add a custom log4net renderer like that:
```xml
<log4net>
    ...
    <renderer renderingClass="BugTracker.Shared.Logging.ExceptionObjectLogger, BugTracker.Shared" renderedClass="System.Exception" />
    ...
</log4net>
```
This will append the exception data at the end of the log message up to a depth of 10 levels.
```
2015-10-27 16:18:09,962 [Runner thread] DEBUG BugTracker.DependencyInjectionTest.Tests.Commands.CreateUserCommandTest [(null)] - !!
NUnit.Framework.AssertionException ---> NUnit.Framework.AssertionException
   --- End of inner exception stack trace ---
Exception data on level 0 (1 items):
[asd]: 123
```

# Contributing

Please change this document if you feel it's necessary, contains any errors or need an extension.

# <a name="Appendix_A">Appendix A - Why is &lt;null&gt; evil?<a/>
_([source](http://programmers.stackexchange.com/a/12834))_

There are several problems with using null references in code.

- First, it's generally used to indicate a **special state**. Rather than defining a new class or constant for each state as specializations are normally done, using a null reference is using a **lossy, massively generalized type/value**.
- Second, debugging code becomes more difficult when a null reference appears and you **attempt to determine what generated it**, which state is in effect and its cause even if you can trace its upstream execution path.
- Third, null references introduces **additional code paths to test**.
- Fourth, once null references are used as valid states for parameters as well as return values, defensive programming (for states caused by design) requires **more null reference checking to be done in various places** ... just in case.
- Fifth, the language's **runtime is already performing type checks** when it performs selector lookup on an object's method table. So you're duplicating effort by checking if the object's type is valid/invalid and then having the runtime check the valid object's type to invoke its method.

Why not use the [NullObject pattern][1] to **take advantage of the runtime's check** to have it invoke [NOP][2] methods specific to that state (conforming to the regular state's interface) while also eliminating all the extra checking for null references throughout your codebase?

- It **involves more work** by creating a NullObject class for each interface with which you want to represent a special state. But at least the **specialization is isolated** to each special state, rather than the code in which the state might be present. IOW, the number of tests are reduced because you have **fewer alternate execution paths** in your methods.

  [1]: http://en.wikipedia.org/wiki/Null_Object_pattern
  [2]: http://en.wikipedia.org/wiki/NOP
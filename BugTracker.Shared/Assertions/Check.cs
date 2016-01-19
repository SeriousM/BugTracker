using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

using JetBrains.Annotations;

namespace BugTracker.Shared.Assertions
{
    [DebuggerNonUserCode]
    public static class Check
    {
        [ContractAnnotation("parameterName:null => halt")]
        [ContractAnnotation("objectToCheck:null => halt")]
        public static void IsNotNull(
            [NotNull] [InvokerParameterName] string parameterName,
            [CanBeNull] object objectToCheck,
            [CanBeNull] string errorMessage = null)
        {
            if (parameterName == null)
            {
                throw new ArgumentNullException(nameof(parameterName));
            }

            if (objectToCheck != null)
            {
                return;
            }

            if (errorMessage != null)
            {
                throw new ArgumentNullException(parameterName, errorMessage);
            }
            throw new ArgumentNullException(parameterName);
        }

        [ContractAnnotation("parameterName:null => halt")]
        [ContractAnnotation("listToCheck:null => halt")]
        public static void IsNotEmpty<T>(
            [NotNull] [InvokerParameterName] string parameterName,
            [NotNull] IList<T> listToCheck,
            [CanBeNull] string errorMessage = null)
        {
            Check.IsNotNull(nameof(parameterName), parameterName);
            Check.IsNotNull(nameof(listToCheck), listToCheck);

            if (listToCheck.Count != 0)
            {
                return;
            }

            if (errorMessage != null)
            {
                throw new ArgumentException(errorMessage, parameterName);
            }
            throw new ArgumentException($"The list of {parameterName} is empty.", parameterName);
        }

        [ContractAnnotation("parameterName:null => halt")]
        [ContractAnnotation("stringToCheck:null => halt")]
        public static void IsNotEmpty(
            [NotNull] [InvokerParameterName] string parameterName,
            [NotNull] string stringToCheck,
            [CanBeNull] string errorMessage = null)
        {
            Check.IsNotNull(nameof(parameterName), parameterName);
            Check.IsNotNull(nameof(stringToCheck), stringToCheck);

            if (stringToCheck.Length > 0)
            {
                return;
            }

            if (errorMessage != null)
            {
                throw new ArgumentException(errorMessage, parameterName);
            }
            throw new ArgumentException($"The string of {parameterName} is empty.", parameterName);
        }

        [ContractAnnotation("parameterName:null => halt")]
        [ContractAnnotation("stringToCheck:null => halt")]
        public static void IsNotNullOrEmpty(
            [NotNull] [InvokerParameterName] string parameterName,
            [NotNull] string stringToCheck,
            [CanBeNull] string errorMessage = null)
        {
            Check.IsNotNull(nameof(parameterName), parameterName);
            Check.IsNotNull(nameof(stringToCheck), stringToCheck);

            if (!string.IsNullOrEmpty(stringToCheck))
            {
                return;
            }

            if (errorMessage != null)
            {
                throw new ArgumentException(parameterName, errorMessage);
            }
            throw new ArgumentException(parameterName, $"The string {parameterName} is empty.");
        }

        [ContractAnnotation("parameterName:null => halt")]
        [ContractAnnotation("collectionToCheck:null => halt")]
        public static void IsNotNullOrEmpty<T>(
            [NotNull] [InvokerParameterName] string parameterName,
            [NotNull] IEnumerable<T> collectionToCheck,
            [CanBeNull] string errorMessage = null)
        {
            Check.IsNotNull(nameof(parameterName), parameterName);
            Check.IsNotNull(nameof(collectionToCheck), collectionToCheck);

            if (collectionToCheck.Any())
            {
                return;
            }

            if (errorMessage != null)
            {
                throw new ArgumentException(parameterName, errorMessage);
            }
            throw new ArgumentException(parameterName, $"The collection {parameterName} is empty.");
        }

        [ContractAnnotation("predicate:false => halt")]
        public static void IsTrue(bool predicate, [NotNull] string errorMessage)
        {
            Check.IsNotNull(nameof(errorMessage), errorMessage);

            if (!predicate)
            {
                throw new InvalidOperationException(errorMessage);
            }
        }

        [ContractAnnotation("predicate:true => halt")]
        public static void IsFalse(bool predicate, string errorMessage)
        {
            Check.IsNotNull(nameof(errorMessage), errorMessage);

            if (predicate)
            {
                throw new InvalidOperationException(errorMessage);
            }
        }

        [ContractAnnotation("parameterName:null => halt")]
        [ContractAnnotation("objectToCheck:null => halt")]
        [ContractAnnotation("expectedType:null => halt")]
        public static void IsOfType(
            [NotNull] [InvokerParameterName] string parameterName,
            [NotNull] object objectToCheck,
            [NotNull] Type expectedType,
            [CanBeNull] string errorMessage = null)
        {
            Check.IsNotNull(nameof(parameterName), parameterName);
            Check.IsNotNull(nameof(objectToCheck), objectToCheck);
            Check.IsNotNull(nameof(expectedType), expectedType);

            var objectToCheckType = objectToCheck.GetType();
            var isTypeOf = objectToCheckType == expectedType;

            if (isTypeOf)
            {
                return;
            }

            if (errorMessage != null)
            {
                throw new ArgumentException(errorMessage, parameterName);
            }
            throw new ArgumentException($"The object of type {objectToCheckType.Name} not type of {expectedType.Name}.", parameterName);
        }

        [ContractAnnotation("parameterName:null => halt")]
        [ContractAnnotation("objectToCheck:null => halt")]
        [ContractAnnotation("expectedType:null => halt")]
        public static void IsOfTypeOrDerivedFrom(
            [NotNull] [InvokerParameterName] string parameterName,
            [NotNull] object objectToCheck,
            [NotNull] Type expectedType,
            [CanBeNull] string errorMessage = null)
        {
            Check.IsNotNull(nameof(parameterName), parameterName);
            Check.IsNotNull(nameof(objectToCheck), objectToCheck);
            Check.IsNotNull(nameof(expectedType), expectedType);

            var objectToCheckType = objectToCheck.GetType();
            var isTypeOfOrDerivedFrom = expectedType.IsAssignableFrom(objectToCheckType);

            if (isTypeOfOrDerivedFrom)
            {
                return;
            }

            if (errorMessage != null)
            {
                throw new ArgumentException(errorMessage, parameterName);
            }
            throw new ArgumentException($"The object of type {objectToCheckType.Name} not type of or derived from {expectedType.Name}.", parameterName);
        }
    }
}
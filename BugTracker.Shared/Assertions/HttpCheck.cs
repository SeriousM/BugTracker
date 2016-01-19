using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using JetBrains.Annotations;

namespace BugTracker.Shared.Assertions
{
    [DebuggerNonUserCode]
    public static class HttpCheck
    {
        [ContractAnnotation("objectToCheck:null => halt")]
        public static void IsNotNull(
            [CanBeNull] object objectToCheck,
            HttpStatusCode httpStatusCode,
            [NotNull] string errorMessage)
        {
            if (objectToCheck != null)
            {
                return;
            }
            
            Throw(httpStatusCode, errorMessage);
        }

        [ContractAnnotation("parameterName:null => halt")]
        [ContractAnnotation("objectToCheck:null => halt")]
        public static void IsNotNull(
            [NotNull] [InvokerParameterName] string parameterName,
            [CanBeNull] object objectToCheck,
            HttpStatusCode httpStatusCode,
            [CanBeNull] string errorMessage = null)
        {
            Check.IsNotNull(nameof(parameterName), parameterName);

            if (objectToCheck != null)
            {
                return;
            }

            if (errorMessage == null)
            {
                errorMessage = $"{nameof(parameterName)} is null.";
            }

            Throw(httpStatusCode, errorMessage);
        }

        [ContractAnnotation("predicate:false => halt")]
        public static void IsTrue(bool predicate, HttpStatusCode httpStatusCode, [NotNull] string errorMessage)
        {
            Check.IsNotNull(nameof(errorMessage), errorMessage);

            if (!predicate)
            {
                Throw(httpStatusCode, errorMessage);
            }
        }

        private static void Throw(HttpStatusCode httpStatusCode, string errorMessage)
        {
            var httpResponseMessage = new HttpResponseMessage(httpStatusCode) { ReasonPhrase = errorMessage };
            throw new HttpResponseException(httpResponseMessage);
        }
    }
}
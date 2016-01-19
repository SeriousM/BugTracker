using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

using log4net.ObjectRenderer;

namespace BugTracker.Shared.Logging
{
    // http://stackoverflow.com/a/28594233/660428
    public class ExceptionObjectLogger : IObjectRenderer
    {
        public void RenderObject(RendererMap rendererMap, object obj, TextWriter writer)
        {
            var ex = obj as Exception;

            if (ex == null)
            {
                // Shouldn't happen if only configured for the System.Exception type.
                rendererMap.DefaultRenderer.RenderObject(rendererMap, obj, writer);
            }
            else
            {
                rendererMap.DefaultRenderer.RenderObject(rendererMap, obj, writer);

                const int MAX_DEPTH = 10;
                int currentDepth = 0;

                var traversedExceptions = new List<Exception>();

                while (ex != null && currentDepth <= MAX_DEPTH && !traversedExceptions.Contains(ex))
                {
                    traversedExceptions.Add(ex);

                    this.RenderExceptionData(rendererMap, ex, writer, currentDepth);
                    ex = ex.InnerException;

                    currentDepth++;
                }
            }
        }

        private void RenderExceptionData(RendererMap rendererMap, Exception ex, TextWriter writer, int depthLevel)
        {
            var dataCount = ex.Data.Count;
            if (dataCount == 0)
            {
                return;
            }

            writer.WriteLine();

            writer.WriteLine($"Exception data on level {depthLevel} ({dataCount} items):");

            var currentElement = 0;
            foreach (DictionaryEntry entry in ex.Data)
            {
                currentElement++;

                writer.Write("[");
                ExceptionObjectLogger.RenderValue(rendererMap, writer, entry.Key);
                writer.Write("]: ");

                ExceptionObjectLogger.RenderValue(rendererMap, writer, entry.Value);

                if (currentElement < dataCount)
                {
                    writer.WriteLine();
                }
            }
        }

        private static void RenderValue(RendererMap rendererMap, TextWriter writer, object value)
        {
            if (value is string)
            {
                writer.Write(value);
            }
            else
            {
                IObjectRenderer keyRenderer = rendererMap.Get(value.GetType());
                keyRenderer.RenderObject(rendererMap, value, writer);
            }
        }
    }
}
namespace BugTracker.Shared
{
    /// <summary>
    /// Represents the Nullable for reference types.
    /// It supports an implicit convert from <typeparamref name="T"/> to Maybe&lt;<typeparamref name="T"/>&gt;.
    /// </summary>
    public struct Maybe<T> where T : class
    {
        private static readonly Maybe<T> empty = new Maybe<T>();

        public Maybe(T value)
        {
            this.Value = value;
        }

        public bool HasValue => this.Value != null;

        public bool HasNoValue => !this.HasValue;

        public T Value { get; }

        public static Maybe<T> Empty => Maybe<T>.empty;

        public T GetValueOrDefault(T fallback)
        {
            return this.Value ?? fallback;
        }

        public static implicit operator Maybe<T>(T value)
        {
            return new Maybe<T>(value);
        }

        public override bool Equals(object other)
        {
            if (this.HasNoValue)
            {
                return other == null;
            }
            if (other == null)
            {
                return false;
            }
            return this.Value.Equals(other);
        }

        public override int GetHashCode()
        {
            if (this.HasNoValue)
            {
                return 0;
            }
            return this.Value.GetHashCode();
        }

        public override string ToString()
        {
            if (this.HasNoValue)
            {
                return string.Empty;
            }
            return this.Value.ToString();
        }
    }
}
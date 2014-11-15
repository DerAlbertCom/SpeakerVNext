using System;

namespace ThereIsAThing.Entities
{
    public interface IEntity<T>
    {
        T Id { get; }
    }

    public interface IUpdatable
    {
        DateTime Created { get; }
        DateTime Updated { get; }
        void Modfified();
    }

    public interface IAggregateRoot<T> : IEntity<T> {

    }

    public abstract class EntityBase : IEntity<Guid>, IUpdatable
    {
        protected EntityBase()
        {
            Created = DateTime.UtcNow;
            Updated = Created;    		
        }

        public Guid Id { get; private set; }
        public DateTime Created { get; private set; }
        public DateTime Updated{ get; private set; }

        protected void Modfified()
        {
            Updated = DateTime.UtcNow;
        }

        void IUpdatable.Modfified()
        {
            Modfified();
        }
    }
    public abstract class AggregateRootBase : EntityBase, IAggregateRoot<Guid>
    {

    }
}
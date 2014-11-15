using System;
using Microsoft.Data.Entity;
using ThereIsAThing.Entities;

namespace ThereIsAThing.Data
{
    public interface IRepository<T> where T : IAggregateRoot<Guid>
    {

    }
    public class Repository<T> : IRepository<T> where T : IAggregateRoot<Guid>
    {
        private DbContext dbContext;

        public Repository(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
using System;
using System.Collections.Generic;


namespace ThereIsAThing.Entities
{
    public class Speaker : EntityBase
    {
        public Speaker()
        {

            Address = new Address();
            Person = new Person();
        }



        public Speaker(string email, string firstName, string lastName, Gender gender) : this()
        {
            Person.ChangeMail(email);
            Person.ChangeName(firstName, lastName, gender);

        }


        public Guid AggregateId { get; set; }

        public Person Person { get; private set; }
        public Address Address { get; private set; }

        public virtual ICollection<SubmittedSession> SubmittedSessions { get; private set; }
    }
}
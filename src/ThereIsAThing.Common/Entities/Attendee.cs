using System;


namespace ThereIsAThing.Entities
{
    public class Attendee : EntityBase
    {
        public Attendee()
        {

        }
        public Person Person { get; private set; }
    }
}
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;


namespace ThereIsAThing.Entities
{
    public class SubmittedSession : EntityBase
    {
        protected SubmittedSession()
        {
        }

        public SubmittedSession(Meeting meeting, string name, string @abstract, int level, int duration)
        {
            Meeting = meeting;
            Name = name;
            Abstract = @abstract;
            Level = level;
            Duration = duration;
            Speakers = new Collection<Speaker>();
        }


        [Required]
        [MaxLength]
        public string Abstract { get; private set; }

        [Required]
        [StringLength(254)]
        public string Name { get; private set; }

        [Required]
        public int Level { get; private set; }

        [Required]
        public int Duration { get; private set; }

        [Required]
        public virtual ICollection<Speaker> Speakers { get; private set; }

        [Required]
        public virtual Meeting Meeting { get; private set; }


        public bool Selected { get; set; }
    }
}
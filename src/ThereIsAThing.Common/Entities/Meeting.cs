using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace ThereIsAThing.Entities
{
    public class Meeting : EntityBase
    {
        public Meeting()
        {
            Pricing = new Pricing();
            Days = new Collection<Day>();
        }


        [StringLength(128)]
        [Required]
        public string Name { get; set; }

        public virtual ICollection<Day> Days { get; private set; }

        public Pricing Pricing { get; private set; }

        [StringLength(2048)]
        public string ShortDescription { get; set; }

        [MaxLength]
        public string Description { get; set; }

        [MaxLength]
        public string GeneralTerms { get; set; }

        public bool NeedFullAttendeeData { get; set; }

        [MaxLength]
        public string AdditionalInput { get; set; }
    }
}
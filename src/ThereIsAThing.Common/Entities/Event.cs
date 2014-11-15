using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThereIsAThing.Entities
{
    public class EventProvider
    {
        [Key]
        public Guid AggregateRootId { get; set; }
        [Required]
        [StringLength(256)]
        public string TypeName { get; set; }
        public long Version { get; set; }
    }

    public class Event
    {
        [Key]
        public long EventId { get; private set; }

        [Index]
        public DateTime ExecutedOn { get; set; }

        [Required]
        [Index]
        public Guid AggregateId { get; set; }

        [Required]
        public Guid Id { get; set; }

        [Required]
        [StringLength(256)]
        public string TypeName { get; set; }

        [Required]
        [MaxLength]
        public string DomainEvent { get; set; }

        [Index]
        public long Version { get; set; }
    }
}
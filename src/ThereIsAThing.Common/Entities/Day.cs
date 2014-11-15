using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThereIsAThing.Entities
{
    public class Day : EntityBase
    {

        [Index]
        public DateTime StartTime { get; private set; }
        public DateTime EndTime { get; set; }

        public Meeting Meeting { get; private set; }
    }
}
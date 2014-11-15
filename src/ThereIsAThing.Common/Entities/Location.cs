using System;


namespace ThereIsAThing.Entities
{
    public class Location : EntityBase
    {
        private Location()
        {
            Address = new Address();
            Name = string.Empty;
            CompanyName = string.Empty;
            MapUrl = string.Empty;
            Description = string.Empty;
        }

        public string Name { get; set; }
        public string CompanyName { get; set; }
        public Address Address { get; private set; }

        public string MapUrl { get; set; }
        public string Description { get; set; }

        public static Location Create()
        {
            return new Location();
        }
    }
}
using System.ComponentModel.DataAnnotations;

namespace ThereIsAThing.Entities
{
    public class Address
    {
        public Address()
        {
            Street = string.Empty;
            ZipCode = string.Empty;
            City = string.Empty;
            Country = string.Empty;
        }

        [StringLength(128)]
        public string Street { get; private set; }
        [StringLength(6)]
        public string ZipCode { get; private set; }
        [StringLength(128)]
        public string City { get; private set; }
        [StringLength(128)]
        public string Country { get; private set; }


        public void SetAddress(string street, string zipCode, string city, string country)
        {
            Street = street;
            ZipCode = zipCode;
            City = city;
            Country = country;
        }

        public void SetAddress(Address address)
        {
            Street = address.Street;
            ZipCode = address.ZipCode;
            City = address.City;
            Country = address.Country;
        }
    }
}
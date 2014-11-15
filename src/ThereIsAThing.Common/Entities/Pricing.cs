using System;

namespace ThereIsAThing.Entities
{
    public class Pricing
    {
        public decimal Price { get; set; }
        public decimal CompanyPrice { get; set; }

        public string PriceRange { get; private set; }
    }
}
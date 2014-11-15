using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ThereIsAThing.Entities
{
    public class Person : EntityBase
    {
        public Person()
        {
            Gender = Gender.Unknown;
        }

        [StringLength(128)]
        [Index(IsUnique = false)]
        public string UserName { get; set; }

        internal void ChangeMail(string email)
        {
            EMail = email;
        }

        internal void ChangeName(string firstName, string lastName, Gender gender)
        {
            Firstname = firstName;
            Lastname = lastName;
            Gender = gender;
        }

        [Required]
        [StringLength(256)]
        [Index]
        public string EMail { get; private set; }

        [Required]
        [StringLength(128)]
        public string Firstname { get; private set; }
        [Required]
        [StringLength(128)]
        public string Lastname { get; private set; }

        public Gender Gender { get; private set; }

        public bool IsActive { get; private set; }
        public bool IsConfirmed { get; private set; }

    }
}
using Microsoft.EntityFrameworkCore;
using System;

namespace user_api
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var user = new User
            {
                Id = 1,
                FullName = "Test User 1",
                Email = "test@mail.com",
                Password = "Password",
                DateOfBirth = DateTime.Now,
                UserName = "TestUser1",
                Gender = "Male"
            };
            modelBuilder.Entity<User>().HasData(user);
        }
    }
}
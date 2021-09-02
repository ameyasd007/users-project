using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace user_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserContext _context;
        public UserController(UserContext context)
        {
            _context = context;
            _context.Database.EnsureCreated();
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            var users = _context.Users.ToList();
            return users;
        }

        [HttpPost]
        public IActionResult Post(User model)
        {
            if (!ModelState.IsValid)
                return BadRequest("invalid parameters");

            _context.Users.Add(model);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = model.Id }, model);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
                return BadRequest("Id mismatch");
            if (!ModelState.IsValid)
                return BadRequest("invalid parameters");

            _context.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {

            var userToDelete = _context.Users.Where(user => user.Id == id).FirstOrDefault();

            if (userToDelete == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            _context.Users.Remove(userToDelete);
            _context.SaveChanges();
            return NoContent();
        }
    }
}

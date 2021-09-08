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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _context.Users.Where(user => user.Id == id).FirstOrDefault();
            if (user is null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest("invalid parameters");

            if (_context.Users.Any(u => u.UserName == user.UserName))
                return BadRequest(new { errorMessage = "Username must be unique" });

            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
                return BadRequest("Id mismatch");
            if (!ModelState.IsValid)
                return BadRequest("invalid parameters");

            if (_context.Users.Where(u => u.Id != id).Any(u => u.UserName == user.UserName))
                return BadRequest(new { errorMessage = "Username must be unique" });

            _context.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(user);
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

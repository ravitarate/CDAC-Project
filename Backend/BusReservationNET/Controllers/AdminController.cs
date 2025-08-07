using BusReservationNET.Models;
using BusReservationNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BusReservationNET.Controllers
{
    [Route("admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IPasswordHasher<User> _passwordHasher;


        public AdminController(IUserService userService, IPasswordHasher<User> passwordHasher)
        {
            _userService = userService;
            _passwordHasher = passwordHasher;
        }

        [Authorize]
        [HttpPost("addAgent")]
        public async Task<IActionResult> AddAgent([FromBody] User user)
        {
            try
            {
                user.Password = _passwordHasher.HashPassword(user, user.Password);
                var addedUser = await _userService.AddAgentAsync(user);
                return Created("", addedUser);
            }
            catch
            {
                return StatusCode(500, "Error registering user");
            }
        }

        [Authorize]
        [HttpGet("getAllAgent")]
        public async Task<IActionResult> GetAllAgents()
        {
            try
            {
                var users = await _userService.GetAllAgentsAsync();
                return Ok(users);
            }
            catch
            {
                return StatusCode(500, "Error fetching users");
            }
        }

    }
}

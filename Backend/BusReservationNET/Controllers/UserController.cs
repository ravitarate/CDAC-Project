using BusReservationNET.DTO;
using BusReservationNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusReservationNET.Controllers
{
    [Route("customer")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("registerUser")]
        public async Task<IActionResult> RegisterUser([FromBody] UserDTO userDto)
        {
            var user = await _userService.RegisterUserAsync(userDto);
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        [Authorize]
        [HttpPut("updateUser/{id}")]
        public async Task<IActionResult> UpdateUser(long id, [FromBody] EditUserDTO userDto)
        {
            var updated = await _userService.UpdateUserAsync(id, userDto);
            return Ok(updated);
        }

        [Authorize]
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllCustomersAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet("getUserById/{id}")]
        public async Task<IActionResult> GetUserById(long id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return user == null ? NotFound("User not found") : Ok(user);
        }

    }
}

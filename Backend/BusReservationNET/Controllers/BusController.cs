using BusReservationNET.Models;
using BusReservationNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusReservationNET.Controllers
{
    [Route("agency")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly IBusService _busService;

        public BusController(IBusService busService)
        {
            _busService = busService;
        }

        [Authorize]
        [HttpPost("addBus/{id}")]
        public async Task<IActionResult> AddBus(long id, [FromBody] Bus bus)
        {
            try
            {
                var addedBus = await _busService.AddBusAsync(id, bus);
                return Ok(addedBus);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("getBusesByAgent/{agentId}")]
        public async Task<IActionResult> GetBusesByAgent(long agentId)
        {
            var buses = await _busService.GetBusesByAgentAsync(agentId);
            if (!buses.Any())
            {
                return NotFound("No buses found for this agent!");
            }
            return Ok(buses);
        }
    }
}

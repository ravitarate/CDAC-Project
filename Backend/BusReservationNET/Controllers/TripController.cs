using BusReservationNET.Models;
using BusReservationNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusReservationNET.Controllers
{
    [Route("")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripService _tripService;

        public TripController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [Authorize]
        [HttpPost("agency/createTrip/{agentId}/{busId}")]
        public async Task<IActionResult> CreateTrip(long agentId, long busId, [FromBody] Trip trip)
        {
            try
            {
                var result = await _tripService.CreateTripAsync(agentId, busId, trip);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet("agency/getBookingsForTrip/{tripId}")]
        public async Task<IActionResult> GetBookingsForTrip(long tripId)
        {
            try
            {
                var bookings = await _tripService.GetBookingsForTripAsync(tripId);
                if (!bookings.Any()) return NotFound("No bookings found for this trip!");
                return Ok(bookings);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("getTripsByFilters")]
        public async Task<IActionResult> GetTripsByFilters(string source, string destination, DateOnly tripDate)
        {
            try
            {
                var trips = await _tripService.GetTripsByFiltersAsync(source, destination, tripDate);
                if (!trips.Any()) return NotFound("No trips found for the given criteria.");
                return Ok(trips);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [Authorize]
        [HttpGet("agency/getTripsByAgent/{agentId}")]
        public async Task<IActionResult> GetTripsByAgent(long agentId)
        {
            try
            {
                var trips = await _tripService.GetTripsByAgentIdAsync(agentId);
                return Ok(trips);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

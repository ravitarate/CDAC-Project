using BusReservationNET.Models;
using BusReservationNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusReservationNET.Controllers
{
    [Route("customer")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ISeatService _seatService;

        public SeatController(ISeatService seatService)
        {
            _seatService = seatService;
        }

        [Authorize]
        [HttpGet("trip/{tripId}")]
        public ActionResult<List<Seat>> GetSeatsByTripId(int tripId)
        {
            var seats = _seatService.GetSeatsByTripId(tripId);
            return Ok(seats);
        }
    }
}

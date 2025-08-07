using BusReservationNET.DTO;
using BusReservationNET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusReservationNET.Controllers
{
    [Route("customer")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IPdfGeneratorService _pdfGeneratorService;

        public BookingController(IBookingService bookingService, IPdfGeneratorService pdfGeneratorService)
        {
            _bookingService = bookingService;
            _pdfGeneratorService = pdfGeneratorService;
        }

        [Authorize]
        [HttpPost("bookTickets")]
        public IActionResult BookTickets([FromBody] List<BookingRequestDTO> bookingRequests)
        {
            _bookingService.BookTickets(bookingRequests);
            return Ok("Tickets booked successfully!");
        }

        [Authorize]
        [HttpGet("getBookings/{userId}")]
        public ActionResult<List<BookingResponseDTO>> GetBookings(long userId)
        {
            var result = _bookingService.GetBookingsByUser(userId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("downloadBookingsPDF/{userId}/{tripId}")]
        public IActionResult DownloadReceipt(long userId, long tripId)
        {
            var bookings = _bookingService.DownloadReceipt(userId, tripId);
            var pdf = _pdfGeneratorService.GenerateBookingPDF(bookings);
            return File(pdf, "application/pdf", "bookings.pdf");
        }
    }
}

using System.Runtime.InteropServices;

namespace BusReservationNET.DTO
{
    public class BookingRequestDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public long TripId { get; set; }
        public string SeatNumber { get; set; } = string.Empty;
        public long BusId { get; set; }
        public double Amount { get; set; }
        public long UserId { get; set; }
    }
}

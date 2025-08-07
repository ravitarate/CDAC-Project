namespace BusReservationNET.DTO
{
    public class SeatDTO
    {
        public int SeatId { get; set; }
        public string SeatNumber { get; set; }
        public string Status { get; set; }
        public int BusId { get; set; }
        public int? ReservationId { get; set; }
        public int TripId { get; set; }
        public int? UserId { get; set; }

        public decimal TripPrice { get; set; }
    }
}

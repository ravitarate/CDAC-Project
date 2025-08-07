namespace BusReservationNET.DTO
{
    public class ReceiptPrintingDTO
    {

        public string PassengerName { get; set; } = string.Empty;
        public long TripId { get; set; }
        public string Source { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public TimeOnly DepartureTime { get; set; }
        public TimeOnly ArrivalTime { get; set; }
        public double Price { get; set; }
        public string SeatNumber { get; set; } = string.Empty;
    }
}

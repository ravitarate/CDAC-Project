using BusReservationNET.Models;

namespace BusReservationNET.Services
{
    public interface ISeatService
    {
        List<Seat> GetSeatsByTripId(int tripId);
    }
}

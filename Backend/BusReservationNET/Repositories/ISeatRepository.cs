using BusReservationNET.Models;

namespace BusReservationNET.Repositories
{
    public interface ISeatRepository
    {
        List<Seat> GetSeatsByTripId(int tripId);
        void Update(Seat seat);

        Task AddSeatAsync(Seat seat);


        Seat GetSeatByNumberAndTrip(string seatNumber, long tripId);
    }
}

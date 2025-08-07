using BusReservationNET.Models;
using BusReservationNET.Repositories;

namespace BusReservationNET.Services
{
    public class SeatService : ISeatService
    {
        private readonly ISeatRepository _seatRepository;

        public SeatService(ISeatRepository seatRepository)
        {
            _seatRepository = seatRepository;
        }

        public List<Seat> GetSeatsByTripId(int tripId)
        {
            return _seatRepository.GetSeatsByTripId(tripId);
        }
    }
}

using BusReservationNET.DTO;
using BusReservationNET.Models;

namespace BusReservationNET.Services
{
    public interface ITripService
    {
        Task<Trip> CreateTripAsync(long agentId, long busId, Trip trip);
        Task<List<TripBookingResponseDTO>> GetBookingsForTripAsync(long tripId);
        Task<List<Trip>> GetTripsByFiltersAsync(string source, string destination, DateOnly tripDate);
        Task<List<Trip>> GetTripsByAgentIdAsync(long agentId);
    }
}

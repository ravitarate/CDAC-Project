using BusReservationNET.Models;

namespace BusReservationNET.Repositories
{
    public interface ITripRepository
    {
        Task<Trip> CreateTripAsync(Trip trip);
        Task<List<Trip>> GetTripsByFiltersAsync(string source, string destination, DateOnly tripDate);
        Task<List<Trip>> GetTripsByAgentIdAsync(long agentId);
        Task<Trip> GetByIdAsync(long tripId);

        Trip GetById(long tripId);
    }
}

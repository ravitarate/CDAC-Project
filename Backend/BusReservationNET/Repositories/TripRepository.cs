using BusReservationNET.Models;
using Microsoft.EntityFrameworkCore;

namespace BusReservationNET.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly BusContext _context;

        public TripRepository(BusContext context)
        {
            _context = context;
        }

        public async Task<Trip> CreateTripAsync(Trip trip)
        {
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
            return trip;
        }

        public async Task<List<Trip>> GetTripsByFiltersAsync(string source, string destination, DateOnly tripDate)
        {
            return await _context.Trips
       .Include(t => t.Agent)  
       .Include(t => t.Bus)     
       .Where(t => t.Source == source && t.Destination == destination && t.TripDate == tripDate)
       .ToListAsync();
        }

        public async Task<List<Trip>> GetTripsByAgentIdAsync(long agentId)
        {
            return await _context.Trips
        .Include(t => t.Bus) 
        .Where(t => t.AgentId == agentId)
        .ToListAsync();
        }

        public async Task<Trip> GetByIdAsync(long tripId)
        {
            return await _context.Trips.FirstOrDefaultAsync(t => t.TripId == tripId);
        }

        public Trip GetById(long tripId)
        {
            return _context.Trips.FirstOrDefault(t => t.TripId == tripId);
        }
    }
}

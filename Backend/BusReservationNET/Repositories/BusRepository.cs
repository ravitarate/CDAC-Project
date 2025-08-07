using BusReservationNET.Models;
using Microsoft.EntityFrameworkCore;

namespace BusReservationNET.Repositories
{
    public class BusRepository : IBusRepository
    {
        private readonly BusContext _context;

        public BusRepository(BusContext context)
        {
            _context = context;
        }

        public async Task<Bus> GetByIdAsync(long id)
        {
            return await _context.Buses.FindAsync(id);
        }

        public async Task<Bus> AddBusAsync(Bus bus)
        {
            _context.Buses.Add(bus);
            await _context.SaveChangesAsync();
            return bus;
        }

        public async Task<List<Bus>> GetBusesByAgentAsync(long agentId)
        {
            return await _context.Buses
                .Where(b => b.AgentId == agentId)
                .ToListAsync();
        }

        public Bus GetById(long busId)
        {
            return _context.Buses.FirstOrDefault(t => t.BusId == busId);
        }
    }
}

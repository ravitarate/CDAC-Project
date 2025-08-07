using BusReservationNET.Models;

namespace BusReservationNET.Services
{
    public interface IBusService
    {
        Task<Bus> AddBusAsync(long agentId, Bus bus);
        Task<List<Bus>> GetBusesByAgentAsync(long agentId);
    }
}

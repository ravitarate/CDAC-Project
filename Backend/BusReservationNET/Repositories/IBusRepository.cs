using BusReservationNET.Models;

namespace BusReservationNET.Repositories
{
    public interface IBusRepository
    {
        Task<Bus> AddBusAsync(Bus bus);
        Task<List<Bus>> GetBusesByAgentAsync(long agentId);

        Task<Bus> GetByIdAsync(long id);


        Bus GetById(long busId);
    }
}

using BusReservationNET.Models;
using BusReservationNET.Repositories;

namespace BusReservationNET.Services
{
    public class BusService : IBusService
    {
        private readonly IBusRepository _busRepository;
        private readonly IUserRepository _userRepository;

        public BusService(IBusRepository busRepository, IUserRepository userRepository)
        {
            _busRepository = busRepository;
            _userRepository = userRepository;
        }

        public async Task<Bus> AddBusAsync(long agentId, Bus bus)
        {
            var agent = await _userRepository.GetByIdAsync(agentId);
            if (agent == null)
            {
                throw new Exception("Agent not found!");
            }

            bus.AgentId = agent.Id;
            bus.Capacity = 25;

            return await _busRepository.AddBusAsync(bus);
        }

        public async Task<List<Bus>> GetBusesByAgentAsync(long agentId)
        {
            return await _busRepository.GetBusesByAgentAsync(agentId);
        }
    }
}

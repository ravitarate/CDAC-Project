using BusReservationNET.DTO;
using BusReservationNET.Models;
using BusReservationNET.Repositories;

namespace BusReservationNET.Services
{
    public class TripService : ITripService
    {
        private readonly ITripRepository _tripRepository;
        private readonly IUserRepository _userRepository;
        private readonly IBusRepository _busRepository;
        private readonly ISeatRepository _seatRepository;
        private readonly IReservationRepository _reservationRepository;

        public TripService(
            ITripRepository tripRepository,
            IUserRepository userRepository,
            IBusRepository busRepository,
            ISeatRepository seatRepository,
            IReservationRepository reservationRepository)
        {
            _tripRepository = tripRepository;
            _userRepository = userRepository;
            _busRepository = busRepository;
            _seatRepository = seatRepository;
            _reservationRepository = reservationRepository;
        }

        public async Task<Trip> CreateTripAsync(long agentId, long busId, Trip trip)
        {
            var agent = await _userRepository.GetByIdAsync(agentId);
            if (agent == null || agent.Role != Role.ROLE_AGENT.ToString())
                throw new Exception("Agent not found or unauthorized!");

            var bus = await _busRepository.GetByIdAsync(busId);
            if (bus == null || bus.AgentId != agentId)
                throw new Exception("Bus not found or does not belong to the agent!");

            trip.AgentId = agentId;
            trip.BusId = busId;

            var savedTrip = await _tripRepository.CreateTripAsync(trip);

            for (int i = 1; i <= 25; i++)
            {
                var seat = new Seat
                {
                    SeatNumber = $"A{i}",
                    Status = "AVAILABLE",
                    BusId = busId,
                    TripId = savedTrip.TripId
                };
                await _seatRepository.AddSeatAsync(seat);
            }

            return savedTrip;
        }

        public async Task<List<TripBookingResponseDTO>> GetBookingsForTripAsync(long tripId)
        {
            return await _reservationRepository.GetBookingsForTripAsync(tripId);
        }

        public async Task<List<Trip>> GetTripsByFiltersAsync(string source, string destination, DateOnly tripDate)
        {
            return await _tripRepository.GetTripsByFiltersAsync(source, destination, tripDate);
        }

        public async Task<List<Trip>> GetTripsByAgentIdAsync(long agentId)
        {
            var agent = await _userRepository.GetByIdAsync(agentId);
            if (agent == null || agent.Role != Role.ROLE_AGENT.ToString())
                throw new Exception("User is not an agent");

            return await _tripRepository.GetTripsByAgentIdAsync(agentId);
        }
    }
}

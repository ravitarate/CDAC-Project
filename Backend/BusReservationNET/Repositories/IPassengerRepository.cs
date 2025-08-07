using BusReservationNET.Models;

namespace BusReservationNET.Repositories
{
    public interface IPassengerRepository
    {
        void Save(Passenger passenger);
    }
}

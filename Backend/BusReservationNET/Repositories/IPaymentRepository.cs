using BusReservationNET.Models;

namespace BusReservationNET.Repositories
{
    public interface IPaymentRepository
    {
        void Save(Payment payment);
    }
}

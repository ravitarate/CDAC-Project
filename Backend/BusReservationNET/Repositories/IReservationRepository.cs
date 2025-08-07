using BusReservationNET.DTO;
using BusReservationNET.Models;

namespace BusReservationNET.Repositories
{
    public interface IReservationRepository
    {
        Task<List<TripBookingResponseDTO>> GetBookingsForTripAsync(long tripId);
        Task<List<BookingResponseDTO>> GetBookingsByUserIdAsync(long userId);
        Task<List<ReceiptPrintingDTO>> GetReceiptForUserTripAsync(long userId, long tripId);
        void Save(Reservation reservation);

        List<BookingResponseDTO> FindBookingsByUserId(long userId);
        List<ReceiptPrintingDTO> FindBookingsByUserIdAndTripId(long userId, long tripId);
    }
}

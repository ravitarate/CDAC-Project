using BusReservationNET.DTO;

namespace BusReservationNET.Services
{
    public interface IBookingService
    {
        void BookTickets(List<BookingRequestDTO> bookingRequests);
        List<BookingResponseDTO> GetBookingsByUser(long userId);
        List<ReceiptPrintingDTO> DownloadReceipt(long userId, long tripId);
    }
}

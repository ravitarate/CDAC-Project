using BusReservationNET.DTO;

namespace BusReservationNET.Services
{
    public interface IPdfGeneratorService
    {
        byte[] GenerateBookingPDF(List<ReceiptPrintingDTO> bookings);
    }
}

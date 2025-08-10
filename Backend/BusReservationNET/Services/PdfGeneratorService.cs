using BusReservationNET.DTO;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;

namespace BusReservationNET.Services
{
    public class PdfGeneratorService : IPdfGeneratorService
    {
        public byte[] GenerateBookingPDF(List<ReceiptPrintingDTO> bookings)
        {
            if (bookings == null || bookings.Count == 0)
                throw new ArgumentException("Bookings list is empty.");

            using var document = new PdfDocument();
            var page = document.AddPage();
            var gfx = XGraphics.FromPdfPage(page);
            //var font = new XFont("Verdana", 12);
            var font = new XFont("Arial", 12, XFontStyle.Regular);
            double yPoint = 40;

            gfx.DrawString("------------ Booking Details ------------", font, XBrushes.Black,
                           new XRect(0, yPoint, page.Width, page.Height),
                           XStringFormats.TopCenter);

            yPoint += 40;

            foreach (var booking in bookings)
            {
                if (yPoint > page.Height - 100)
                {
                    page = document.AddPage();
                    gfx = XGraphics.FromPdfPage(page);
                    yPoint = 40;
                }

                gfx.DrawString($"Customer Name: {booking.PassengerName}", font, XBrushes.Black, 40, yPoint); yPoint += 20;
                gfx.DrawString($"Seat Number: {booking.SeatNumber}", font, XBrushes.Black, 40, yPoint); yPoint += 20;
                gfx.DrawString($"Amount Paid: Rs. {booking.Price}", font, XBrushes.Black, 40, yPoint); yPoint += 20;
                gfx.DrawString($"Source: {booking.Source} → Destination: {booking.Destination}", font, XBrushes.Black, 40, yPoint); yPoint += 20;
                gfx.DrawString($"Arrival Time: {booking.ArrivalTime}", font, XBrushes.Black, 40, yPoint); yPoint += 30;
            }

            using var stream = new MemoryStream();
            document.Save(stream, false);
            return stream.ToArray();
        }
    }
}

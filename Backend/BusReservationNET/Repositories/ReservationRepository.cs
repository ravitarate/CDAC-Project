using BusReservationNET.DTO;
using BusReservationNET.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace BusReservationNET.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly BusContext _context;

        public ReservationRepository(BusContext context)
        {
            _context = context;
        }

        public async Task<List<TripBookingResponseDTO>> GetBookingsForTripAsync(long tripId)
        {
            return await _context.Reservations
                .Where(r => r.Trip.TripId == tripId)
                .Select(r => new TripBookingResponseDTO
                {
                    PassengerName = r.Passenger.Name,
                    SeatNumber = r.Seat.SeatNumber,
                    Phone = r.Passenger.Phone
                })
                .ToListAsync();
        }

        public async Task<List<BookingResponseDTO>> GetBookingsByUserIdAsync(long userId)
        {
            return await _context.Reservations
                .Where(r => r.User.Id == userId)
                .Select(r => new BookingResponseDTO
                {
                    PassengerName = r.Passenger.Name,
                    UserId = r.User.Id,
                    TripId = r.Trip.TripId,
                    Source = r.Trip.Source,
                    Destination = r.Trip.Destination,
                    DepartureTime = r.Trip.DepartureTime,
                    ArrivalTime = r.Trip.ArrivalTime,
                    Price = r.Trip.Price,
                    SeatNumber = r.Seat.SeatNumber
                })
                .ToListAsync();
        }

        public async Task<List<ReceiptPrintingDTO>> GetReceiptForUserTripAsync(long userId, long tripId)
        {
            return await _context.Reservations
                .Where(r => r.User.Id == userId && r.Trip.TripId == tripId)
                .Select(r => new ReceiptPrintingDTO
                {
                    PassengerName = r.Passenger.Name,
                    TripId = r.Trip.TripId,
                    Source = r.Trip.Source,
                    Destination = r.Trip.Destination,
                    DepartureTime = r.Trip.DepartureTime,
                    ArrivalTime = r.Trip.ArrivalTime,
                    Price = r.Trip.Price,
                    SeatNumber = r.Seat.SeatNumber
                })
                .ToListAsync();
        }

        public void Save(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            _context.SaveChanges();
        }

        public List<BookingResponseDTO> FindBookingsByUserId(long userId)
        {
            return _context.Reservations
                .Include(r => r.Seat)
                .Include(r => r.Trip)
                .Where(r => r.User.Id == userId)
                .Select(r => new BookingResponseDTO
                {
                    ReservationId = r.ReservationId,
                    TripId = r.Trip.TripId,
                    SeatNumber = r.Seat.SeatNumber,
                    BookingDate = r.BookingDate,
                    PassengerName = r.Passenger.Name,
                    Source = r.Trip.Source,
                    Destination = r.Trip.Destination,
                    DepartureTime = r.Trip.DepartureTime,
                    ArrivalTime = r.Trip.ArrivalTime,
                    Price = r.Trip.Price
                })
                .ToList();
        }


        public List<ReceiptPrintingDTO> FindBookingsByUserIdAndTripId(long userId, long tripId)
        {
            return _context.Reservations
                           .Where(r => r.User.Id == userId && r.Trip.TripId == tripId)
                           .Select(r => new ReceiptPrintingDTO
                           {
                               PassengerName = r.Passenger.Name,
                               TripId = r.Trip.TripId,
                               Source = r.Trip.Source,
                               Destination = r.Trip.Destination,
                               DepartureTime = r.Trip.DepartureTime,
                               ArrivalTime = r.Trip.ArrivalTime,
                               Price = r.Trip.Price,
                               SeatNumber = r.Seat.SeatNumber
                           }).ToList();
        }
    }
}


using BusReservationNET.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace BusReservationNET.Repositories
{
    public class SeatRepository : ISeatRepository
    {
        private readonly BusContext _context;

        public SeatRepository(BusContext context)
        {
            _context = context;
        }

        public List<Seat> GetSeatsByTripId(int tripId)
        {
            return _context.Seats
        .Include(s => s.Trip)
            .ThenInclude(t => t.Bus)
        .Where(s => s.TripId == tripId)
        .ToList();
        }

        public async Task AddSeatAsync(Seat seat)
        {
            _context.Seats.Add(seat);
            await _context.SaveChangesAsync();
        }

        public Seat GetSeatByNumberAndTrip(string seatNumber, long tripId)
        {
            return _context.Seats
                           .FirstOrDefault(s => s.SeatNumber == seatNumber && s.Trip.TripId == tripId);
        }

        public void Update(Seat seat)
        {
            _context.Seats.Update(seat);
            _context.SaveChanges();
        }

       
    }
}

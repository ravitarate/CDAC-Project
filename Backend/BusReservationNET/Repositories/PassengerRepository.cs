using BusReservationNET.Models;
using System;

namespace BusReservationNET.Repositories
{
    public class PassengerRepository : IPassengerRepository
    {
        private readonly BusContext _context;
        public PassengerRepository(BusContext context)
        {
            _context = context;
        }
        public void Save(Passenger passenger)
        {
            _context.Passengers.Add(passenger);
            _context.SaveChanges();
        }
    }
}

using BusReservationNET.Models;
using System;

namespace BusReservationNET.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly BusContext _context;
        public PaymentRepository(BusContext context)
        {
            _context = context;
        }

        public void Save(Payment payment)
        {
            _context.Payments.Add(payment);
            _context.SaveChanges();
        }
    }
}

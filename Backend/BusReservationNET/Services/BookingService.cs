using BusReservationNET.DTO;
using BusReservationNET.Models;
using BusReservationNET.Repositories;

namespace BusReservationNET.Services
{
    public class BookingService : IBookingService
    {
        private readonly IReservationRepository _reservationRepo;
        private readonly ITripRepository _tripRepo;
        private readonly IBusRepository _busRepo;
        private readonly ISeatRepository _seatRepo;
        private readonly IUserRepository _userRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly IPassengerRepository _passengerRepo;

        public BookingService(
            IReservationRepository reservationRepo,
            ITripRepository tripRepo,
            IBusRepository busRepo,
            ISeatRepository seatRepo,
            IUserRepository userRepo,
            IPaymentRepository paymentRepo,
            IPassengerRepository passengerRepo)
        {
            _reservationRepo = reservationRepo;
            _tripRepo = tripRepo;
            _busRepo = busRepo;
            _seatRepo = seatRepo;
            _userRepo = userRepo;
            _paymentRepo = paymentRepo;
            _passengerRepo = passengerRepo;
        }

        public void BookTickets(List<BookingRequestDTO> bookingRequests)
        {
            foreach (var req in bookingRequests)
            {
                var passenger = new Passenger { Name = req.Name, Email = req.Email, Phone = req.Phone };
                _passengerRepo.Save(passenger);

                var trip = _tripRepo.GetById(req.TripId);
                var bus = _busRepo.GetById(req.BusId);
                var seat = _seatRepo.GetSeatByNumberAndTrip(req.SeatNumber, req.TripId);
                var user = _userRepo.GetById(req.UserId);

                if (seat.Status != "AVAILABLE")
                    throw new Exception($"Seat {req.SeatNumber} is already booked");

                seat.Status = "BOOKED";
                seat.User = user;

                var reservation = new Reservation
                {
                    BookingDate = DateOnly.FromDateTime(DateTime.Now),
                    Bus = bus,
                    Seat = seat,
                    Trip = trip,
                    Passenger = passenger,
                    User = user
                };
                _reservationRepo.Save(reservation);
                seat.Reservation = reservation;
                _seatRepo.Update(seat);

                var payment = new Payment { Amount = req.Amount, PaymentDate = DateOnly.FromDateTime(DateTime.Now), Reservation = reservation };
                _paymentRepo.Save(payment);
            }
        }

        public List<BookingResponseDTO> GetBookingsByUser(long userId)
        {
            return _reservationRepo.FindBookingsByUserId(userId);
        }

        public List<ReceiptPrintingDTO> DownloadReceipt(long userId, long tripId)
        {
            return _reservationRepo.FindBookingsByUserIdAndTripId(userId, tripId);
        }
    }
}


using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BusReservationNET.Models;

public partial class Reservation
{
    public long ReservationId { get; set; }

    public DateOnly BookingDate { get; set; }

    public long? BusId { get; set; }

    public long? PassengerId { get; set; }

    public long? SeatId { get; set; }

    public long? TripId { get; set; }

    public long? UserId { get; set; }

   
    public virtual Bus? Bus { get; set; }

   
    public virtual Passenger? Passenger { get; set; }

    [JsonIgnore]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

   
    public virtual Seat? Seat { get; set; }

    [JsonIgnore]
    public virtual Seat? SeatNavigation { get; set; }

   
    public virtual Trip? Trip { get; set; }

    
    public virtual User? User { get; set; }
}

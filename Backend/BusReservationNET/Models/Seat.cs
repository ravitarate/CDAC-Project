using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BusReservationNET.Models;

public partial class Seat
{
    public long SeatId { get; set; }

    public string? SeatNumber { get; set; }

    public string? Status { get; set; }

    public long? BusId { get; set; }

    public long? ReservationId { get; set; }

    public long? TripId { get; set; }

    public long? UserId { get; set; }

   
    public virtual Bus? Bus { get; set; }

    [JsonIgnore]
    public virtual Reservation? Reservation { get; set; }

    [JsonIgnore]
    public virtual Reservation? ReservationNavigation { get; set; }

   
    public virtual Trip? Trip { get; set; }

    
    public virtual User? User { get; set; }
}

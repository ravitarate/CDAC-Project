using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BusReservationNET.Models;

public partial class Trip
{
    public long TripId { get; set; }

    public TimeOnly ArrivalTime { get; set; }

    public TimeOnly DepartureTime { get; set; }

    public string? Destination { get; set; }

    public double Price { get; set; }

    public string? Source { get; set; }

    public DateOnly TripDate { get; set; }

    public long? AgentId { get; set; }

    public long? BusId { get; set; }

    public virtual User? Agent { get; set; }

    public virtual Bus? Bus { get; set; }

    [JsonIgnore]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    [JsonIgnore]
    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();
}

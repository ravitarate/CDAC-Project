using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BusReservationNET.Models;

public partial class User
{
    public long Id { get; set; }

    public string? Address { get; set; }

    public string? Contact { get; set; }

    public string? Email { get; set; }

    public string? Name { get; set; }

    public string? Password { get; set; }

    public string? Role { get; set; }

    [JsonIgnore]
    public virtual ICollection<Bus> Buses { get; set; } = new List<Bus>();

    [JsonIgnore]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    [JsonIgnore]
    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();

    [JsonIgnore]
    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();
}

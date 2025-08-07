using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BusReservationNET.Models;

public partial class Bus
{
    public long BusId { get; set; }

    public string? BusName { get; set; }

    public string? BusNumber { get; set; }

    public int Capacity { get; set; }

    public string? DriverName { get; set; }

    public string? Type { get; set; }

    public long? AgentId { get; set; }

   
    public virtual User? Agent { get; set; }

    [JsonIgnore]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    [JsonIgnore]
    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();

    [JsonIgnore]
    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();
}

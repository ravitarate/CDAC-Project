using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BusReservationNET.Models;

public partial class Passenger
{
    public long PassengerId { get; set; }

    public string? Email { get; set; }

    public string? Name { get; set; }

    public string? Phone { get; set; }

    [JsonIgnore]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}

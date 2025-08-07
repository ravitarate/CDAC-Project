using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BusReservationNET.Models;

public partial class Payment
{
    public long PaymentId { get; set; }

    public double Amount { get; set; }

    public DateOnly PaymentDate { get; set; }

    public long? ReservationId { get; set; }

    [JsonIgnore]
    public virtual Reservation? Reservation { get; set; }
}

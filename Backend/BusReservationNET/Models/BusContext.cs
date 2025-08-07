using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace BusReservationNET.Models;

public partial class BusContext : DbContext
{
    public BusContext()
    {
    }

    public BusContext(DbContextOptions<BusContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bus> Buses { get; set; }

    public virtual DbSet<Passenger> Passengers { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    public virtual DbSet<Seat> Seats { get; set; }

    public virtual DbSet<Trip> Trips { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Bus>(entity =>
        {
            entity.HasKey(e => e.BusId).HasName("PRIMARY");

            entity.ToTable("bus");

            entity.HasIndex(e => e.AgentId, "FK9oa8bcjwq0om9wqhbanqfg7qd");

            entity.Property(e => e.BusId).HasColumnName("bus_id");
            entity.Property(e => e.AgentId).HasColumnName("agent_id");
            entity.Property(e => e.BusName)
                .HasMaxLength(255)
                .HasColumnName("bus_name");
            entity.Property(e => e.BusNumber)
                .HasMaxLength(255)
                .HasColumnName("bus_number");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.DriverName)
                .HasMaxLength(255)
                .HasColumnName("driver_name");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");

            entity.HasOne(d => d.Agent).WithMany(p => p.Buses)
                .HasForeignKey(d => d.AgentId)
                .HasConstraintName("FK9oa8bcjwq0om9wqhbanqfg7qd");
        });

        modelBuilder.Entity<Passenger>(entity =>
        {
            entity.HasKey(e => e.PassengerId).HasName("PRIMARY");

            entity.ToTable("passenger");

            entity.Property(e => e.PassengerId).HasColumnName("passenger_id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PRIMARY");

            entity.ToTable("payment");

            entity.HasIndex(e => e.ReservationId, "FKrewpj5f9v9xehy4ga8g221nw1");

            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.PaymentDate).HasColumnName("payment_date");
            entity.Property(e => e.ReservationId).HasColumnName("reservation_id");

            entity.HasOne(d => d.Reservation).WithMany(p => p.Payments)
                .HasForeignKey(d => d.ReservationId)
                .HasConstraintName("FKrewpj5f9v9xehy4ga8g221nw1");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.ReservationId).HasName("PRIMARY");

            entity.ToTable("reservation");

            entity.HasIndex(e => e.PassengerId, "FK3biwcv0wn3a1lp86g0ecsbnvd");

            entity.HasIndex(e => e.TripId, "FKbnq7qaveg8wkoee526abhsykn");

            entity.HasIndex(e => e.UserId, "FKm4oimk0l1757o9pwavorj6ljg");

            entity.HasIndex(e => e.BusId, "FKswwfdyl747ymlufcdu1milssr");

            entity.HasIndex(e => e.SeatId, "UK_cpo7s1xo509p8s2b4nocw6cq5").IsUnique();

            entity.Property(e => e.ReservationId).HasColumnName("reservation_id");
            entity.Property(e => e.BookingDate).HasColumnName("booking_date");
            entity.Property(e => e.BusId).HasColumnName("bus_id");
            entity.Property(e => e.PassengerId).HasColumnName("passenger_id");
            entity.Property(e => e.SeatId).HasColumnName("seat_id");
            entity.Property(e => e.TripId).HasColumnName("trip_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Bus).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.BusId)
                .HasConstraintName("FKswwfdyl747ymlufcdu1milssr");

            entity.HasOne(d => d.Passenger).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.PassengerId)
                .HasConstraintName("FK3biwcv0wn3a1lp86g0ecsbnvd");

            entity.HasOne(d => d.Seat).WithOne(p => p.Reservation)
                .HasForeignKey<Reservation>(d => d.SeatId)
                .HasConstraintName("FKewd3sohjspqf2sjjvdcmcefpb");

            entity.HasOne(d => d.Trip).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.TripId)
                .HasConstraintName("FKbnq7qaveg8wkoee526abhsykn");

            entity.HasOne(d => d.User).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FKm4oimk0l1757o9pwavorj6ljg");
        });

        modelBuilder.Entity<Seat>(entity =>
        {
            entity.HasKey(e => e.SeatId).HasName("PRIMARY");

            entity.ToTable("seat");

            entity.HasIndex(e => e.BusId, "FKa6qq7pw25gw8a9mqfbb1atl6t");

            entity.HasIndex(e => e.UserId, "FKe6phj7o3jw3cwn0egv9i4v3ma");

            entity.HasIndex(e => e.TripId, "FKsvbxfdxjgv9tgp9iakpdarbr0");

            entity.HasIndex(e => e.ReservationId, "UK_61dlhfxef7c2tb5imy8saxljj").IsUnique();

            entity.Property(e => e.SeatId).HasColumnName("seat_id");
            entity.Property(e => e.BusId).HasColumnName("bus_id");
            entity.Property(e => e.ReservationId).HasColumnName("reservation_id");
            entity.Property(e => e.SeatNumber)
                .HasMaxLength(255)
                .HasColumnName("seat_number");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.TripId).HasColumnName("trip_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Bus).WithMany(p => p.Seats)
                .HasForeignKey(d => d.BusId)
                .HasConstraintName("FKa6qq7pw25gw8a9mqfbb1atl6t");

            entity.HasOne(d => d.ReservationNavigation).WithOne(p => p.SeatNavigation)
                .HasForeignKey<Seat>(d => d.ReservationId)
                .HasConstraintName("FK6voxk3ppixqgl102dbf4ccuuh");

            entity.HasOne(d => d.Trip).WithMany(p => p.Seats)
                .HasForeignKey(d => d.TripId)
                .HasConstraintName("FKsvbxfdxjgv9tgp9iakpdarbr0");

            entity.HasOne(d => d.User).WithMany(p => p.Seats)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FKe6phj7o3jw3cwn0egv9i4v3ma");
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.HasKey(e => e.TripId).HasName("PRIMARY");

            entity.ToTable("trip");

            entity.HasIndex(e => e.AgentId, "FKds9qeg4v0ic18gexqtginfe68");

            entity.HasIndex(e => e.BusId, "FKptvi61dd1hao1yig3in0gvcjs");

            entity.Property(e => e.TripId).HasColumnName("trip_id");
            entity.Property(e => e.AgentId).HasColumnName("agent_id");
            entity.Property(e => e.ArrivalTime)
                .HasColumnType("time")
                .HasColumnName("arrival_time");
            entity.Property(e => e.BusId).HasColumnName("bus_id");
            entity.Property(e => e.DepartureTime)
                .HasColumnType("time")
                .HasColumnName("departure_time");
            entity.Property(e => e.Destination)
                .HasMaxLength(255)
                .HasColumnName("destination");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Source)
                .HasMaxLength(255)
                .HasColumnName("source");
            entity.Property(e => e.TripDate).HasColumnName("trip_date");

            entity.HasOne(d => d.Agent).WithMany(p => p.Trips)
                .HasForeignKey(d => d.AgentId)
                .HasConstraintName("FKds9qeg4v0ic18gexqtginfe68");

            entity.HasOne(d => d.Bus).WithMany(p => p.Trips)
                .HasForeignKey(d => d.BusId)
                .HasConstraintName("FKptvi61dd1hao1yig3in0gvcjs");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Contact)
                .HasMaxLength(10)
                .HasColumnName("contact");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .HasMaxLength(255)
                .HasColumnName("role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

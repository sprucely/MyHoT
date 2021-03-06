using System;
using Microsoft.EntityFrameworkCore;

namespace HoT.Core.Data.Domain
{

    // Based on https://dirtsimple.org/2010/11/simplest-way-to-do-tree-based-queries.html
    public class LocationClosure
    {
        public int ParentId { get; set; }

        public int ChildId { get; set; }

        public int Depth { get; set; }

        public string Path { get; set; }

        public Location Parent { get; set; }

        public Location Child { get; set; }

        internal static void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LocationClosure>()
                .HasKey(lc => new { lc.ParentId, lc.Depth, lc.ChildId });
            modelBuilder.Entity<LocationClosure>()
                .HasIndex(lc => new { lc.ChildId, lc.ParentId, lc.Depth })
                .IsUnique();
            //TODO: Determine if Path index can/should be combined with above (child, parent, depth)
            modelBuilder.Entity<LocationClosure>()
                .HasIndex(lc => lc.Path);
            modelBuilder.Entity<LocationClosure>()
                .HasOne(lc => lc.Parent)
                .WithMany()
                .HasForeignKey(lc => lc.ParentId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<LocationClosure>()
                .HasOne(lc => lc.Child)
                .WithMany()
                .HasForeignKey(lc => lc.ChildId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
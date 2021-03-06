﻿using System;

namespace gymNotebook.Core.Domain
{
    public class Progress : Entity
    {
        public Guid UserId { get; protected set; }

        public float? Weight { get; protected set; }

        public float? Biceps { get; protected set; }

        public float? Chest { get; protected set; }

        public float? Thigh { get; protected set; }

        public float? Calf { get; protected set; }

        public float? Waist { get; protected set; }

        public float? Shoulders { get; protected set; }

        public float? Neck { get; protected set; }

        public DateTime CreatedAt { get; protected set; }

        protected Progress()
        {
        }

        public void UpdateProgress(float weight, float biceps, float chest, float thigh, float calf, float waist, float shoulders, float neck)
        {
            Weight = weight;
            Biceps = biceps;
            Chest = chest;
            Thigh = thigh;
            Calf = calf;
            Waist = waist;
            Shoulders = shoulders;
            Neck = neck;
        }

        public void OverrideProgress(float? weight, float? biceps, float? chest, float? thigh, float? calf, float? waist, float? shoulders, float? neck)
        {
            Weight = weight ?? Weight;
            Biceps = biceps ?? Biceps;
            Chest = chest ?? Chest;
            Thigh = thigh ?? Thigh;
            Calf = calf ?? Calf;
            Waist = waist ?? Waist;
            Shoulders = shoulders ?? Shoulders;
            Neck = neck ?? Neck;
        }

        public Progress(Guid userId ,DateTime createdAt, float? weight, float? biceps, float? chest, float? thigh, float? calf, float? waist, float? shoulders, float? neck)
        {
            UserId = userId;
            Weight = weight;
            Biceps = biceps;
            Chest = chest;
            Thigh = thigh;
            Calf = calf;
            Waist = waist;
            Shoulders = shoulders;
            Neck = neck;
            CreatedAt = createdAt;
        }
    }
}
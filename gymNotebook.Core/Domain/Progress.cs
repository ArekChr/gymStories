using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gymNotebook.Core.Domain
{
    public class Progress
    {
        public int ID { get; set; }

        public DateTime Date { get; protected set; }

        public float Weight { get; protected set; }

        public float Biceps { get; protected set; }

        public float Chest { get; protected set; }

        public float Thigh { get; protected set; }

        public float Calf { get; protected set; }

        public float Waist { get; protected set; }

        public float Shoulders { get; protected set; }

        public float Neck { get; protected set; }

    }
}
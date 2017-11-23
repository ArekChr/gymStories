using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gymNotebook.Core.Domain
{
    public class Progress
    {
        public int ID { get; set; }

        public DateTime Date { get; set; }

        public float Weight { get; set; }

        public float Biceps { get; set; }

        public float Chest { get; set; }

        public float Thigh { get; set; }

        public float Calf { get; set; }

        public float Waist { get; set; }

        public float Shoulders { get; set; }

        public float Neck { get; set; }

    }
}
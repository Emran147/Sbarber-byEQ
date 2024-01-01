using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class Barber
    {
        public int BID { get; set; }

        public string BEmail { get; set; }

        public string BPassWord { get; set; }

        public string BFullName { get; set; }

        public string BScode { get; set; }

        public int owner { get; set; }

        public string BPhoneNumber { get; set; }

        public int RestDay { get; set; }

        public string ShiftStart { get; set; }

        public string ShiftEnd { get; set; }
    }
}
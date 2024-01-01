using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class Customer
    {
        public int CID { get; set; }

        public string CEmail { get; set; }

        public string CPassWord { get; set; }

        public string CPhoneNumber { get; set; }

        public string CFullName { get; set; }

    }
}
using ServerSide.Models;
using System;
using System.Net;
using System.Web.Http;

namespace ServerSide.Controllers
{
    public class CustomerController : ApiController
    {
        [HttpPost]
        [Route("CustomerRegister")]//הרשמת לקוח
        public IHttpActionResult Add([FromBody] Customer customer)
        {

            if (!(IsValidEmail(customer.CEmail)))//בדיקת אימייל 
            {
                return Ok("Check Your Email");
            }
            var result = CustomerDB.CustomerRegister(customer);
            if (result != 0)
            {
                return Ok("Customer Created ");
            }

            return Ok("Customer  not Created");

        }

        [HttpGet]
        [Route("GetAllCustomers")]//רשימת כל הלקוחות 
        public IHttpActionResult GetAllCustomers()
        {
            try
            {
                return Ok(CustomerDB.GetAllCustomers());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        bool IsValidEmail(string email)//בדיקת תקינונת אימייל 
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
   
    }
}
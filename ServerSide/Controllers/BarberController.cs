using ServerSide.Models;
using System;
using System.Net;
using System.Web.Http;

namespace ServerSide.Controllers
{
    public class BarberController : ApiController
    {
        [HttpPost]
        [Route("BarberRegister")]
        public IHttpActionResult Add([FromBody] Barber barber)//הרשמת ספר
        {
            if (!(IsValidEmail(barber.BEmail)))//email בדיקת תקינות 
            {
                return Ok("Check Your Email");
            }

            var result = BarberDB.BarberRegister(barber);
            if (result == 1)//אם הצלחת 
            {
                return Ok("Barber Created ");
            }
            if(result==0)//אם לא הצלחת
            return Ok("Email is Taken / Something Wrong");
            else
            {
                return Ok("Wrong BScode");
            }
        }


       

        [HttpPost]
        [Route("GetAllBarbersbyBScode")]
        public IHttpActionResult GetAllBarbersbyBScode([FromBody] BScodeCID temp)//רשימת הספרים 
        {
            try
            {
                return Ok(BarberDB.GetAllBarbersbyBScode(temp));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpPost]
        [Route("LoginForEveryBody")]
        public IHttpActionResult LoginForEveryBody([FromBody] user user)//פונקצית כניסה לכל המשתמשים 
        {
             try
            {
                //בודקים אם הוא ספר או לקוח ולפי זה מחזירים התשובה 6
                Barber B2Login = BarberDB.Login(user.email, user.password);
                Customer C2Login = CustomerDB.Login(user.email, user.password);
                if (C2Login != null)
                {
                    return Ok(C2Login);
                }

                if (B2Login != null)
                {
                    return Ok(B2Login);
                }
                else
                {
                    return Content(HttpStatusCode.NotFound,
                        $" student with email={user.email}" +
                        $" and password={user.password} was not found for Login!");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        //בדיקת תקינות אימיל 
        bool IsValidEmail(string email)
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
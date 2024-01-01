using ServerSide.Models;
using System;
using System.Net;
using System.Web.Http;

namespace ServerSide.Controllers
{
    public class BarberShopController : ApiController
    {
        
            [HttpPost]
            [Route("CreateBarberShop")]
            public IHttpActionResult Add([FromBody] BarberShop barbershop)//הרשמת מספרה
            {
                var result = BarberShopDb.CreateBarberShop(barbershop);
                if (result != 0)//עם הצלחה 
                {
                    return Ok("BarberShop Created ");
                }
                //אחרת
                return Ok("BarberShop  not Created");

            }

    

        [HttpGet]
        [Route("GetAllBarberShops")]
        public IHttpActionResult GetAllBarberShops()//רשימת המספרות 
        {
            try
            {
                return Ok(BarberShopDb.GetAllBarberShops());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

    }

}
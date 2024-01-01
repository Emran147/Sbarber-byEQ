using ServerSide.Models;
using System;
using System.Net;
using System.Web.Http;

namespace ServerSide.Controllers
{
    public class ServiceController : ApiController
    {
        [HttpPost]
        [Route("AddService")]
        public IHttpActionResult Add([FromBody] Service service)//הוספת שירות על ידי ספר 
        {
            var result = ServiceDB.AddService(service);
            if (result != 0)
            {
                return Ok("Service  Created ");
            }

            return Ok("Service  not Created");

        }


        [HttpGet]
        [Route("GetAllServices/{BID}")]
        public IHttpActionResult GetAllServices(int BID)//רשימת שירותים שהספר מספק
        {

            try
            {
                return Ok(ServiceDB.GetAllServices(BID));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpPost]
        [Route("RemoveService")]
        public IHttpActionResult Remove([FromBody] serv serv)//מחיקת שירות
        {
            var result = ServiceDB.RemoveService(serv);
            if (result != 0)
            {
                return Ok("Removed");
            }

            return Ok("Something Wrong");

        }
    }
}
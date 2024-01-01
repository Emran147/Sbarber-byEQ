using ServerSide.Models;
using System;
using System.Net;
using System.Web.Http;

namespace serverside.Controllers
{
    public class testController : ApiController
    {
        [HttpPost]
        [Route("GetResrvetions")]
        public IHttpActionResult GetResrvetions([FromBody]Reservation resrv)
        {
            try
            {
                return Ok(Testdb.GetResrvetions(resrv));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }








    }
}
using ServerSide.Models;
using System;
using System.Net;
using System.Web.Http;

namespace ServerSide.Controllers
{
    public class ReservationsController : ApiController
    {
        [HttpPost]
        [Route("CreateReservetion")]//הוספת הזמנה
        public IHttpActionResult CreateReservetion([FromBody] Reservation reservation)
        {

            var result = ReservationsDB.CreateReservetion(reservation);
            if (result != 0)
            {
                return Ok("Reservation Created ");
            }

            return Ok(" Something Wrong");

        }

        [HttpGet]
        [Route("GetTheResevetionForBarber/{BID}")]//רשימת הזמנות לספר ספציפי
        public IHttpActionResult GetTheResevetionForBarber(int BID)
        {
            try
            {
                return Ok(ReservationsDB.GetTheResevetionForBarber(BID));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpGet]
        [Route("GetTheResevetionForCustomer/{CID}")]//רשימת הזמנות ללקוח ספציפי
        public IHttpActionResult GetTheResevetionForCustomer(int CID)
        {
            try
            {
                return Ok(ReservationsDB.GetTheResevetionForCustomer(CID));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
  


        [HttpGet]
        [Route("CancelByBarber/{RID}")]//ביטול תור על ידי ספר 
        public IHttpActionResult CancelByBarber( int RID)
        {

            var result = ReservationsDB.CancelByBarber(RID);
            if (result != 0)
            {
                return Ok("Reservation Canceled ");
            }

            return Ok(" eror from .net or db");

        }
        [HttpGet]
        [Route("ConfirmReservation/{RID}")]//אישור תור על ידי הספר 
        public IHttpActionResult ConfirmReservation( int RID)
        {

            var result = ReservationsDB.ConfirmReservation(RID);
            if (result != 0)
            {
                return Ok("Reservation confirmed ");
            }

            return Ok(" eror from .net or db");

        }

        [HttpPost]
        [Route("GetTheAvailableTime")]  // יבוא הזמניים האפשריים לפי זמן הספר וזמן השירות 
        public IHttpActionResult GetTheAvailableTime([FromBody]Resrv  resrv)
        {
            try
            {
                return Ok(Themainfunc.MainCalc(resrv));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpGet]
        [Route("CancelByCustomer/{RID}")]//ביטול תור על ידי לקוח 
        public IHttpActionResult CancelByCustomer( int RID)
        {
            var result = ReservationsDB.CancelByCustomer(RID);
            if (result != 0)
            {
                return Ok("CancelByCustomer done");
            }

            return Ok("Something Wrong");

        }



    }
}
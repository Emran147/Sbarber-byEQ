using ServerSide.Models;
using System;
using System.Net;
using System.Web.Http;

namespace ServerSide.Controllers
{
    public class BlockController : ApiController
    {

        [HttpPost]
        [Route("AddToBlockList")]
        public IHttpActionResult Add([FromBody] Block block)//הוספת לקוח לרשימת הלקוחות החסומיים 
        {
            var result = BlockDB.AddToBlockList(block);
            if (result != 0)//אם נוסף בהצלחה
            {
             

                return Ok("Blocked  ");
            }

            return Ok("Wrong ID");

        }


        [HttpPost]
        [Route("RemovefromBlockList")]//מחיקה מתוך רשימת לקוחות נחסמיים 
        public IHttpActionResult Remove([FromBody] Block block)
        {
            var result = BlockDB.RemovefromBlockList(block);
            if (result != 0)
            {
                return Ok("Removed");
            }

            return Ok("Something Wrong");

        }



        [HttpGet]
        [Route("GetTheBlockedCustomerInfo/{BID}")]//רשימת לקוחות חסומיים 
        public IHttpActionResult GetTheBlockedCustomerInfo(int BID)
        {

            try
            {
                return Ok(BlockDB.GetTheBlockedCustomerInfo(BID));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


        

    }
}
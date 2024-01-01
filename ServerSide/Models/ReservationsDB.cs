using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class ReservationsDB
    {
        static readonly string Constr = ConfigurationManager.ConnectionStrings["production"].ConnectionString;
        internal static int CreateReservetion(Reservation reservation)// יצירת הזמנה
        {
         

            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"INSERT INTO Reservations([Cname],[Bname],[ServiceName],[RTime],[Status],[Day],[CID],[BID],[BSname]) VALUES
                  ('{reservation.Cname}','{reservation.Bname}','{reservation.ServiceName}','{reservation.RTime}','3','{reservation.Day}','{reservation.CID}','{reservation.BID}','{reservation.BSname}')";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            int result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
        }
        internal static object GetTheResevetionForBarber(int BID)//רשימת הזמנות לספר ספציפי
        {
            return ExcQ("select * from Reservations where Reservations.BID=" + BID);
        }
        internal static object GetTheResevetionForCustomer(int CID)//רשימת הזמנות ללקוח ספציפי
        {
            return ExcQ("select * from Reservations where Reservations.CID=" + CID);
        }

        private static List<Reservation> ExcQ(string query)
        {
            SqlConnection con = new SqlConnection(Constr);

            SqlDataAdapter adptr = new SqlDataAdapter(query, con);
            DataSet ds = new DataSet();
            adptr.Fill(ds);
            List<Reservation> ls = ds.Tables[0].AsEnumerable()
                .Select(use => new Reservation()
                {
                    RID = use.Field<int>("RID"),
                    Cname = use.Field<string>("Cname"),
                    Bname = use.Field<string>("Bname"),
                    BSname = use.Field<string>("BSname"),
                    ServiceName = use.Field<string>("ServiceName"),
                    RTime = use.Field<string>("RTime"),
                    Status = use.Field<string>("Status"),
                    Day = use.Field<int>("Day"),
                    CID = use.Field<int>("CID"),
                    BID = use.Field<int>("BID"),
                }).ToList();
            return ls;
        }

        internal static int CancelByBarber(int RID)//ביטול הזמנה על ידי ספר
        {
            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"update Reservations set Status=1 where RID={RID} ";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            int result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
        }
        internal static int ConfirmReservation(int RID)//אישור הזמנה
        {
            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"update Reservations set Status=2 where RID={RID} ";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            int result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
        }

            //4 cancel by customer 
            //2 confirmed
            //3 waitin 
            //1 cancel by barber
        internal static int CancelByCustomer(int RID)//ביטול על ידי לקוח
        {
            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"update Reservations set Status=4 where RID={RID}";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            int result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
        }
    }
}
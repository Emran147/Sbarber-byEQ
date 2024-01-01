using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class BarberShopDb
    {
        static readonly string Constr = ConfigurationManager.ConnectionStrings["production"].ConnectionString;
        internal static int CreateBarberShop(BarberShop barberShop)//הוספת מספרה
        {

            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"INSERT INTO BarberShop ([BScode],[BSname],[BSAddress]) VALUES
                  ('{barberShop.BScode}','{barberShop.BSname}','{barberShop.BSAddress}')";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            var result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
        }
        public static List<BarberShop> ExcQ(string query)//רשימה לפי ההוראה 
        {
            SqlConnection con = new SqlConnection(Constr);

            SqlDataAdapter adptr = new SqlDataAdapter(query, con);
            DataSet ds = new DataSet();
            adptr.Fill(ds);
            List<BarberShop> ls = ds.Tables[0].AsEnumerable()
                .Select(use => new BarberShop()
                {
                    BScode = use.Field<string>("BScode"),
                    BSname = use.Field<string>("BSname"),
                    BSAddress = use.Field<string>("BSAddress"),
                }).ToList();
            return ls;
        }

        internal static object GetAllBarberShop()
        {
            return ExcQ("SELECT * FROM BarberShop ");
        }

        public static List<BarberShop> GetAllBarberShops()//רשימת כל המספרות
        {
            return ExcQ("SELECT * FROM BarberShop ");
        }


    }
}
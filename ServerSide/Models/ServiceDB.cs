using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class ServiceDB
    {

        static readonly string Constr = ConfigurationManager.ConnectionStrings["production"].ConnectionString;


        internal static int AddService(Service service)//הוספת שירות 
        {

            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"INSERT INTO Service([BID],[ServiceName],[ServiceTime],[ServicePrice]) VALUES
                  ('{service.BID}','{service.ServiceName}','{service.ServiceTime}','{service.ServicePrice}')";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            var result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
        }

        internal static List<Service>  GetAllServices(int  BID)//רשימת שירותים לפי ספר 
        {
           return ExcQ($"select * from Service where BID = {BID}");
        }


        internal static int RemoveService(serv serv)//מחיקת שירות
        {
            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"Delete from  Service where BID='{serv.BID}' and ServiceName='{serv.ServiceName}'";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            var result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
        }

        private static List<Service> ExcQ(string query)
        {
            SqlConnection con = new SqlConnection(Constr);

            SqlDataAdapter adptr = new SqlDataAdapter(query, con);
            DataSet ds = new DataSet();
            adptr.Fill(ds);
            List<Service> ls = ds.Tables[0].AsEnumerable()
                .Select(use => new Service()
                {
                    BID = use.Field<int>("BID"),
                    ServiceName = use.Field<string>("ServiceName"),
                    ServicePrice = use.Field<int>("ServicePrice"),
                    ServiceTime = use.Field<int>("ServiceTime"),
                }).ToList();
            return ls;
        }
    }
}
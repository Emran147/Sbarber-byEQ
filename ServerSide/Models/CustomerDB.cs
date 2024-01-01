using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class CustomerDB
    {
        static readonly string Constr = ConfigurationManager.ConnectionStrings["production"].ConnectionString;
    

        internal static int CustomerRegister(Customer customer)//הרשמת לקוח 
        {
            List<Customer> ls = ExcQ(//בדיקה שהמייל לא כבר קיים
              $" SELECT * " + 
              $" FROM CustomerInfo " +
              $" WHERE CEmail='{customer.CEmail}' ");
            if (ls.Count == 0) { 

            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"INSERT INTO CustomerInfo([CEmail],[CPassWord],[CPhoneNumber],[CFullName]) VALUES
                  ('{customer.CEmail}','{customer.CPassWord}','{customer.CPhoneNumber}','{customer.CFullName}')";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            var result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
            }
            return 0;
        }
        public static List<Customer> GetAllCustomers()//רשימת כל הלקוחות
        {
            return ExcQ("SELECT * FROM CustomerInfo");
        }

        public static List<Customer> ExcQ(string query)
        {
            SqlConnection con = new SqlConnection(Constr);

            SqlDataAdapter adptr = new SqlDataAdapter(query, con);
            DataSet ds = new DataSet();
            adptr.Fill(ds);
            List<Customer> ls = ds.Tables[0].AsEnumerable()
                .Select(use => new Customer()
                {
                    CID = use.Field<int>("CID"),
                    CEmail = use.Field<string>("CEmail"),
                    CPassWord = use.Field<string>("CPassWord"),
                    CPhoneNumber = use.Field<string>("CPhoneNumber"),
                    CFullName = use.Field<string>("CFullName"),
                   }).ToList();
            return ls;
        }

        internal static Customer Login(string bEmail, string bPassWord)//פונקציית כניסה
        {
            List<Customer> ls = ExcQ(//בדיקה שהמייל והסיסמה כן נמצאיים בתוך רשימת לקוחות
                 $" SELECT * " +
                 $" FROM CustomerInfo " +
                 $" WHERE CEmail='{bEmail}' and CPassWord='{bPassWord}'");
            if (ls.Count == 1)
            {
                return ls[0];
            }
            else
            {
                return null;
            }
        }
    }
}
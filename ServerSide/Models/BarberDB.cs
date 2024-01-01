using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class BarberDB
    {

        static readonly string Constr = ConfigurationManager.ConnectionStrings["production"].ConnectionString;


        internal static int BarberRegister(Barber barber)//הרשמת ספר 
        {
            List<BarberShop> ls1 = BarberShopDb.ExcQ(//בדיקה שהמספרה שהוא מנסה לכנס אליהא היא כן נמצאת 
             $" SELECT * " +
             $" FROM BarberShop " +
             $" WHERE BScode='{barber.BScode}' ");

            List<Barber> ls2 = ExcQ(//בדיקה שהמייל אנו קיים לפני זה 
              $" SELECT * " +
              $" FROM BarberInfo " +
              $" WHERE BEmail='{barber.BEmail}' ");
            if (ls1.Count != 0 && ls2.Count==0)
            {
                SqlConnection sqlConnection = new SqlConnection(Constr);
                string strInsertSQL = $@"INSERT INTO BarberInfo([BEmail],[BPassWord],[BFullName],[BScode],[owner],[BPhoneNumber],[RestDay],[ShiftStart],[ShiftEnd]) VALUES
                  ('{barber.BEmail}','{barber.BPassWord}','{barber.BFullName}','{barber.BScode}','{barber.owner}','{barber.BPhoneNumber}','{barber.RestDay}','{barber.ShiftStart}','{barber.ShiftEnd}')";


                var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

                sqlConnection.Open();

                var result = SqlCommand.ExecuteNonQuery();
                sqlConnection.Close();
                return 1;
            }
            if (ls1.Count != 0)
                return 0;
            else return 2;
        }


        public static List<Barber> GetAllBarbers()//רשימת הספריים
        {
            return ExcQ("SELECT * FROM BarberInfo");
        }

        internal static Barber Login(string bEmail, string bPassWord)//כניסה 
        {
            List<Barber> ls = ExcQ(//בדיקה שהמייל והסיסמה כן נמצאים 
               $" SELECT * " +
               $" FROM BarberInfo " +
               $" WHERE BEmail='{bEmail}' and BPassWord='{bPassWord}'");
            if (ls.Count == 1)
            {
                return ls[0];
            }
            else
            {
                return null;
            }
        }

       
        public static List<Barber> GetAllBarbersbyBScode(BScodeCID stam)//רשימת הספרים / לקחת בחשבון רשימת החסימות 
        {
            string temp = "'" + stam.BScode + "'";
            return ExcQ($"select * from BarberInfo where BID not in (select BID from BlockList where CID = '{stam.CID}') and BScode = {temp}");
        }


        private static List<Barber> ExcQ(string query)//תביא רשימה שמתאימה ל ההוראה שאני אתן
        {
            SqlConnection con = new SqlConnection(Constr);

            SqlDataAdapter adptr = new SqlDataAdapter(query, con);
            DataSet ds = new DataSet();
            adptr.Fill(ds);
            List<Barber> ls = ds.Tables[0].AsEnumerable()
                .Select(use => new Barber()
                {
                    BID = use.Field<int>("BID"),
                    BEmail = use.Field<string>("BEmail"),
                    BPassWord = use.Field<string>("BPassWord"),
                    BFullName = use.Field<string>("BFullName"),
                    BScode = use.Field<string>("BScode"),
                    owner = use.Field<int>("owner"),
                    BPhoneNumber = use.Field<string>("BPhoneNumber"),
                    RestDay = use.Field<int>("RestDay"),
                    ShiftStart = use.Field<string>("ShiftStart"),
                    ShiftEnd = use.Field<string>("ShiftEnd"),
                }).ToList();
            return ls;
        }

       


    }
}
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class BlockDB
    {


        static readonly string Constr = ConfigurationManager.ConnectionStrings["production"].ConnectionString;
     

        internal static int AddToBlockList(Block block)//הוספת לקוח לרשימת החסומיים
        {
            List<Block> ls1 = ExcQ(//בדיקה שהוא לא כבר חסום 
             $" SELECT *" +
             $" FROM BlockList " +
             $" WHERE CID='{block.CID}' and BID='{block.BID}'");
            List<Customer> ls2 = CustomerDB.ExcQ(//בדיקה שהלקוח כן קיים ונמצא
            $" SELECT * " +
            $" FROM CustomerInfo " +
            $" WHERE CID='{block.CID}'  ");
            if (ls1.Count == 0 && ls2.Count!=0)
            {

                SqlConnection sqlConnection = new SqlConnection(Constr);
                string strInsertSQL = $@"INSERT INTO BlockList([CID],[BID]) VALUES
                  ('{block.CID}','{block.BID}')";


                var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

                sqlConnection.Open();

                var result = SqlCommand.ExecuteNonQuery();
                sqlConnection.Close();
                return 1;
            }
            return 0;
        }

        internal static int RemovefromBlockList(Block block)//ביטול חסימת לקוח 
        {
            SqlConnection sqlConnection = new SqlConnection(Constr);
            string strInsertSQL = $@"Delete from  BlockList where BID='{block.BID}' and CID='{block.CID}'";


            var SqlCommand = new SqlCommand(strInsertSQL, sqlConnection);

            sqlConnection.Open();

            var result = SqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return result;
        }

        public static List<Block> GetTheBlockedByID(Block block)//רשימת חסימות לפי ספר 
        {
            return ExcQ("SELECT * FROM BlockList Where BID= "+block.BID);
        }
        public static List<Names> GetTheBlockedCustomerInfo(int BID)//פרטי הלקוחות הנחסמים 
        {
            return ExcQ2($"select CFullName,CustomerInfo.CID  from CustomerInfo INNER JOIN BlockList on BlockList.CID = CustomerInfo.CID where BlockList.BID = '{BID}'; ");
        }


        private static List<Block> ExcQ(string query)
        {
            SqlConnection con = new SqlConnection(Constr);

            SqlDataAdapter adptr = new SqlDataAdapter(query, con);
            DataSet ds = new DataSet();
            adptr.Fill(ds);
            List<Block> ls = ds.Tables[0].AsEnumerable()
                .Select(use => new Block()
                {
                    CID = use.Field<int>("CID"),
                    BID = use.Field<int>("BID"),
              
                }).ToList();
            return ls;
        }


        private static List<Names> ExcQ2(string query)
        {
            SqlConnection con = new SqlConnection(Constr);

            SqlDataAdapter adptr = new SqlDataAdapter(query, con);
            DataSet ds = new DataSet();
            adptr.Fill(ds);
            List<Names> ls = ds.Tables[0].AsEnumerable()
                .Select(use => new Names()
                {
                    CFullName = use.Field<string>("CFullName"),
                    CID = use.Field<int>("CID"),
                }).ToList();
            return ls;
        }



    }
}
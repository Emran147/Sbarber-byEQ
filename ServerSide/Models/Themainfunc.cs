using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace ServerSide.Models
{
    public class Themainfunc
    {
        static readonly string Constr = ConfigurationManager.ConnectionStrings["production"].ConnectionString;

        internal static List<string> MainCalc(Resrv resrv)
        {
            List<string> lst = new List<string>();//רשימת ההזמנות שכבר נאשרו 
            lst = ExcQ($"select * from Reservations where Reservations.BID={resrv.BID} and Reservations.Day={resrv.Day} and Reservations.Status='2'")
                .Select(s => s.RTime).ToList();
            

            List<string> start = new List<string>();
            List<string> end = new List<string>();
            foreach (var item in lst)
            {
                var NewArr = item.Split('-');

                start.Add(NewArr.FirstOrDefault());
                end.Add(NewArr.LastOrDefault());
            }

            string bstart = "", bend = "";
            SqlConnection con = new SqlConnection(Constr);
            string sql = $"Select ShiftStart From BarberInfo where BID={resrv.BID}";

            SqlCommand cmd = new SqlCommand(sql, con);
            cmd.Connection.Open();
            SqlDataReader rd = cmd.ExecuteReader();
            if (rd.HasRows)
            {
                rd.Read(); // read first row
                bstart = (string)rd[0];
            }
            string sql2 = $"Select ShiftEnd From BarberInfo where BID={resrv.BID}";

            con.Close();
            con.Open();
            SqlCommand cmd2 = new SqlCommand(sql2, con);
            SqlDataReader rd2 = cmd2.ExecuteReader();
            if (rd2.HasRows)
            {
                rd2.Read(); // read first row
                bend = (string)rd2[0];
            }
            List<string> lstoreturn = new List<string>();
            con.Close();


            lstoreturn = func2(start.ToArray(), end.ToArray(), bstart, bend, resrv.Time);

            return lstoreturn;


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
                    ServiceName = use.Field<string>("ServiceName"),
                    RTime = use.Field<string>("RTime"),
                    Status = use.Field<string>("Status"),
                    Day = use.Field<int>("Day"),
                    CID = use.Field<int>("CID"),
                    BID = use.Field<int>("BID"),
                }).ToList();
            return ls;
        }


        //פונקציה 1 מקבלת הזמן הפנוי מפונקציה 1 ומחלקת אותו לפי זמן השירות המבוקשת ומחזירה רשימה שבה כן אפשר לעשות תור 
        public static List<string> func1(string[] arr, int time)//اوقات الفراغ وقديش وقت مدة الحلقة
        {
            //بترجع وينتا في مجال الواحد يحلق وبتقسم الاوقات حسب التايم الي مكبليم اوتو
            string x, y;
            int temp, temp2, t = 0;
            int lrc = 0;//last array counter
            List<string> lastarr = new List<string>();
            for (int i = 0; i < arr.Length; i++)
            {
                x = arr[i].Remove(5);
                //Console.WriteLine(x);
                y = arr[i].Remove(0, 6);
                // Console.WriteLine(y);
                int a = int.Parse(x.Remove(2));
                //Console.WriteLine(" a : {0}", a);
                int b = int.Parse(x.Remove(0, 3));
                // Console.WriteLine(" b : {0}", b);
                int c = int.Parse(y.Remove(2));
                // Console.WriteLine(" c : {0}", c);
                int d = int.Parse(y.Remove(0, 3));
                // Console.WriteLine(" d : {0}", d);
                int m = Math.Abs((60 - b) - (60 - d));
                // Console.WriteLine(" m : {0}", m);
                int h = c - a;
                // Console.WriteLine(" h : {0}", h);

                var StartDate = DateTime.Today.AddHours(a).AddMinutes(b);
                var EndDate = DateTime.Today.AddHours(c).AddMinutes(d);
                var TotalMins = ((int)(EndDate - StartDate).TotalMinutes);



                if (TotalMins < time)
                {
                    continue;
                }
                //  Console.WriteLine(" t : {0}", t);
                int o = TotalMins / time;
                //  Console.WriteLine(" o : {0}", o);
                for (int j = 0; j < o; j++)
                {
                    if (a > 23)
                        continue;

                    if (b + time < 60)
                    {
                        if (b == 0)
                        {
                            lastarr.Add($"{a}:{"00"}-{a}:{b + time}");
                        }
                        else if (b < 10)
                        {
                            lastarr.Add($"{a}:0{b}-{a}:{b + time}");
                        }
                        else
                            lastarr.Add($"{a}:{b}-{a}:{b + time}");
                        b = b + time;
                    }
                    else
                    {
                        temp = 60 - b;
                        temp2 = time - temp;

                        string bx = "";
                        if (b == 0)
                            bx = "00";
                        else if (b < 10)
                            bx = "0" + b;
                        else bx = b.ToString();
                        if (temp2 == 0)
                        {

                            lastarr.Add($"{a}:{bx}-{a + 1}:{"00"}");
                        }
                        else if (temp2 < 10)
                        {
                            lastarr.Add($"{a}:{bx}-{a + 1}:0{temp2}");
                        }
                        else
                            lastarr.Add($"{a}:{bx}-{a + 1}:{temp2}");
                        a = a + 1;
                        b = temp2;

                    }
                    lrc++;
                }
            }

            List<string> lst = new List<string>();

            return lastarr;

        }




        //פונקציה 2 מחשבת את הזמן הפנוי ושלחת אותו לפונקציה1
        public static List<string> func2(string[] start, string[] end, string bstart1, string bend1, int time)//لست الستارت هيا الي فيها الحجوزات اي ساعه ببدين ولست الايند هي فيها لست الحجوزات اي ساعه بنتهين
        {

            if (start.Length == 0)
            {
                string[] arx = new string[] { $"{bstart1} {bend1}" };
                return func1(arx, time);
            }

            string bstart = bstart1.ToString();
            string bend = bend1.ToString();
            int counter = 0;
            if (bstart != start[0])
            {
                counter++;
            }
            if (bend != end[end.Length - 1])
            {
                counter++;
            }
            List<string> arr = new List<string>();
            string temp = bstart + "-" + bend;
            if (start[0] == null)
            {
                Console.WriteLine(temp);
            }
            else
            {
                int i = 1;
                if (bstart != start[0])
                {
                    if (bstart != start[0])
                        arr.Add(bstart + " " + start[0]);
                }
                for (i = 1; i < start.Length; i++)
                {
                    if (end[i - 1] != start[i])
                        arr.Add(end[i - 1] + " " + start[i]);
                }

                if (bend != end[end.Length - 1])
                {
                    if (end[end.Length - 1] != bend)
                        arr.Add(end[end.Length - 1] + " " + bend);
                }
            }

           
            return func1(arr.ToArray(), time);

        }
    }
}
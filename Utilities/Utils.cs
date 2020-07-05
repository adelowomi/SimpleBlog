using System;
namespace SimpleBlog.Utilities
{
    public class Utils
    {
        public static string FormattedDate(DateTime ThisDate)
        {
            try
            {
                if (ThisDate != DateTime.MaxValue && ThisDate != DateTime.MinValue)
                {
                    return ThisDate.ToShortDateString() + ":" + ThisDate.ToShortTimeString();
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
            return "";
        }
    }
}
using System.Net;
using System.Net.Mail;

public interface IEmailService
{
    Task SendEmail(string to, string subject, string body);
}

public class EmailService : IEmailService
{
    public async Task SendEmail(string to, string subject, string body)
    {
        try
        {
            Console.WriteLine("STEP 1");

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,

                Credentials = new NetworkCredential(
                    "rishikdatta6@gmail.com",
                    "erlxnpgdayplueif"
                ),

                EnableSsl = true,
                UseDefaultCredentials = false
            };

            Console.WriteLine("STEP 2");

            var message = new MailMessage(
                "rishikdatta6@gmail.com",
                to,
                subject,
                body
            );

            Console.WriteLine("STEP 3");

            await smtp.SendMailAsync(message);

            Console.WriteLine("EMAIL SENT SUCCESS");
        }
        catch (Exception ex)
        {
            Console.WriteLine("EMAIL FAILED:");
            Console.WriteLine(ex.ToString());

            throw;
        }
    }
}
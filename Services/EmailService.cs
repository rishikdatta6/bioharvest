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
        Console.WriteLine("STEP 1");

        var smtp = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,

            Credentials = new NetworkCredential(
                "rishikdatta6@gmail.com",
                "erlxnpgdayplueif"
            ),

            EnableSsl = true,
            UseDefaultCredentials = false,

            Timeout = 10000
        };

        Console.WriteLine("STEP 2");

        var message = new MailMessage(
            "rishikdatta6@gmail.com",
            to,
            subject,
            body
        );

        Console.WriteLine("STEP 3");

        try
        {
            await smtp.SendMailAsync(message);

            Console.WriteLine("STEP 4");
            Console.WriteLine("EMAIL SENT");
        }
        catch (Exception ex)
        {
            Console.WriteLine("EMAIL ERROR:");
            Console.WriteLine(ex.ToString());

            throw;
        }
    }
}
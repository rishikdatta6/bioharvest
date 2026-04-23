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
        var smtp = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential("rishikdatta6@gmail.com", "kizusprahpwmreuk"),
            EnableSsl = true,
            UseDefaultCredentials=false
        };

        var message = new MailMessage("rishikdatta6@gmail.com", to, subject, body);
        try
        {
            await smtp.SendMailAsync(message);
            Console.WriteLine("✅ SENT");
        }
        catch (Exception ex)
        {
            Console.WriteLine("EMAIL ERROR: " + ex.ToString());
        }
    }
}
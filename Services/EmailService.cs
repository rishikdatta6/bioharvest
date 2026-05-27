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

            Credentials = new NetworkCredential(
                "rishikdatta6@gmail.com",
                "erlxnpgdayplueif"
            ),

            EnableSsl = true,
            UseDefaultCredentials = false,

            Timeout = 10000
        };

        var message = new MailMessage(
            "rishikdatta6@gmail.com",
            to,
            subject,
            body
        );

        await smtp.SendMailAsync(message);
    }
}
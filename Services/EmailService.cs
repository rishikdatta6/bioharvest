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
            Console.WriteLine("START MAIL");

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(
                    "rishikdatta6@gmail.com",
                    "fpokcgekxrwvmzcd"
                ),
                Timeout = 20000
            };

            Console.WriteLine("SMTP CREATED");

            var message = new MailMessage();
            message.From = new MailAddress("rishikdatta6@gmail.com");
            message.To.Add(to);
            message.Subject = subject;
            message.Body = body;

            Console.WriteLine("SENDING...");

            await smtp.SendMailAsync(message);

            Console.WriteLine("MAIL SENT");
        }
        catch (Exception ex)
        {
            Console.WriteLine("FULL EMAIL ERROR:");
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.InnerException?.Message);
            throw;
        }
    }
}
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

public interface IEmailService
{
    Task SendEmail(string to, string subject, string body);
}

public class EmailService : IEmailService
{
    private readonly HttpClient _httpClient = new HttpClient();

    public async Task SendEmail(string to, string subject, string body)
    {
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue(
                "Bearer",
                "re_21wmksrh_BJzhhGqR1SJXtBsU2FcsSGyB"
            );

        var emailData = new
        {
            from = "onboarding@resend.dev",
            to = new[] { to },
            subject = subject,
            html = $"<p>{body}</p>"
        };

        var content = new StringContent(
            JsonConvert.SerializeObject(emailData),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync(
            "https://api.resend.com/emails",
            content
        );

        response.EnsureSuccessStatusCode();
    }
}
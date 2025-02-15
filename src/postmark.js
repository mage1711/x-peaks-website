export const sendEmail = async (email) => {
  const url = "http://localhost:5000/send-email";
  const body = JSON.stringify({
    From: email["From"],
    To: email["To"],
    Subject: email["Subject"],
    TextBody: email["TextBody"],
    MessageStream: "broadcast",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

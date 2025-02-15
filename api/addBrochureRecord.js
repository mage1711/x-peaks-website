export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { email, packageName, language } = req.body;

  const token =
    "patIMArqwGqYUF38G.ff268c728a7eab49d18ff796ae3f12a694b71f2c17863f674e5c0f6810bb4c97";
  const endpoint =
    "https://api.airtable.com/v0/appvkXC9afBnDgI3g/tbljqYrWaysZuiRYy";

  try {
    const data = {
      records: [
        {
          fields: {
            email: email,
            package: packageName,
            language: language,
          },
        },
      ],
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(500).json({
      error: "Error adding record to Airtable",
      details: error.message,
    });
  }
}

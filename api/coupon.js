module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { couponId } = req.body;

  if (!couponId) {
    return res.status(400).json({ message: "Coupon ID is required" });
  }

  try {
    const AIRTABLE_TOKEN =
      "patskTlsVNWRlgJJa.ef5fd0efb67f82602eee72b0281c138c8db72ee591e5df6502a7bcc1e80f28be";
    const AIRTABLE_BASE = "appvkXC9afBnDgI3g";
    const endpoint = `https://api.airtable.com/v0/${AIRTABLE_BASE}/Coupons/${couponId}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const currentUses = response.data.fields.uses || 0;

    await fetch(endpoint, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          uses: currentUses + 1,
        },
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating coupon usage:", error);
    return res.status(500).json({ message: "Error updating coupon usage" });
  }
};

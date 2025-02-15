const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.postmarkapp.com/email",
      req.body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": "4dc56a20-1264-4dc2-93e5-1b3803e6e9c2",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(error.response ? error.response.data : "Error sending email");
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});

import cron from "cron";
import https from "https";

const API_URL =
  process.env.API_URL ||
  "https://bookstore-app-bdiz.onrender.com/api";

const job = new cron.CronJob("*/14 * * * *", function () {
  console.log("Cron calling URL:", API_URL);

  const req = https.get(API_URL, (res) => {
    if (res.statusCode === 200) {
      console.log("GET request sent successfully");
    } else {
      console.log("GET request failed:", res.statusCode);
    }
  });

  req.on("error", (err) => {
    console.log("Keep-alive error:", err.code);
  });

  req.setTimeout(10000, () => {
    console.log("Request timeout");
    req.destroy();
  });
});

export default job;
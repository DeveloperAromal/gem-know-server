import app from "./v1/src/app.js";
import "./v1/src/utils/otp_cleaner_cron.js";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

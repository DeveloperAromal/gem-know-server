// cron/otpCleaner.js
import cron from "node-cron";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Run every minute
cron.schedule("* * * * *", async () => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("otp")
    .delete()
    .lt("expires_at", now); // delete if expires_at < now

  if (error) {
    console.error("Failed to delete expired OTPs:", error.message);
  } else {
    console.log(
      `✅ Deleted expired OTPs at ${new Date().toLocaleTimeString()}`
    );
  }
});

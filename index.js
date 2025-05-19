// sync_supabase_auth.mjs

import express from "express";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = 3001;

// Supabase configuration
const SUPABASE_URL = "https://ourueslizvuqlsxcbznb.supabase.co"; // replace
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cnVlc2xpenZ1cWxzeGNiem5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQ2MzQyNCwiZXhwIjoyMDQ2MDM5NDI0fQ.bXarnDkwxokZFW2nUTukDBwntPnQ2U99KPUJj2ALDic"; // replace
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Constants
const API_ENDPOINT = "http://localhost:8080/api/v1/users";
const DEFAULT_PASSWORD = "gemparerp@123";

function formatDOB(dob) {
  const date = new Date(dob);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  return `${dd}${mm}${yyyy}`;
}

app.get("/sync-users", async (req, res) => {
  try {
    const response = await fetch(API_ENDPOINT);
    const users = await response.json();

    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No users found in API response." });
    }

    const insertPayload = users.map((user) => {
      const dobFormatted = formatDOB(user.dob);
      const username = `gem${user.admno}${dobFormatted}`;
      return {
        username,
        password: DEFAULT_PASSWORD,
        admno: user.admno,
        phno: user.phoneNumber,
        role: "student",
      };
    });

    console.log("Users to insert:", insertPayload);

    const { data, error } = await supabase
      .from("s_auth") // <-- Replace if your table name is different
      .insert(insertPayload);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.json({
      success: true,
      inserted: data ? data.length : 0,
      message: "Users successfully inserted.",
    });
  } catch (err) {
    console.error("Server error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Sync service running on http://localhost:${PORT}/sync-users`);
});

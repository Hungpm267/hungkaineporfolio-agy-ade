// js/supabase-config.js
// Cấu hình thông tin kết nối Supabase của bạn ở đây.
// Sau khi deploy, bạn có thể thay thế bằng thông tin thật của dự án Supabase.

window.SUPABASE_URL = "https://ryqytldxocwbapovooto.supabase.co"; // Ví dụ: https://xxxx.supabase.co
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cXl0bGR4b2N3YmFwb3Zvb3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDE0NjgsImV4cCI6MjA5NzAxNzQ2OH0.6IqnD0oOxQpJI-1bTk7boEGTlcvtSuyz8_qBJqoOlqE"; // Ví dụ: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Khởi tạo Supabase Client
if (typeof supabase !== 'undefined') {
  // Tự động làm sạch URL nếu người dùng vô tình dán cả hậu tố /rest/v1
  const cleanUrl = window.SUPABASE_URL.replace(/\/rest\/v1\/?$/, "");
  window.supabaseClient = supabase.createClient(cleanUrl, window.SUPABASE_ANON_KEY);
} else {
  console.error("Supabase SDK is not loaded. Please make sure to include the Supabase CDN script in your HTML.");
}

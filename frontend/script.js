// Check if user is logged in
const user = localStorage.getItem("plantchamp_user");
if (!user) {
  window.location.href = "login.html";
} else {
  document.getElementById("welcomeText").innerText = `Welcome, ${user}! 🌿`;
}

// Handle image upload
document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = new FormData(document.getElementById('uploadForm'));
  form.append("username", user);  // attach username to upload
  form.append("length", document.querySelector('[name="length"]').value);  // manual plant length

  try {
    const res = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: form
    });

    const data = await res.json();

    if (res.ok) {
        const msg = `Uploaded! Your length: ${data.length} cm. Your rank: #${data.rank}`;
        localStorage.setItem("lastUploadMsg", msg);
        window.location.href = "leaderboard.html";
      }
      
  } catch (err) {
    document.getElementById('result').innerText = 'Upload failed.';
  }
};

// Optional: Logout button
function logout() {
  localStorage.removeItem("plantchamp_user");
  window.location.href = "login.html";
}

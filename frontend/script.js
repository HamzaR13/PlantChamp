const user = localStorage.getItem("plantchamp_user");
if (!user) {
  window.location.href = "login.html";
} else {
  document.getElementById("welcomeText").innerText = `Welcome, ${user}! 🌿`;
}

// Toggle form mode
function toggleMode(mode) {
    document.getElementById("uploadForm").style.display = mode === "manual" ? "block" : "none";
    document.getElementById("aiForm").style.display = mode === "ai" ? "block" : "none";
    document.getElementById("aiInstructions").style.display = mode === "ai" ? "block" : "none";
  
    document.getElementById("manualBtn").classList.toggle("active", mode === "manual");
    document.getElementById("aiBtn").classList.toggle("active", mode === "ai");
  }
  

// Manual Upload
document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = new FormData(document.getElementById('uploadForm'));
  form.append("username", user);

  try {
    const res = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: form
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("lastUploadMsg", `✅ Uploaded manually! Your rank: #${data.rank}`);
      window.location.href = "leaderboard.html";
    } else {
      document.getElementById('result').innerText = `Error: ${data.error}`;
    }
  } catch (err) {
    document.getElementById('result').innerText = 'Upload failed.';
  }
};

// AI Upload
document.getElementById('aiForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = new FormData(document.getElementById('aiForm'));
  form.append("username", user);

  try {
    const res = await fetch('http://127.0.0.1:5000/ai-upload', {
      method: 'POST',
      body: form
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("lastUploadMsg", `🤖 AI Upload Successful! Measured: ${data.length} cm | Rank: #${data.rank}`);
      window.location.href = "leaderboard.html";
    } else {
      document.getElementById('result').innerText = `AI Error: ${data.error}`;
    }
  } catch (err) {
    document.getElementById('result').innerText = 'AI Upload failed.';
  }
};

function logout() {
  localStorage.removeItem("plantchamp_user");
  window.location.href = "login.html";
}

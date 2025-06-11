document.getElementById('uploadForm').onsubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById('uploadForm'));
  
    try {
      const res = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: form
      });
  
      const data = await res.json();
  
      if (res.ok) {
        document.getElementById('result').innerText =
          `Uploaded! Your rank: #${data.rank}`;
      } else {
        document.getElementById('result').innerText = `Error: ${data.error}`;
      }
    } catch (err) {
      document.getElementById('result').innerText = 'Upload failed.';
    }
  };
  
/**
 * Potato Disease Detection - UI Logic
 * Features: Drag & Drop, Preview, Prediction, and Reset (Clear)
 */

// UI Element Selectors
const imageUpload = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");
const resultDiv = document.getElementById("result");
const dropZone = document.getElementById("dropZone");
const activeView = document.getElementById("activeView");
const predictBtn = document.getElementById("predictBtn");

// --- 1. Interaction Handlers ---

// Open file browser when clicking the drop zone
dropZone.addEventListener("click", () => imageUpload.click());

// Drag and Drop Visual Feedback
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#4ade80"; // Bright growth green
    dropZone.style.background = "rgba(74, 222, 128, 0.05)";
});

dropZone.addEventListener("dragleave", () => {
    resetDropZoneStyles();
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    resetDropZoneStyles();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        imageUpload.files = e.dataTransfer.files;
        handleFileSelection(e.dataTransfer.files[0]);
    }
});

// Standard file input change
imageUpload.addEventListener("change", () => {
    if (imageUpload.files && imageUpload.files[0]) {
        handleFileSelection(imageUpload.files[0]);
    }
});

// --- 2. Core Logic Functions ---

/**
 * Resets the drop zone UI back to default
 */
function resetDropZoneStyles() {
    dropZone.style.borderColor = "#e0e6dd";
    dropZone.style.background = "white";
}

/**
 * Validates image, displays preview, and swaps the UI view
 */
function handleFileSelection(file) {
    if (!file.type.startsWith('image/')) {
        alert("Please upload an image file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        // Set image source
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
        
        // UI Swap: Hide the big upload box, show the preview area
        dropZone.style.display = "none";
        activeView.style.display = "block";
        
        // Reset state for new analysis
        resultDiv.innerHTML = ""; 
        predictBtn.style.display = "block";
        predictBtn.innerText = "Analyze Image";
        predictBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

/**
 * Communicates with the Flask Backend for prediction
 */
function predict() {
    const file = imageUpload.files[0];
    if (!file) return;

    // Loading State
    predictBtn.innerText = "Analyzing Health...";
    predictBtn.disabled = true;

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData
    })
    .then(res => {
        if (!res.ok) throw new Error("Server not responding");
        return res.json();
    })
    .then(data => {
        // Hide predict button once we have a result
        predictBtn.style.display = "none";
        
        // Render stylized result card
        resultDiv.innerHTML = `
            <div style="padding: 20px; border-radius: 12px; background: white; border: 1px solid #e0e6dd; margin-top:20px; text-align: left; animation: fadeIn 0.3s ease;">
                <div style="font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 1.2px; font-weight: 600;">Diagnosis</div>
                <div style="font-size: 22px; color: #2d5a27; font-weight: 600; margin: 4px 0;">${data.class}</div>
                <div style="font-size: 14px; color: #475569;">AI Confidence: <b style="color: #1a1c19;">${data.confidence}%</b></div>
            </div>
        `;
    })
    .catch(error => {
        console.error("Error:", error);
        resultDiv.innerHTML = `<p style="color: #b91c1c; font-size: 14px; margin-top: 15px;">Analysis failed. Please check if your AI server is running.</p>`;
        predictBtn.innerText = "Try Again";
        predictBtn.disabled = false;
    });
}

/**
 * Resets the entire interface to the initial upload state
 */
function clearAll() {
    // Reset file input
    imageUpload.value = ""; 
    
    // Switch views back
    dropZone.style.display = "flex";
    activeView.style.display = "none";
    
    // Clear dynamic content
    resultDiv.innerHTML = "";
    previewImage.src = "";
    
    // Restore Predict button
    predictBtn.disabled = false;
    predictBtn.innerText = "Analyze Image";
}
#  Potato Disease Classification using Deep Learning

An AI-powered web application that detects **potato leaf diseases** using a **Convolutional Neural Network (CNN)** built with **TensorFlow/Keras** and deployed using **Flask** with a modern frontend.

---

## 📌 Project Overview

Potato crops are highly susceptible to diseases like **Early Blight** and **Late Blight**, which can severely reduce yield.  
This project uses **Deep Learning** to automatically classify potato leaf images into different disease categories, helping farmers and researchers with **early detection**.

---

## 🧠 Model Details

- Architecture: **Custom CNN**
- Framework: **TensorFlow & Keras**
- Input Image Size: **256 × 256**
- Classes:
  - 🟢 Healthy
  - 🟤 Early Blight
  - ⚫ Late Blight
- Loss Function: `SparseCategoricalCrossentropy`
- Optimizer: `Adam`

---

##  Web Application

The trained model is integrated into a **Flask backend** and connected to a **responsive frontend** that allows users to:

- Upload potato leaf images (drag & drop or click)
- Preview the image
- Get predicted disease class
- View confidence score

---

## 🖥️ Tech Stack

### 🔹 Backend
- Python
- Flask
- TensorFlow / Keras
- NumPy
- Pillow (PIL)

### 🔹 Frontend
- HTML
- CSS (Modern UI with gradients)
- JavaScript (Fetch API)

### 🔹 Tools
- VS Code
- Git & GitHub

---


---

## 🚀 How to Run Locally

### 1️. Clone the repository
```bash
git clone https://github.com/ShivamY123v/Potato_disease_classification_using_deep_learning.git
cd Potato_disease_classification_using_deep_learning
```

### 2️. Create virtual environment 
```bash
python -m venv venv
venv\Scripts\activate
```

### 3️. Install dependencies
```bash
pip install -r requirements.txt
```


### 4. Run the Flask app
```bash
python app.py
```


## 📸 Web App Screenshot

![Potato Disease App](Screenshot%20.png)






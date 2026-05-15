# MERN चॅट अ‍ॅप्लिकेशन

एक रिअल-टाइम चॅट अ‍ॅप्लिकेशन जे MERN स्टॅक (MongoDB, Express.js, React.js, Node.js) वापरून बनवले आहे. हे अ‍ॅप्लिकेशन Socket.io च्या सहाय्याने रिअल-टाइम संदेश पाठवण्याची सुविधा देते.

डेमो: https://fullstack-chat-app-0k0u.onrender.com

---

## प्रकल्पाची रचना

dummy-repo/
├── frontend/          # React.js फ्रंटएंड
│   ├── public/
│   └── src/
│       ├── components/    # UI कॉम्पोनंट्स
│       ├── pages/         # पृष्ठे
│       ├── context/       # React Context
│       └── App.js
├── backend/           # Node.js बॅकएंड
│   ├── controllers/   # API नियंत्रक
│   ├── models/        # MongoDB मॉडेल्स
│   ├── routes/        # API मार्ग
│   ├── middleware/    # मध्यवर्ती सॉफ्टवेअर
│   └── server.js
└── README.md

---

## आवश्यकता

- Node.js (v14 किंवा त्यापेक्षा जास्त)
- MongoDB (स्थानिक किंवा Atlas)
- npm किंवा yarn

---

## इन्स्टॉलेशन

### १. रेपॉझिटरी क्लोन करा

git clone https://github.com/krishna2700/dummy-repo.git
cd dummy-repo

### २. बॅकएंड सेटअप

cd backend
npm install

.env फाइल तयार करा आणि खालील माहिती भरा:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

### ३. फ्रंटएंड सेटअप

cd ../frontend
npm install

---

## वापर

### बॅकएंड सुरू करा

cd backend
npm start

सर्व्हर http://localhost:5000 वर चालेल.

### फ्रंटएंड सुरू करा

cd frontend
npm start

अ‍ॅप्लिकेशन http://localhost:3000 वर उघडेल.

---

## मुख्य वैशिष्ट्ये

- रिअल-टाइम चॅट — Socket.io च्या सहाय्याने तत्काळ संदेश
- वापरकर्ता प्रमाणीकरण — JWT वापरून सुरक्षित लॉगिन/साइनअप
- गट चॅट — अनेक वापरकर्त्यांसोबत चॅट करण्याची सुविधा
- वापरकर्ता शोध — इतर वापरकर्त्यांना सहज शोधा
- प्रतिसादात्मक डिझाइन — मोबाइल आणि डेस्कटॉप दोन्हींवर उत्तम दिसते
- टायपिंग इंडिकेटर — दुसरा वापरकर्ता टाइप करत असताना संकेत मिळतो

---

## API एंडपॉइंट्स

| मार्ग | पद्धत | वर्णन |
|-------|--------|--------|
| /api/user/register | POST | नवीन वापरकर्ता नोंदणी |
| /api/user/login | POST | वापरकर्ता लॉगिन |
| /api/user?search= | GET | वापरकर्ता शोधा |
| /api/chat | GET | सर्व चॅट्स मिळवा |
| /api/chat | POST | नवीन चॅट सुरू करा |
| /api/chat/group | POST | गट चॅट तयार करा |
| /api/message/:chatId | GET | संदेश मिळवा |
| /api/message | POST | संदेश पाठवा |

---

## तंत्रज्ञान

फ्रंटएंड:
- React.js
- Chakra UI
- Socket.io-client
- Axios

बॅकएंड:
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- JSON Web Token (JWT)
- bcrypt.js

---

## योगदान

१. रेपॉझिटरी फोर्क करा
२. नवीन शाखा तयार करा (git checkout -b feature/नवीन-वैशिष्ट्य)
३. बदल करा आणि कमिट करा (git commit -m 'नवीन वैशिष्ट्य जोडले')
४. शाखा पुश करा (git push origin feature/नवीन-वैशिष्ट्य)
५. Pull Request उघडा

---

## परवाना

हा प्रकल्प MIT परवान्या अंतर्गत उपलब्ध आहे.

---

## संपर्क

कोणत्याही प्रश्नांसाठी किंवा सूचनांसाठी, GitHub वर Issue उघडा.

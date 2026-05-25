# فل اسٹیک پروڈکٹ اسٹور

ایک مکمل فل اسٹیک MERN (MongoDB، Express، React، Node.js) پروڈکٹ اسٹور ایپلیکیشن جس میں مکمل CRUD فعالیت موجود ہے۔ پروڈکٹس کو MongoDB پر مبنی صاف REST API کے ذریعے بنایا، پڑھا، اپ ڈیٹ کیا اور حذف کیا جا سکتا ہے۔

## لائیو ڈیمو

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## ٹیکنالوجی اسٹیک

- **فرنٹ اینڈ:** React، Vite
- **بیک اینڈ:** Node.js، Express.js
- **ڈیٹابیس:** MongoDB (Mongoose ODM)
- **ڈیپلوئمنٹ:** Render.com

## پروجیکٹ کی ساخت

```
├── backend/
│   ├── config/       # ڈیٹابیس کنکشن
│   ├── controllers/  # روٹ لاجک
│   ├── models/       # Mongoose اسکیمے
│   ├── routes/       # API روٹس
│   └── server.js     # داخلی نقطہ
├── frontend/         # React ایپلیکیشن
└── package.json
```

## شروعات

### ضروریات

- Node.js v18 یا اس سے اوپر
- MongoDB Atlas اکاؤنٹ (یا مقامی MongoDB)

### انسٹالیشن

```bash
# ریپوزیٹری کلون کریں
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# انحصارات انسٹال کریں
npm install

# ماحولیاتی متغیرات ترتیب دیں
# روٹ میں .env فائل بنائیں اور درج ذیل شامل کریں:
# MONGO_URI=آپ کا_mongodb_کنکشن_سٹرنگ
# PORT=5000

# ڈویلپمنٹ موڈ میں چلائیں
npm run dev
```

## API اینڈ پوائنٹس

| طریقہ  | اینڈ پوائنٹ         | تفصیل                      |
|--------|---------------------|---------------------------|
| GET    | /api/products       | تمام پروڈکٹس حاصل کریں    |
| POST   | /api/products       | نئی پروڈکٹ بنائیں          |
| PUT    | /api/products/:id   | پروڈکٹ اپ ڈیٹ کریں         |
| DELETE | /api/products/:id   | پروڈکٹ حذف کریں            |

## لائسنس

MIT

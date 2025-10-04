# 🎨 ZipCart Frontend

The **ZipCart Frontend** is the user-facing Next.js application of the ZipCart grocery shopping platform. It provides a seamless experience for users to browse products, place orders, manage their address, and interact with their account. Admins or sellers can log in to manage products, update stock status, and view orders.

Built with Next.js, it’s optimized for performance, responsiveness, and smooth API integration.

🔗 **Live Demo**
[https://zip-cart-frontend.vercel.app/](https://zip-cart-frontend.vercel.app/)

📦 **Backend Repository**
For the backend part, please visit the ZipCart Backend repository: [https://github.com/Anirudh-Singh-26/ZipCart_Backend](https://github.com/Anirudh-Singh-26/ZipCart_Backend)

---

## 📦 Tech Stack

* Next.js
* Node.js + Express (Backend)
* MongoDB
* Axios for API calls
* JWT & Bcrypt for authentication
* Tailwind CSS for styling
* Cloudinary for image uploads

---

## 🌟 Features

✅ User Signup & Login with JWT-based authentication stored in HttpOnly cookies
✅ Admin/Seller login with role-based access
✅ Browse and search grocery products
✅ Add products to cart and place orders
✅ Manage multiple addresses
✅ Admin/Seller product management: list products, mark in-stock/out-of-stock
✅ View placed orders by users
✅ Responsive and accessible UI
✅ Integration with ZipCart Backend APIs
✅ Environment variable configuration for flexible API endpoints

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Anirudh-Singh-26/ZipCart_Frontend
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api-url
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-cloudinary-preset
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
```

4. **Run development server**

```bash
npm run dev
```

---

## 🚀 Production Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run start
```

---

## 📚 Usage

* Visit the signup page to create a new account
* Login as a user to browse products, add to cart, and place orders
* Login as admin/seller to manage products and view orders

---

## 👤 Author

Anirudh Singh Rathore
[GitHub Profile](https://github.com/Anirudh-Singh-26)

---

## 📄 License

MIT © Anirudh Singh Rathore

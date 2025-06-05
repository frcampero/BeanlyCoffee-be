# ☕ Beanly - Backend

This repository contains the backend for **Beanly**, a premium coffee eCommerce platform. It's built with **Strapi** and uses **PostgreSQL** as the database. This backend powers the storefront and admin panel, and integrates seamlessly with a Next.js frontend.

---

## 🚀 Tech Stack

- [Strapi](https://strapi.io/) (v4)
- PostgreSQL
- REST API (optionally GraphQL)
- Stripe (optional, for payments)

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/beanly-backend.git
cd beanly-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file and fill in your values:

```env
HOST=0.0.0.0
PORT=1337

APP_KEYS=key1,key2,key3
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
JWT_SECRET=...

DATABASE_CLIENT=postgres
DATABASE_NAME=beanly
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

4. Run the project in development mode:

```bash
npm run develop
```

---

## 📁 Content Structure

- **Products**: Includes images, description, price, type (`capsule`, `ground`, `whole bean`), origin, and taste.
- **Categories**: Custom categories like `Sweet`, `Citric`, etc.
- **Orders** (optional): Connected to Stripe for checkout and payment flow.

---

## 🖼️ Image Uploads

We use **Cloudinary** for image hosting. To enable it:

```bash
npm install @strapi/provider-upload-cloudinary
```

And configure the upload plugin accordingly in `config/plugins.js`.

---

## 🔐 Roles & Permissions

To allow frontend access:

1. Go to:  
   `Settings → Users & Permissions Plugin → Roles → Public`
2. Enable `find` and `findOne` for:
   - `product`
   - `category`

---

## 📤 Recommended Deployment

- Platforms: **Render**, **Railway**, or **Heroku**
- Use secure environment variables
- Connect to frontend hosted on **Vercel** or similar

---

## 🧑‍💻 Author

Developed by [Your Name or GitHub Username](https://github.com/your-username)

---

## 📄 License

This project is licensed under the Federico Campero License.

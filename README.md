# ⚡ Timesheet App – Setup (Vite + React + Tailwind)

## 1️⃣ Create Project (Vite)

```bash
npm create vite@latest timesheet-app
cd timesheet-app
npm install
```

👉 Select:

* Framework: **React**
* Variant: **JavaScript**

---

## 2️⃣ Install Dependencies

```bash
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 3️⃣ Configure Tailwind

### Update `tailwind.config.js`

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add in `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 4️⃣ Setup React Router

* Create pages: `Login.jsx`, `Dashboard.jsx`
* Configure routes in `App.jsx`

---

## 5️⃣ Run Project

```bash
npm run dev
```

App runs on: http://localhost:5173

---

## 6️⃣ Build Project

```bash
npm run build
```

---

## 7️⃣ Project Flow

* Login with dummy auth
* Store token in `sessionStorage`
* Redirect to `/dashboard`
* Protected routes
* Dashboard with timesheet table + modal

---

## 📌 Notes

* Uses Vite for fast development (HMR)
* Tailwind for styling
* No backend (dummy authentication)



### **📌 createform Frontend**  

This is the **frontend** for a **dynamic form builder** that allows users to create and manage forms with various question types, including:  

✅ Short Text  
✅ Long Text  
✅ Fill in the Gap  
✅ Number  
✅ Multiple Choice
✅ Boolean question  

**Upcoming Features:**  
- 🖼️ Image uploads  
- 🎵 Audio & Video support  
- 📄 PDF submission  
- 🔘 More question types  

## **🚀 Tech Stack**  

- **React** – Component-based UI  
- **Material-UI** – UI components  
- **Styled Components** – Custom styling  
- **Redux Toolkit** – State management  

## **💻 Getting Started**  

### **1️⃣ Clone the Repository**  
```sh
git clone [createform](https://github.com/fakoredeDamilola/createform)
cd createform
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Start Development Server**  
```sh
npm run dev
```

## **⚙️ Environment Variables**  
Create a **.env** file in the root directory and configure:  
```sh
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_CLIENT_SECRET=
VITE_API_BASE_URL="http://localhost:3333"
```

## **📦 Project Structure**  
```
📂 src
 ┣ 📂 components    # Reusable UI components
 ┣ 📂 pages         # Main pages of the app
 ┣ 📂 store         # Redux state management
 ┣ 📂 styles        # Styled-components global styles
 ┣ 📂 utils         # Helper functions
 ┣ App.tsx         # Main app component
 ┗ index.tsx       # Entry point
```

## **🔗 API Connection**  
The frontend interacts with the **NestJS + MongoDB backend** to handle form creation, updates, and submissions.  

## **🎨 UI Customization**  
The project uses **Material-UI** for prebuilt components and **Styled Components** for custom styling. You can easily modify themes in `styles/theme.ts`.  

## **🤝 Contributing**  
1. Fork the repo  
2. Create a new branch (`git checkout -b feature/new-feature`)  
3. Commit changes (`git commit -m "Added new feature"`)  
4. Push (`git push origin feature/new-feature`)  
5. Open a Pull Request  

---

🚀 **Happy Coding!** Let me know if you need modifications! 🎯

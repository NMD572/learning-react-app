import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode: chạy toàn bộ component trong chế độ nghiêm ngặt
  // để phát hiện các vấn đề tiềm ẩn trong code, như việc sử dụng
  // các phương thức lifecycle không an toàn, hoặc các side effects không mong muốn.
  // Nó sẽ gọi lại các hàm render hai lần trong quá trình phát triển,
  // giúp phát hiện các vấn đề liên quan đến state và lifecycle.
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

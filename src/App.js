import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useMemo, useCallback, memo } from "react";

const Button = memo(({ onClick, children }) => {
  console.log("Button rendered");
  return <button onClick={onClick}>{children}</button>;
});

// Start: useMemo
function ExpensiveCalculation({ num }) {
  // const [num, setNum] = useState(0);

  const computedResult = useMemo(() => {
    console.log("Calculating expensive result (useMemo)...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      // Một phép tính rất tốn kém
      result += i;
    }
    return result + num;
  }, [num]); // Phép tính chỉ chạy lại khi 'num' thay đổi

  return (
    // <div>
    //   <p>Number: {num}</p>
    //   <button onClick={() => setNum(num + 1)}>Increment Number</button>
    <p>Expensive Result: {computedResult}</p>
    // </div>
  );
}
// End: useMemo

function App() {
  // Start: useState
  const [count, setCount] = useState(0); // Khởi tạo count = 0
  // End: useState

  // Start: useEffect
  useEffect(() => {
    // Effect: Cập nhật tiêu đề trang
    document.title = `You clicked ${count} times`;

    // Cleanup: Chạy khi component unmount hoặc effect chạy lại
    return () => {
      console.log("Cleanup for count:", count);
    };
  }, [count]); // Effect này sẽ chạy lại mỗi khi 'count' thay đổi
  // End: useEffect

  // Start: useCallback
  const [currentValue, setCurrentValue] = useState(0);
  const [anotherState, setAnotherState] = useState(0);

  // Hàm handleIncrement sẽ chỉ được tạo 1 lần vì không gán dependency nào
  const handleIncrement = useCallback(() => {
    setCurrentValue((prevCount) => prevCount + 1);
  }, []); // Dependency rỗng, hàm này chỉ được tạo một lần

  // Hàm handleAnotherAction sẽ được tạo lại mỗi khi 'anotherState' thay đổi
  const handleAnotherAction = useCallback(() => {
    setAnotherState((prev) => prev + 10);
  }, [anotherState]);
  // End: useCallback

  return (
    <div>
      <div className="spilit-hook-function">
        <p>
          useState: Cung cấp state (trạng thái) cho function component. State là
          dữ liệu mà khi thay đổi, sẽ làm cho component render lại (cập nhật
          giao diện). useState sẽ update function component hiện tại và các
          function component con được viết bên trong nó.
        </p>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Update by useState</button>
      </div>
      <div className="spilit-hook-function">
        <p>
          useEffect: Thực hiện các "side effects" (tác dụng phụ) trong function
          component. Side effects là những hành động không trực tiếp liên quan
          đến việc render UI nhưng cần phải xảy ra. Ví dụ:<br></br>- Gọi API để
          lấy dữ liệu.<br></br> - Thao tác trực tiếp với DOM (ví dụ: thay đổi
          tiêu đề trang).<br></br>- Thiết lập và dọn dẹp các subscription (đăng
          ký lắng nghe sự kiện).<br></br> - Thiết lập timers (setTimeout,
          setInterval).<br></br>
        </p>
      </div>
      <div className="spilit-hook-function">
        <p>
          useMemo: Tối ưu hóa hiệu suất bằng cách ghi nhớ (memoize) kết quả của
          một phép tính tốn kém. Nó sẽ chỉ tính toán lại giá trị đó khi các
          dependencies của nó thay đổi.
        </p>
        <ExpensiveCalculation num={count} /> {/* Truyền count làm prop */}
      </div>
      <div className="spilit-hook-function">
        <p>
          useCallback: Tối ưu hóa hiệu suất bằng cách ghi nhớ (memoize) một hàm
          callback. Nó trả về một phiên bản memoized của hàm đó chỉ thay đổi khi
          một trong các dependencies của nó thay đổi. Điều này đặc biệt hữu ích
          khi truyền các hàm xuống component con để ngăn chặn việc re-render
          không cần thiết của component con (ví dụ: với React.memo).
        </p>
        <p>Current value: {currentValue}</p>
        <p>Another State: {anotherState}</p>
        <Button onClick={handleIncrement}>Increment Current Value</Button>
        <Button onClick={handleAnotherAction}>Increment Another State</Button>
        <button onClick={() => console.log("Parent re-rendered")}>
          Parent re-render trigger
        </button>
      </div>
    </div>
  );
}

export default App;

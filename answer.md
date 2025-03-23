1. useCallback ใช้ทําอะไร

Ans: useCallback ใช้เพื่อป้องกันไม่ให้ function สร้างใหม่ทุกครั้งที่ Component render ซึ่งสำคัญใน 2 กรณี

1. เมื่อส่งฟังก์ชันไปที่ component (เพื่อป้องกันไม่ให้มีการ re-render อีก)
2. เมื่อฟังก์ชันนั้นถูกใช้เป็น dependency array อย่างเช่นของ useEffect ป้องกันไม่ให้เกิด infinity loop

import "./FormComponent.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FormComponent = (props) => {
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState(0);
  const [formValid, setFormValid] = useState(false);

  const inputTransaction = (event) => {
    setTransaction(event.target.value);
  };

  const inputAmount = (event) => {
    setAmount(event.target.value);
  };

  const saveEntry = (event) => {
    event.preventDefault();

    const entryData = {
      id: uuidv4(),
      transaction: transaction,
      amount: Number(amount),
    };

    props.onAddNewEntry(entryData);

    setTransaction("");
    setAmount(0);
  };

  useEffect(() => {
    const inputCondition =
      transaction.trim().length > 0 && Math.abs(amount) > 0;
    setFormValid(inputCondition);
  }, [transaction, amount]);

  return (
    <div>
      <form onSubmit={saveEntry}>
        <div className="form-control">
          <label htmlFor="transaction">ชื่อรายการ</label>
          <input
            id="transaction"
            type="text"
            placeholder="ระบุรายการ"
            onChange={inputTransaction}
            value={transaction}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">จำนวนเงิน</label>
          <input
            id="amount"
            type="number"
            placeholder="(+ รายรับ, - รายจ่าย)"
            onChange={inputAmount}
            value={amount}
          />
        </div>
        <div>
          <button type="submit" className="submitBtn" disabled={!formValid}>
            เพิ่มข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;

import "./App.css";
import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import ReportComponent from "./components/ReportComponent";


import { useState, useEffect } from "react";
import DataContext from "./data/DataContext";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link } from "react-router-dom";

function App() {
  const design = { color: "#99BC85", textAlign: "center" };

  const initialEntry = [
    { id: 1, transaction: "ค่ารักษาพยาบาล", amount: -5000 },
    { id: 2, transaction: "เงินเดือน", amount: 15000 },
    { id: 3, transaction: "ค่าเดินทาง", amount: -500 },
  ];
  const [entries, setEntries] = useState(initialEntry);

  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewEntry = (newEntry) => {
    setEntries((prevEntry) => {
      return [newEntry, ...prevEntry];
    });
  };

  useEffect(() => {
    const amounts = entries.map((element) => element.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => total + element, 0);
    const expense =
      -1 *
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => total + element, 0);
    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [entries, reportIncome, reportExpense]);


  return (<DataContext.Provider value={{income: reportIncome, expense: reportExpense}}>
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ-รายจ่าย</h1>
 
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent />}></Route>
              <Route path="/insert" element={
                <>
                  <FormComponent onAddNewEntry={onAddNewEntry} />                
                  <Transaction entries={entries} />
                </>
              }></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;

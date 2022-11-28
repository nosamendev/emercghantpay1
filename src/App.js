import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from './Transactions/Transactions';
import TransactionDetails from './Transactions/TransactionDetails/TransactionDetails';

function App() {

  return (
    <BrowserRouter>
      <Routes>              
        <Route path="/" element={<Transactions />} />        
        <Route path="/transactions/:id" element=<TransactionDetails /> />  
        <Route path="*" element={<p>404 - File not found</p>}/>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

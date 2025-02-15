import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";

import './App.css';
import Data from './components/Tree/Tree';
import TaskList from './components/GetTask/TaskList';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Data />} />
      <Route path="/task" element={<TaskList />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;


import './App.css';
import Form from './components/Form';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;

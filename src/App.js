
import './App.css';
import Form from './components/Form';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Sent from './components/Sent';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="form" element={<Form />} />
          <Route path="sent" element={<Sent />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { Welcome } from './pages/Welcome';
import { Installing } from './pages/Installing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="installing" element={<Installing />} />
    </Routes>
  );
}

export default App;

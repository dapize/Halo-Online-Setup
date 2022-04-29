import { Routes, Route } from "react-router-dom";
import { Welcome } from './pages/Welcome';
import { Installing } from './pages/Installing';
import { Result } from './pages/Result';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Result />} />
      <Route path="installing" element={<Installing />} />
      <Route path="result" element={<Result />} />
    </Routes>
  );
}

export default App;

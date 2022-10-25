import { Navigate, Route, Routes } from 'react-router-dom';
import Projects from './pages/Projects';
import YourProjects from './pages/YourProjects';
import './minty.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/projects'} />} />
      <Route path="/projects" element={<Projects />}>
        <Route index element={<YourProjects />} />
      </Route>
    </Routes>
  );
};

export default App;

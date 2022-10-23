import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewProject from './pages/NewProject';
import Projects from './pages/Projects';
import YourProjects from './pages/YourProjects';
import './superhero.css'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to={'/projects'} />} />
        <Route path='/projects' element={<Projects />}>
          <Route index element={<YourProjects />} />
          <Route path='new' element={<NewProject />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

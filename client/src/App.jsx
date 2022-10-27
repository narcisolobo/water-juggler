import './minty.css';
import { useContext } from 'react';
import Projects from './pages/Projects';
import { Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/NavbarMenu';
import ProjectsHome from './pages/ProjectsHome';
import YourProjects from './pages/YourProjects';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavbarMenu />
      <Routes>
        <Route path="/" element={<ProjectsHome />} />
        <Route path="/projects" element={user ? <Projects /> : <ProjectsHome />}>
          <Route index element={<YourProjects />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

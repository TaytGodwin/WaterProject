import './App.css';
import CartSummary from './components/CartSummary';
import { CartProvider } from './context/CartContext';
import AdminProjectsPage from './pages/AdminProjectsPage';
import CartPage from './pages/CartPage';
import DonatePage from './pages/DonatePage';
import ProjectsPage from './pages/ProjectsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // router enables routing, routes hold defintions, route is a specific route

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <CartSummary />
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            {/*Default route*/}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/donate/:projectName/:projectId"
              element={<DonatePage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminprojects" element={<AdminProjectsPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;

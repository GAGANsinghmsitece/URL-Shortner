import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter, useParams } from "react-router-dom"
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ShortedUrl from './pages/ShortedURL/ShortedURL';
import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './helpers/routes';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoutes.Signup}
            element={
              <ProtectedRoute
                redirectOnToken={true}>
                <SignUp />
              </ProtectedRoute>}
          />
          <Route
            path={AppRoutes.Dashboard}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          <Route
            path={AppRoutes.Login}
            element={
              <ProtectedRoute
                redirectOnToken={true}>
                <Login />
              </ProtectedRoute>
            } />
          <Route
            path={`${AppRoutes.URL}:hash`}
            element={<ShortedUrl />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;

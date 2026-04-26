import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/GlobalComponents/Navbar'
import Footer from './components/GlobalComponents/footer'
import Landing from './pages/Landing'
import {Login} from './pages/Login'
import DashInstructor from './pages/DashboardInstructor'
import DashAdmin from './pages/DashboardAdmin';
import DashTutor from './pages/DashboardTutor';
import GameView from './pages/Game';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { ExtraInfo } from './pages/ExtraInfo';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Landing/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path='/dash-admin' element = {
            <ProtectedRoute>
              <DashAdmin/>
            </ProtectedRoute>
          }/>
          <Route path='/dash-instructor' element = {
            <ProtectedRoute>
              <DashInstructor/>
            </ProtectedRoute>
            }/>
          <Route path='/dash-tutor' element = {
            <ProtectedRoute>
              <DashTutor/>
            </ProtectedRoute>
            }/>
          <Route path='/juego' element = {<GameView/>}/>
          <Route path='/register' element = {<RegisterPage/>}/>
          <Route path='/waiting-list' element = {<ExtraInfo message={`Tu solicitud está en revisión por un administrador. En breve se habilitará tu acceso`}/>}/>
          <Route path='*' element = {<ExtraInfo message='Lo sentimos, no hemos encontrado lo que buscas' errorCode='404'/>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/GlobalComponents/Navbar'
import Footer from './components/GlobalComponents/footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import DashInstructor from './pages/DashboardInstructor'
// import DashAdmin from './pages/DashboardAdmin';
// import DashTutor from './pages/DashboardTutor';
import GameView from './pages/Game';

function App() {
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Landing/>}/>
        <Route path="/login" element = {<Login/>}/>
        {/* <Route path='/dash-admin' element = {<DashAdmin/>}/> */}
        <Route path='/dash-admin' element = {<DashInstructor/>}/>
        <Route path='/dash-instructor' element = {<DashInstructor/>}/>
        {/* <Route path='/dash-tutor' element = {<DashTutor/>}/> */}
        <Route path='/dash-tutor' element = {<DashInstructor/>}/>
        <Route path='/juego' element = {<GameView/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App

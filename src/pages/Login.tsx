import { useState } from 'react';
import './LoginNIDE.css';
import logo from '../assets/LOGO-NIDE.png';
// solo para pruebas
import { useNavigate } from 'react-router-dom';

const LoginNIDE = () => {
  const [role, setRole] = useState('Alumno');
  const roles = ['Administrador', 'Instructor', 'Tutor', 'Alumno'];
  const routes = [
    { path: "/dash-admin", rol: "Administrador" },
    { path: "/dash-instructor", rol: "Instructor" },
    { path: "/dash-tutor", rol: "Tutor" },
    { path: "/juego", rol: "Alumno"}
];
const go = useNavigate();

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <section className="image-nide">
          <img src={logo} alt="NIDE" />
        </section>

        <section className="form-side">
          <div className="role-selector">
            {roles.map((r) => (
              <button 
                key={r}
                className={role === r ? 'role-btn active' : 'role-btn'}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="login-card">
            <h2>Iniciar Sesión <span className="role-subtitle">({role})</span></h2>
            <form>
              <div className="input-group">
                <div className="label-container">
                  <label htmlFor="email">Email</label>
                  <span className="required-tag">Obligatorio</span>
                </div>
                <input id="email" type="email" placeholder="hola@nide.com"  />
              </div>

              <div className="input-group">
                <div className="label-container">
                  <label htmlFor="password">Contraseña</label>
                  <span className="required-tag">Obligatorio</span>
                </div>
                <input id="password" type="password" placeholder="Contraseña"  />
              </div>

              <button type="submit" className="submit-btn" onClick={() => {
                go(routes.filter(item => item.rol==role)[0].path)
              }}>
                Continuar como {role}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginNIDE;
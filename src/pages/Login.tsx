import { useState } from 'react';
import './LoginNIDE.css';
import logo from '../assets/LOGO-NIDE.png';
import { useNavigate } from 'react-router-dom';

const LoginNIDE = () => {
  const [role, setRole] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const roles = ['Administrador', 'Instructor', 'Tutor', 'Estudiante'];
  
  const routes = [
    { path: "/dash-admin", rol: "Administrador" },
    { path: "/dash-instructor", rol: "Instructor" },
    { path: "/dash-tutor", rol: "Tutor" },
    { path: "/juego", rol: "Estudiante"}
  ];

  const go = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError("Por favor, selecciona un rol");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_LOGIN_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          nombreRol: role 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        const targetPath = routes.find(item => item.rol === role)?.path;

        if (targetPath) {
            go(targetPath);
        } else {
            console.error("No se encontró una ruta para el rol:", role);
        }
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };
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
                type="button" 
                className={role === r ? 'role-btn active' : 'role-btn'}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="login-card">
            <h2>Iniciar Sesión {role && <span className="role-subtitle">({role})</span>}</h2>
            
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <div className="label-container">
                  <label htmlFor="email">Email</label>
                  <span className="required-tag">Obligatorio</span>
                </div>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="ejemplo@nide.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="input-group">
                <div className="label-container">
                  <label htmlFor="password">Contraseña</label>
                  <span className="required-tag">Obligatorio</span>
                </div>
                <input 
                  id="password" 
                  type="password" 
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={!role} 
                style={{ opacity: !role ? 0.6 : 1, cursor: !role ? 'not-allowed' : 'pointer' }}
              >
                {role ? `Continuar como ${role}` : 'Selecciona un rol arriba'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginNIDE;
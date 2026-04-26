import './LoginNIDE.css';
import logo from '../assets/LOGO-NIDE.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface LoginInputs {
  role: string;
  email: string;
  password: string;
}

const roles = ['Administrador', 'Instructor', 'Tutor', 'Estudiante'];

const routes = [
  { path: "/dash-admin", rol: "Administrador" },
  { path: "/dash-instructor", rol: "Instructor" },
  { path: "/dash-tutor", rol: "Tutor" },
  { path: "/juego", rol: "Estudiante"}
];
const registerRoute = '/register';

export const Login = () => {
  const { login } = useAuth();
  const go = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,  
    watch,     
    setError,  
    formState: { errors, isSubmitting }
  } = useForm<LoginInputs>({
    defaultValues: { role: '', email: '', password: '' }
  });

  const currentRole = watch('role');
  const isStudent = currentRole === 'Estudiante';

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    
    if (data.role === 'Estudiante') {
      const studentRoute = routes.find(item => item.rol === 'Estudiante')?.path || '/juego';
      go(studentRoute);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password, nombreRol: data.role }),
      });

      const responseData = await response.json();

      if (response.ok) {
        login(responseData.id);
        const targetPath = routes.find(item => item.rol === data.role)?.path;
        if (targetPath) {
            go(targetPath);
        } else {
            console.error("No se encontró una ruta para el rol:", data.role);
        }
      } else {
        setError('root', { message: responseData.error || "Credenciales incorrectas" });
      }
    } catch (err) {
      setError('root', { message: "Error de conexión con el servidor" });
    }
  };

  return (
    <div className="login-page-wrapper">
      <section className="image-nide">
        <img src={logo} alt="NIDE" />
      </section>

      <div className='overlay'>
        <div className="login-container">
          <section className="form">
            <div className="role-selector">
              <input type="hidden" {...register('role', { required: 'Por favor, selecciona un rol' })} />
              {roles.map((r) => (
                <button 
                  key={r}
                  type="button" 
                  className={currentRole === r ? 'role-btn active' : 'role-btn'}
                  onClick={() => setValue('role', r, { shouldValidate: true })}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="login-card">
              <h2>Iniciar Sesión {currentRole && <span className="role-subtitle">({currentRole})</span>}</h2>
              
              {(errors.root || errors.role) && (
                <p className="error-message">
                  {errors.root?.message || errors.role?.message}
                </p>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                  <div className="label-container">
                    <label htmlFor="email">Email</label>
                    {!isStudent && <span className="required-tag">Obligatorio</span>}
                  </div>
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="ejemplo@nide.com"
                    disabled={isStudent}
                    style={{ backgroundColor: isStudent ? '#f3f4f6' : 'white', cursor: isStudent ? 'not-allowed' : 'text' }}
                    {...register("email", { 
                      required: isStudent ? false : "El email es obligatorio",
                      pattern: isStudent ? undefined : { value: /\S+@\S+\.\S+/, message: "Formato de correo inválido" }
                    })}
                  />
                  {errors.email && <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.email.message}</span>}
                </div>

                <div className="input-group">
                  <div className="label-container">
                    <label htmlFor="password">Contraseña</label>
                    {!isStudent && <span className="required-tag">Obligatorio</span>}
                  </div>
                  <input 
                    id="password" 
                    type="password" 
                    placeholder="Tu contraseña"
                    disabled={isStudent}
                    style={{ backgroundColor: isStudent ? '#f3f4f6' : 'white', cursor: isStudent ? 'not-allowed' : 'text' }}
                    {...register("password", { 
                      required: isStudent ? false : "La contraseña es obligatoria" 
                    })}
                  />
                  {errors.password && <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.password.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={!currentRole || isSubmitting} 
                  style={{ 
                    opacity: (!currentRole || isSubmitting) ? 0.6 : 1, 
                    cursor: (!currentRole || isSubmitting) ? 'not-allowed' : 'pointer',
                    backgroundColor: isStudent ? '#10b981' : '#1a1a1a' 
                  }}
                >
                  {isSubmitting 
                    ? 'Cargando...' 
                    : isStudent 
                      ? 'Entrar a Jugar' 
                      : currentRole 
                        ? `Continuar como ${currentRole}` 
                        : 'Selecciona un rol'}
                </button>
              </form>
            </div>
            <p className='registerBtn' onClick={ () => go(registerRoute)}>
              Registrarme
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

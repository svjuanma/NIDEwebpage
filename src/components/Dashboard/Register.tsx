import style from './Register.module.css'; 
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';


interface Props {
  allowStudent?: boolean,
  onClose?: () => void,
  setUntracked?: ()=>void;
}

interface RegisterInputs {
  nombreRol: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento?: string | null;
  genero?: string;
  correo?: string | null;
  contrasena: string;
}

const rolesBase = ['Administrador', 'Instructor', 'Tutor'];

export const Register = ({ allowStudent = false, onClose, setUntracked }: Props) => {
  const go = useNavigate();
  const { userId } = useAuth(); 
  const endpoint = allowStudent ? '/dash/tutor/crearEstudiante' : '/register';
  const rolesDisponibles = allowStudent ? ['Estudiante'] : rolesBase;

  const {
    register,
    handleSubmit,
    setValue,  
    watch,     
    setError,  
    formState: { errors, isSubmitting }
  } = useForm<RegisterInputs>({
    defaultValues: { 
      nombreRol: allowStudent ? rolesDisponibles[0] : '', 
      nombre: '', 
      apellido: '', 
      fecha_nacimiento: '', 
      genero: '', 
      correo: '', 
      contrasena: '' 
    }
  });

  const currentRole = watch('nombreRol');
  const isStudent = currentRole === 'Estudiante';

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const payload = {
        nombre: data.nombre,
        apellido: data.apellido,
        contrasena: data.contrasena,
        nombreRol: data.nombreRol,
        genero: data.genero === "" ? 'Indefinido' : data.genero,
        fecha_nacimiento: isStudent ? data.fecha_nacimiento : (data.fecha_nacimiento === "" ? null : data.fecha_nacimiento),
        correo: isStudent ? null : data.correo,
      };

      const finalPayload = allowStudent ? {...payload, id_tutor: userId} : payload;

      const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });
      
      if(!response.ok) throw new Error("Failed to send the register information");
      else {
        setUntracked?.();
        if(!allowStudent) go('/waiting-list');
        else onClose?.();
      }

    } catch (err) {
      setError('root', { message: "Error de conexión con el servidor" });
    }
  };

  return (
    <div className={style.overlay} onClick={() => {
      if(allowStudent) onClose?.();
    }}>
      <div className={style.registerContainer} onClick={(e) => e.stopPropagation()}>
        <section className={style.form}> 
          
          <div className={style.roleSelector}>
            <input type="hidden" {...register('nombreRol', { required: 'Por favor, selecciona un rol' })} />
            {rolesDisponibles.map((r) => (
              <button 
                key={r}
                type="button" 
                className={currentRole === r ? `${style.roleBtn} ${style.active}` : style.roleBtn}
                onClick={() => setValue('nombreRol', r, { shouldValidate: true })}
              >
                {r}
              </button>
            ))}
          </div>

          <div className={style.registerCard} style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '10px' }}>
            <h2>Crear Cuenta {currentRole && <span className={style.roleSubtitle}>({currentRole})</span>}</h2>
            {currentRole === 'Tutor' && (
              <p className={style.infoText}>La creación de cuentas de estudiantes solo se puede hacer una vez que tu solicitud sea aceptada e inicies sesión.</p>
            )}
            
            {(errors.root || errors.nombreRol) && (
              <p className={style.errorMessage}>
                {errors.root?.message || errors.nombreRol?.message}
              </p>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              
              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="nombre">Nombre</label>
                  <span className={style.requiredTagWarning}>Obligatorio</span>
                </div>
                <input 
                  id="nombre" 
                  type="text" 
                  placeholder={`Escribe ${allowStudent? 'el nombre del estudiante':'tu nombre'}`}
                  className={style.inputField}
                  {...register("nombre",{ required: "El nombre es obligatorio" })}
                />
                {errors.nombre && <span className={style.inputError}>{errors.nombre.message}</span>}
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="apellido">Apellido</label>
                  <span className={style.requiredTagWarning}>Obligatorio</span>
                </div>
                <input 
                  id="apellido" 
                  type="text" 
                  placeholder={`Escribe ${allowStudent? 'el apellido del estudiante':'tu apellido'}`}
                  className={style.inputField}
                  {...register("apellido", { required: "El apellido es obligatorio" })}
                />
                {errors.apellido && <span className={style.inputError}>{errors.apellido.message}</span>}
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                  <span className={isStudent ? style.requiredTagWarning : style.requiredTag}>
                    {isStudent ? 'Obligatorio' : 'Opcional'}
                  </span>
                </div>
                <input 
                  id="fecha_nacimiento" 
                  type="date" 
                  className={style.inputField}
                  {...register("fecha_nacimiento", { required: isStudent ? "La fecha de nacimiento es obligatoria" : false })}
                />
                {errors.fecha_nacimiento && <span className={style.inputError}>{errors.fecha_nacimiento.message}</span>}
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="genero">Género</label>
                  <span className={style.requiredTag}>Opcional</span>
                </div>
                <select 
                  id="genero"
                  className={style.inputField}
                  {...register("genero")}
                >
                  <option value="" hidden>Selecciona una opción</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Indefinido">Indefinido</option>
                </select>
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="correo">Email</label>
                  {!isStudent && <span className={style.requiredTagWarning}>Obligatorio</span>}
                </div>
                <input 
                  id="correo" 
                  type="email" 
                  placeholder="ejemplo@nide.com"
                  className={style.inputField}
                  disabled={isStudent}
                  style={{ backgroundColor: isStudent ? '#f3f4f6' : 'white', cursor: isStudent ? 'not-allowed' : 'text' }}
                  {...register("correo", { 
                    required: isStudent ? false : "El email es obligatorio",
                    pattern: isStudent ? undefined : { value: /\S+@\S+\.\S+/, message: "Formato de correo inválido" }
                  })}
                />
                {errors.correo && <span className={style.inputError}>{errors.correo.message}</span>}
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="contrasena">Contraseña</label>
                  <span className={style.requiredTagWarning}>Obligatorio</span>
                </div>
                <input 
                  id="contrasena" 
                  type="password" 
                  placeholder="Crea una contraseña"
                  className={style.inputField}
                  {...register("contrasena", { 
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "Debe tener al menos 6 caracteres" }
                  })}
                />
                {errors.contrasena && <span className={style.inputError}>{errors.contrasena.message}</span>}
              </div>

              <button 
                type="submit" 
                className={style.submitBtn}
                disabled={!currentRole || isSubmitting} 
                style={{ 
                  opacity: (!currentRole || isSubmitting) ? 0.6 : 1, 
                  cursor: (!currentRole || isSubmitting) ? 'not-allowed' : 'pointer',
                  marginTop: '20px',
                  backgroundColor: isStudent ? '#10b981' : '#1a1a1a' 
                }}
              >
                {isSubmitting 
                  ? 'Creando cuenta...' 
                  : currentRole 
                      ? `Registrar ${currentRole}` 
                      : 'Selecciona un rol'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
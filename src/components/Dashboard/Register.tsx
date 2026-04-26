import style from './Register.module.css'; 
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

interface Props {
  allowStudent?: boolean,
  onClose?: () => void,
}

interface RegisterInputs {
  role: string;
  name: string;
  lastname: string;
  dateBirth?: string | null;
  gender?: string;
  email?: string | null;
  password: string;
}

const baseRoles = ['Administrador', 'Instructor', 'Tutor'];

export const Register = ({ allowStudent = false, onClose }: Props) => {
  const go = useNavigate();
  const { userId } = useAuth(); 

  const availableRoles = allowStudent ? [...baseRoles, 'Estudiante'] : baseRoles;

  const {
    register,
    handleSubmit,
    setValue,  
    watch,     
    setError,  
    formState: { errors, isSubmitting }
  } = useForm<RegisterInputs>({
    defaultValues: { 
      role: '', 
      name: '', 
      lastname: '', 
      dateBirth: '', 
      gender: '', 
      email: '', 
      password: '' 
    }
  });

  const currentRole = watch('role');
  const isStudent = currentRole === 'Estudiante';

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const finalPayload = {
        name: data.name,
        lastname: data.lastname,
        password: data.password,
        role: data.role,
        gender: data.gender === "" ? 'Indefinido' : data.gender,
        
        dateBirth: isStudent ? data.dateBirth : (data.dateBirth === "" ? null : data.dateBirth),
        email: isStudent ? null : data.email,
        id_tutor: isStudent ? userId : null 
      };

      console.log("Enviando a API:", finalPayload); 

      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });
      
      if(!response.ok) throw new Error("Failed to send the register information");
      else {
        if(!allowStudent) go('/waiting-list');
        else onClose?.();
      }

    } catch (err) {
      setError('root', { message: "Error de conexión con el servidor" });
    }
  };

  return (
    <div className={style.overlay}>
      <div className={style.registerContainer}>
        <section className={style.form}> 
          
          <div className={style.roleSelector}>
            <input type="hidden" {...register('role', { required: 'Por favor, selecciona un rol' })} />
            {availableRoles.map((r) => (
              <button 
                key={r}
                type="button" 
                className={currentRole === r ? `${style.roleBtn} ${style.active}` : style.roleBtn}
                onClick={() => setValue('role', r, { shouldValidate: true })}
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
            
            {(errors.root || errors.role) && (
              <p className={style.errorMessage}>
                {errors.root?.message || errors.role?.message}
              </p>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              
              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="name">Nombre</label>
                  <span className={style.requiredTagWarning}>Obligatorio</span>
                </div>
                <input 
                  id="name" 
                  type="text" 
                  placeholder="Escribe tu nombre"
                  className={style.inputField}
                  {...register("name",{ required: "El nombre es obligatorio" })}
                />
                {errors.name && <span className={style.inputError}>{errors.name.message}</span>}
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="lastname">Apellido</label>
                  <span className={style.requiredTagWarning}>Obligatorio</span>
                </div>
                <input 
                  id="lastname" 
                  type="text" 
                  placeholder="Escribe tu apellido"
                  className={style.inputField}
                  {...register("lastname", { required: "El apellido es obligatorio" })}
                />
                {errors.lastname && <span className={style.inputError}>{errors.lastname.message}</span>}
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="dateBirth">Fecha de Nacimiento</label>
                  <span className={isStudent ? style.requiredTagWarning : style.requiredTag}>
                    {isStudent ? 'Obligatorio' : 'Opcional'}
                  </span>
                </div>
                <input 
                  id="dateBirth" 
                  type="date" 
                  className={style.inputField}
                  {...register("dateBirth", { required: isStudent ? "La fecha de nacimiento es obligatoria" : false })}
                />
                {errors.dateBirth && <span className={style.inputError}>{errors.dateBirth.message}</span>}
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="gender">Género</label>
                  <span className={style.requiredTag}>Opcional</span>
                </div>
                <select 
                  id="gender"
                  className={style.inputField}
                  {...register("gender")}
                >
                  <option value="" hidden>Selecciona una opción</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Indefinido">Indefinido</option>
                </select>
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="email">Email</label>
                  {!isStudent && <span className={style.requiredTagWarning}>Obligatorio</span>}
                </div>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="ejemplo@nide.com"
                  className={style.inputField}
                  disabled={isStudent}
                  style={{ backgroundColor: isStudent ? '#f3f4f6' : 'white', cursor: isStudent ? 'not-allowed' : 'text' }}
                  {...register("email", { 
                    required: isStudent ? false : "El email es obligatorio",
                    pattern: isStudent ? undefined : { value: /\S+@\S+\.\S+/, message: "Formato de correo inválido" }
                  })}
                />
                {errors.email && <span className={style.inputError}>{errors.email.message}</span>}
              </div>

              <div className={style.inputGroup}>
                <div className={style.labelContainer}>
                  <label htmlFor="password">Contraseña</label>
                  <span className={style.requiredTagWarning}>Obligatorio</span>
                </div>
                <input 
                  id="password" 
                  type="password" 
                  placeholder="Crea una contraseña"
                  className={style.inputField}
                  {...register("password", { 
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "Debe tener al menos 6 caracteres" }
                  })}
                />
                {errors.password && <span className={style.inputError}>{errors.password.message}</span>}
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
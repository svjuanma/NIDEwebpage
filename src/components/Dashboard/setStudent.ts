export const setStudent = async (id_student: number, id_instructor: number | null ) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/dash/instructor/asignarEstudiante`, {
    method: 'PUT',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      idEstudiante: id_student,
      idInstructor: id_instructor
    })
  });

    if (!response.ok) throw new Error('Failed to change student status');
    else {
      const {message} = await response.json();
      console.log(message)
    }
  }
  catch (e) {
    console.error(`Error: ${e}`);
  }
}
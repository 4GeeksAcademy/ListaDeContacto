import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ContactList = () => {
  const [contactos, setContactos] = useState([])

  const navigate = useNavigate();

  const verContactosAgenda = async () => {

    const response = await fetch('https://playground.4geeks.com/contact/agendas/Sergio/contacts')


    if (response.status === 404) {
      // Si entra en este if no existe la agenda. OJO: 404
      // Por lo tanto debe ejecutar una función que la cree.
      // Y después, volvemos a ejecutar verContactosAgenda(funcion) pero no entra en este if porque va a ser un 200.

    } else if (response.status === 200) {
      const data = await response.json()
      setContactos(data.contacts)
    }
  }

  const eliminarContacto = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/Sergio/contacts/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setContactos(contactos.filter(c => c.id !== id));
        Swal.fire('¡Eliminado!', 'El contacto ha sido eliminado', 'success');
      } else {
        Swal.fire('Error', 'No se pudo eliminar el contacto', 'error');
      }
    }
  };

  useEffect(() => {
    verContactosAgenda()
  }, [])

  return (
    <>
      <div className='d-flex justify-content-center my-3'>
        <button
          onClick={() => navigate('/contact-form')}
          type='button'
          className='btn btn-outline-warning'>
          Agregar Contacto
        </button>
      </div>

      {contactos.map((contacto) => {
        return (
          <Card
            key={contacto.id}
            name={contacto.name}
            address={contacto.address}
            phone={contacto.phone}
            email={contacto.email}
            id={contacto.id}
            onDelete={eliminarContacto}
          />
        );
      })}
    </>
  );
}; 
import { Card } from "../components/Card.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ContactList = () => {
  const [contacts, setContacts] = useState([])

  const navigate = useNavigate();

  const verContactosAgenda = async () => {

    const response = await fetch('https://playground.4geeks.com/contact/agendas/Sergio/contacts')


    if (response.status === 404) {
      // Si entra en este if no existe la agenda. OJO: 404
      // Por lo tanto debe ejecutar una función que la cree.
      // Y después, volvemos a ejecutar verContactosAgenda(funcion) pero no entra en este if porque va a ser un 200.

    } else if (response.status === 200) {
      const data = await response.json()
      setContacts(data.contacts)
    }
  }

  const eliminarContacto = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/Sergio/contacts/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
        Swal.fire('Deleted!', 'The contact has been deleted', 'success');
      } else {
        Swal.fire('Error', 'The contact could not be deleted', 'error');
      }
    }
  };

  useEffect(() => {
    verContactosAgenda()
  }, [])

  return (

    <div className='container mt-4'>
      {contacts.length > 0 && (
        <div className='d-flex justify-content-start mb-3'>
          <button
            onClick={() => navigate('/contact-form')}
            type='button'
            className='btn btn-outline-info'>
            Add Contact
          </button>
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h4 className="mb-3">No contacts yet</h4>
            <p className="text-muted mb-4">
              Start by adding your first contact.
            </p>
            <button
              className="btn btn-outline-info"
              onClick={() => navigate("/contact-form")}>
              Create your first contact
            </button>
          </div>
        </div>
      ) : (
        contacts.map((contacto) => (
          <Card
            key={contacto.id}
            name={contacto.name}
            address={contacto.address}
            phone={contacto.phone}
            email={contacto.email}
            id={contacto.id}
            onDelete={eliminarContacto}
          />
        ))
      )}
    </div>  )
};
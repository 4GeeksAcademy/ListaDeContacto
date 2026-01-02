import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const ContactForm = () => {
  // USENAVIGATE. Se usa para navegar dentro de la aplicación
  const navigate = useNavigate();

  //USELOCATION. Para editar contactos
  const location = useLocation();


  const contactToEdit = location.state?.contact;

  // USESTATE lo usamos para guardar cada value de input en un estado por cada uno
  const [name, setName] = useState(contactToEdit?.name || '')
  const [email, setEmail] = useState(contactToEdit?.email || '')
  const [phone, setPhone] = useState(contactToEdit?.phone || '')
  const [address, setAddress] = useState(contactToEdit?.address || '')


  // Acá estamos creando una agenda dentro de la API. Es esta agenda se guardaran los contactos
  const createAgenda = async () => {
    const response = await fetch(
      'https://playground.4geeks.com/contact/agendas/Sergio',
      { method: 'POST' }
    );
    return response.ok;
  };


  // Acá creamos los contactos que se guardarán en la agenda creada previamente
  const saveContact = async () => {
    const direccionBase = 'https://playground.4geeks.com/contact/agendas/Sergio/contacts';
    const method = contactToEdit ? 'PUT' : 'POST';
    const url = contactToEdit ? `${direccionBase}/${contactToEdit.id}` : direccionBase;

    const opciones = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, phone: phone, address: address })
    };

    // Está parte es SUMAMENTE IMPORTANTE ya que le estamos diciendo a la aplicación que en caso que no haya agenda la cree para poder continuar
    const response = await fetch(url, opciones);

    if (response.status === 404 && !contactToEdit) {
      const agendaCreada = await createAgenda();
      if (agendaCreada) {
        response = await fetch(url, opciones);
      }
    }

    // Si la agenda está creada podemos continuar con la creación del contacto que es lo que nos importa. 
    if (response.ok) {

      Swal.fire({
        title: '¡Éxito!',
        text: contactToEdit ? 'Contacto editado correctamente' : 'Contacto creado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        navigate('/contact-list');
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar el contacto. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveContact();
  };


  return (
    <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
      <h2>{contactToEdit ? 'Editar contacto' : 'Nuevo contacto'}</h2>
      <label>Name</label>
      <input id='name' value={name} onChange={(event) => {
        setName(event.target.value)
      }}
        type='text' required></input>

      <label>Email</label>
      <input id='email' value={email} onChange={(event) => {
        setEmail(event.target.value)
      }}
        type='email' required></input>

      <label>Phone</label>
      <input id='phone' value={phone} onChange={(event) => {
        setPhone(event.target.value)
      }}
        type='text' required></input>

      <label>Address</label>
      <input id='address' value={address} onChange={(event) => {
        setAddress(event.target.value)
      }}
        type='text' required></input>

      <button className='btn btn-success mt-3' type='submit'>
        Save Contact
      </button>
    </form>
  );
};

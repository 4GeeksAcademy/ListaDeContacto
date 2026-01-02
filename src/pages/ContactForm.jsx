import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ContactForm = () => {

  // Primero hay que guardar vada value de input en un estado por cada uno
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')


  // USENAVIGATE. Se usa para navegar dentro de la aplicación
  const navigate = useNavigate();



  //USELOCATION. Para editar contactos



  // Acá estamos creando una agenda dentro de la API para poder crear luego los contactos
  const createAgenda = async () => {
    const response = await fetch(
      'https://playground.4geeks.com/contact/agendas/Sergio',
      { method: 'POST' }
    );
    return response.ok;
  };


  // Acá creamos los contactos para poder agregarlos a una agenda ya creada anteriormente
  const saveContact = async () => {

    const direccion = 'https://playground.4geeks.com/contact/agendas/Sergio/contacts'

    const opciones = {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: address
      })
    }

    // Está parte es SUMAMENTE IMPORTANTE ya que le estamos diciendo a la aplicación que en caso que no haya agenda la cree para poder continuar
    const response = await fetch(direccion, opciones);

    if (response.status === 404) {
      const agendaCreada = await createAgenda();

      if (agendaCreada) {
        response = await fetch(direccion, opciones);
      }
    }

    // Si la agenda está creada podemos continuar con la creación del contacto que es lo que nos importa. 
    if (response.ok) {
      navigate('/contact-list');
    } else {
      console.error('Error al guardar el contacto');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveContact();
  };


  return (

    <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
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

      <button className='btn btn-success mt-3' type='submit'>Save Contact</button>

    </form>
  );
};

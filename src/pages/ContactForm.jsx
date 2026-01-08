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
    let response = await fetch(url, opciones);

    if (response.status === 404 && !contactToEdit) {
      const agendaCreada = await createAgenda();
      if (agendaCreada) {
        response = await fetch(url, opciones);
      }
    }

    // Si la agenda está creada podemos continuar con la creación del contacto que es lo que nos importa. 
    if (response.ok) {

      Swal.fire({
        title: '¡Success!',
        text: contactToEdit ? 'The contact has been updated successfully' : 'The contact has been created successfully',
        icon: 'success',
        confirmButtonText: 'Accept'
      }).then(() => {
        navigate('/contact-list');
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar el contacto. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Accept'
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveContact();
  };


  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-12'>
          <div className='card shadow'>
            <div className='card-body'>
              <h3 className='card-title text-center mb-3'>
                {contactToEdit ? 'Edit contact' : 'Add contact'}</h3>

              <form onSubmit={handleSubmit}>

                <div className='mb-3'>
                  <label className="form-label">Full Name</label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Full name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    className='form-control'
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Enter phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className="form-label">Address</label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className='d-flex flex-column align-items-center'>
                  <button className='btn btn-outline-info mt-3 ' type='submit'>
                    Save Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

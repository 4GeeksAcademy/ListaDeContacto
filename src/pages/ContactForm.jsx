import { useState } from "react";

export const ContactForm = () => {

  // Primero hay que guardar vada value de input en un estado por cada uno
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

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


    const response = await fetch(direccion, opciones)


  }

  const handleSubmit = (event) => {

    event.preventDefault()

    saveContact()
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')

  }


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

      <button className='btn btn-success mt-3' type='submit' >Save Contact</button>

    </form>
  );
};

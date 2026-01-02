import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    verContactosAgenda()
  }, [])

  return (
    <>

      <button onClick={() => navigate('/contact-form')}>
        Agregar Contacto
      </button>

      <button onClick={verContactosAgenda}>
        Probar Fetch
      </button>
      {
        contactos.map((contacto) => {
          return (
            <Card
              key={contacto.id}
              name={contacto.name}
              address={contacto.address}
              phone={contacto.phone}
              email={contacto.email}
              id={contacto.id}
            />
          );
        })
      }
    </>
  );
}; 
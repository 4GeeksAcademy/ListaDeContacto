import { useNavigate } from "react-router-dom";

// En este Card vamos a hacer que podemos modificarla para eso tenemos que traer el useNavigate y trabajar con el hasta el Contact-form
export const Card = ({ name, address, phone, email, id, onDelete }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact-form', { state: { contact: { name, address, phone, email, id } } });
  };

  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">

        <div className="col-md-3 d-flex justify-content-center">
          <img
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"
            alt='Profile'
            className='rounded-circle'
            style={{ width: '190px', height: '150px', objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-9">
          <div className="card-body">
            <h4 className="card-title mb-3">{name}</h4>

            <h6 className="card-text text-secondary mb-2">
              <i className="fa-solid fa-location-dot me-2"></i>
              {address}
            </h6>
            <p className="card-text text-secondary mb-1">
              <i class="fa-solid fa-phone me-2"></i>
              {phone}
            </p>
            <p className="card-text text-secondary mb-1">
              <i class="fa-solid fa-envelope me-2"></i>
              {email}
            </p>

            <div className='position-absolute top-0 end-0 mt-3 me-4 d-flex gap-3'>
              <i className="fa-solid fa-pen me-3"
                style={{ cursor: 'pointer' }}
                onClick={handleClick}></i>
              <i className="fas fa-trash"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
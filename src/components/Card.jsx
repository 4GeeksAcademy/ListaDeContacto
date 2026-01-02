import { useNavigate } from "react-router-dom";

// En este Card vamos a hacer que podemos modificarla para eso tenemos que traer el useNavigate y trabajar con el hasta el Contact-form
export const Card = ({name, address, phone, email, id}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/contact-form', { state: { contact: { name, address, phone, email, id } } });
    };

    return (
        <div className="card mb-3" onClick={handleClick} style={{ cursor: 'pointer' }} >
            <div className="row g-0">
                <div className="col-md-3 d-flex justify-content-center align-item-center">
                    <div className="col-md-4 mt-4">
                        <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" 
                        className="img-fluid rounded-circle" />
                    </div>
                </div>

                <div className="col-md-7 text-start">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{address}</p>
                        <p className="card-text">{phone}</p>
                        <p className="card-text">{email}</p>
                        <p className="card-text">{id}</p>                         
                    </div>
                </div>
            </div>
        </div>
    );
}
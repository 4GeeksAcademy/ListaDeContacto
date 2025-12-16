import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<Card title='Hello' subtitle='Welcome to Home' />
	);
}; 
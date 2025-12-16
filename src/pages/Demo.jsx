// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  const cambiarColor = (id) => {
    dispatch({
      type: 'add_task',
      payload: { id, color: '#ffa500' }

    });
  };

  return (
    <ul>
      {store.todos.map(todo => (
        <li key={todo.id} style={{ background: todo.background }}>
          {todo.title}
          <button onClick={() => cambiarColor(todo.id)}>
            Cambiar color
          </button>
        </li>
      ))}
    </ul>
  );
};

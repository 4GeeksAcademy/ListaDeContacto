// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { ContactForm } from "./pages/ContactForm";
import { ContactList } from "./pages/ContactList";


export const router = createBrowserRouter(
    createRoutesFromElements(      
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >        
        <Route path= "/contact-list" element={<ContactList />} />
        <Route path="/contact-form" element={<ContactForm />} />
      </Route>
    )
);
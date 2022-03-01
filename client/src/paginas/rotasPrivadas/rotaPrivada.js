import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

const RotaPrivada = () => {
    const user = useSelector(state=> state.utilizador.utilizadorAtual) // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/" />;
}
export default RotaPrivada
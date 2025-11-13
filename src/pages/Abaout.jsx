import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h1>E.F.I – Práctica Profesionalizante I (JavaScript)</h1>
      <h2>Materia: Práctica Profesionalizante I – JavaScript</h2>

      <section>
        <h3>Objetivo General</h3>
        <p>
          Desarrollar una aplicación web con React que consuma una API Flask provista por la cátedra, 
          implementando autenticación mediante JWT (Bearer Token) y CRUDs completos sobre los recursos 
          <strong> posts/ </strong> y <strong> reviews/</strong>.
        </p>
        <p>
          El proyecto debe presentar una interfaz moderna, limpia y fácil de usar, con código estructurado, 
          modular y buenas prácticas de desarrollo frontend.
        </p>
      </section>

      <section>
        <h3>Conformación de Equipos</h3>
        <p>El trabajo se realizará en grupos de hasta 3 integrantes.</p>
        <p>Cada grupo deberá entregar un repositorio independiente del frontend.</p>
      </section>

      <section>
        <h3>Requisitos Funcionales</h3>
        <ul>
          <li>Autenticación y usuarios con JWT y roles.</li>
          <li>CRUDs completos de posts y reviews.</li>
          <li>Rutas protegidas y permisos según rol.</li>
          <li>Interfaz moderna y responsive con PrimeReact o Material UI.</li>
        </ul>
      </section>

      <section>
        <h3>Entrega Final</h3>
        <p>
          El proyecto se entregará en GitHub incluyendo documentación, 
          enlace al backend y guía de instalación.
        </p>
      </section>

      <button className="btn-back" onClick={() => navigate("/posts")}>
        ← Volver al inicio
      </button>
    </div>
  );
}
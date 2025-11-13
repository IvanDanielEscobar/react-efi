import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contact.css";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <h1>Contacto</h1>
      <p>
        Si deseas comunicarte con el equipo desarrollador de este proyecto,
        podés hacerlo a través de los siguientes medios:
      </p>

      <div className="contact-info">
        <h3>Integrantes</h3>
        <ul>
          <li>
            <strong>Iván Escobar</strong><br />
            <em>i.escobar@itecriocuarto.org.ar</em>
          </li>
          <li>
            <strong>Jonatan Villavicencio</strong><br />
            <em>j.villavicencio@itecriocuarto.org.ar</em>
          </li>
        </ul>
      </div>

      <div className="contact-extra">
        <h3>Información adicional</h3>
        <ul>
          <li><strong>Institución:</strong> ITEC Río Cuarto</li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a href="https://github.com/IvanDanielEscobar/react-efi" target="_blank" rel="noopener noreferrer">
              Repositorio del Proyecto
            </a>
          </li>
          <li><strong>Ubicación:</strong> Río Cuarto, Córdoba, Argentina</li>
        </ul>
      </div>

      <button className="btn-back" onClick={() => navigate("/posts")}>
        ← Volver al inicio
      </button>
    </div>
  );
}
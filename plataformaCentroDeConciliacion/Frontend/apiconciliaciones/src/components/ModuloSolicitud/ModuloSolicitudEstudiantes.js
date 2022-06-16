import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import './css/ModuloSolicitudEstudiantes.css';
import config from '../../config.json'
import { useLocation, useParams } from 'react-router-dom';

function ModuloSolicitudEstudiantes() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='container container-estudiantes pt-3'>
                <div className='titulo-informacion-estudiantes'>
                    <h1>Informacion del estudiantes</h1>
                </div>
                <div className='contenedor-navbar-agregar-estudiantes'>
                    <nav className="navbar navbar-light ">
                        <div className="container-fluid">
                            <form className="d-flex input-group w-autd-flex input-group w-auto align-items-sm-baseline gap-1">
                                <input
                                    type="search"
                                    class="form-control rounded"
                                    placeholder="Buscar"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                />
                                {/* <div ref={alertContainer}></div> */}
                            </form>
                            <div className="d-flex align-items-end">
                                <button type="button" class="btn btn-primary me-3" id='boton-agregar-estudiantes'
                                    onClick={() => setIsOpen(!isOpen)}>
                                    Agregar estudiantes
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
                {isOpen &&
                    <form className='contenedor-tabla-seleccion-estudiantes mb-5 p-4 pb-3' /* onSubmit={agregarestudiantes} */>
                        <label className='pb-3 h5'>Seleccione el estudiantes que desea agregar</label>
                        <table className='table table-striped table-bordered table-responsive'>
                            <thead >
                                <tr>
                                    <th></th>
                                    <th>Tipo de documento</th>
                                    <th>Identificación</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {estudiantesesDisponibles.map((dato, key) => {
                                    return (
                                        <tr>
                                            <td><input className='class="custom-control-input"' name="identificacionPersona" type='radio' value={dato["Identificacion"]}></input></td>
                                            <td key={dato["Tipo_documento_Id"]["Id"]}>{dato["Tipo_documento_Id"]["Nombre"]}</td>
                                            <td key={dato["Identificacion"]}>{dato["Identificacion"]}</td>
                                            <td key={dato["Nombres"]}>{dato["Nombres"] + ' ' + dato["Apellidos"]}</td>
                                        </tr>
                                    );
                                })} */}
                            </tbody>
                        </table>
                        <div className=''>
                            <button type="submit" className="btn btn-primary me-3" id='boton-agregar-estudiantes'> Agregar</button>
                        </div>
                    </form>
                }
                <form className='contenedor-tabla-convocado'>
                    <table className='table table-striped table-bordered table-responsive '>
                        <thead >
                            <tr>
                                <th>Clase del Convocado</th>
                                <th>Tipo de documento</th>
                                <th>Identificación</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {estudianteses.map((dato) => {
                                return (
                                    <tr>
                                        <td key={dato["Tipo_persona_Id"]}>{dato["Tipo_persona_Id"]["Nombre"]}</td>
                                        <td key={dato["Tipo_documento_Id"]["Id"]}>{dato["Tipo_documento_Id"]["Nombre"]}</td>
                                        <td key={dato["Identificacion"]}>{dato["Identificacion"]}</td>
                                        <td key={dato["Nombres"]}>{dato["Nombres"] + ' ' + dato["Apellidos"]}</td>
                                        <td><button className='boton-tabla-eliminar' value={dato["Identificacion"]} onClick={eliminarestudianteses}>Eliminar</button></td>
                                    </tr>
                                )
                            })} */}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )
}
export default ModuloSolicitudEstudiantes
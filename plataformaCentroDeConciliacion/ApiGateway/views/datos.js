const axios = require("axios");
const { response } = require("express");
const res = require("express/lib/response");
const config = require("../config.json");
const fecha = new Date();

datosPersonas = {};

datosPersonas.Actualizar = (req, res) => {
  axios
    .patch(
      config.urlApiConciliacion +
        "/" +
        req.params.nombre +
        "/" +
        req.params.id +
        "/",
      req.body
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      //console.log(error);
      res.sendStatus(500);
    });
};
datosPersonas.datosBasicos = async (response) => {
  let datos = [];

  try {
    if (response.data != "") {
      for await (const informacion_data of response.data) {
        // Incrementando el tamaño total.
        const resp = await axios.get(
          config.urlApiConciliacion + "/personas/" + informacion_data.Persona_Id
        );
        // const barrio= await axios.get(config.urlApiConciliacion + "/barrios/"+resp.data.Barrio_Id);
        // const localidad = await axios.get(config.urlApiConciliacion + "/localidades/"+barrio.data.Localidad_Id);
        // const ciudad = await axios.get(config.urlApiConciliacion + "/ciudades/"+localidad.data.Ciudad_Id);
        // const departamento = await axios.get(config.urlApiConciliacion + "/departamentos/"+ciudad.data.Departamento_Id);
        // const pais = await  axios.get(config.urlApiConciliacion + "/paises/"+departamento.data.Pais_Id);
        const documento = await axios.get(
          config.urlApiConciliacion +
            "/tipos_documento/" +
            resp.data.Tipo_documento_Id
        );
        const tipo = await axios.get(
          config.urlApiConciliacion +
            "/tipos_persona/" +
            resp.data.Tipo_persona_Id
        );

        // departamento.data.Pais_Id = pais.data
        // ciudad.data.Departamento_Id = departamento.data
        // localidad.data.Ciudad_Id=ciudad.data
        // barrio.data.Localidad_Id= localidad.data
        // resp.data.Barrio_Id=barrio.data
        resp.data.Tipo_documento_Id = documento.data;
        resp.data.Tipo_persona_Id = tipo.data;

        datos.push(resp.data);
      }
    }
    return datos;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
datosPersonas.datosBasicosDocentes = async (response) => {
  let datos = [];

  try {
    for await (const informacion_data of response.data) {
      const documento = await axios.get(
        config.urlApiConciliacion +
          "/tipos_documento/" +
          informacion_data.Tipo_documento_Id
      );
      const tipo = await axios.get(
        config.urlApiConciliacion +
          "/tipos_persona/" +
          informacion_data.Tipo_persona_Id
      );

      // departamento.data.Pais_Id = pais.data
      // ciudad.data.Departamento_Id = departamento.data
      // localidad.data.Ciudad_Id=ciudad.data
      // barrio.data.Localidad_Id= localidad.data
      // resp.data.Barrio_Id=barrio.data
      informacion_data.Tipo_documento_Id = documento.data;
      informacion_data.Tipo_persona_Id = tipo.data;

      datos.push(informacion_data);
    }
    return datos;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
datosPersonas.datosCrearPersonas = async (response) => {};

datosPersonas.datosCompletos = async (response) => {
  let datos = [];

  try {
    if (response.data != 0) {
      for await (const informacion_data of response.data) {
        // Incrementando el tamaño total.
        const resp = await axios.get(
          config.urlApiConciliacion + "/personas/" + informacion_data.Id
        );
        const barrio = await axios.get(
          config.urlApiConciliacion + "/barrios/" + resp.data.Barrio_Id
        );
        const localidad = await axios.get(
          config.urlApiConciliacion + "/localidades/" + barrio.data.Localidad_Id
        );
        const ciudad = await axios.get(
          config.urlApiConciliacion + "/ciudades/" + localidad.data.Ciudad_Id
        );
        const departamento = await axios.get(
          config.urlApiConciliacion +
            "/departamentos/" +
            ciudad.data.Departamento_Id
        );
        const pais = await axios.get(
          config.urlApiConciliacion + "/paises/" + departamento.data.Pais_Id
        );
        const tipo_persona =
          (resp.data.Tipo_persona_Id === null) | ""
            ? (resp.data.Tipo_persona_Id = "")
            : await axios
                .get(
                  config.urlApiConciliacion +
                    "/tipos_persona/" +
                    resp.data.Tipo_persona_Id
                )
                .then((result) => {
                  resp.data.Tipo_persona_Id = result.data;
                });
        const documento =
          (resp.data.Tipo_documento_Id === null) | ""
            ? (resp.data.Tipo_documento_Id = "")
            : await axios
                .get(
                  config.urlApiConciliacion +
                    "/tipos_documento/" +
                    resp.data.Tipo_documento_Id
                )
                .then((result) => {
                  resp.data.Tipo_documento_Id = result.data;
                });
        const vivienda =
          (resp.data.Tipo_documento_Id === null) | ""
            ? (resp.data.Tipo_vivienda_Id = "")
            : await axios
                .get(
                  config.urlApiConciliacion +
                    "/tipos_vivienda/" +
                    resp.data.Tipo_vivienda_Id
                )
                .then((result) => {
                  resp.data.Tipo_vivienda_Id = result.data;
                });
        const tipo_estado =
          (resp.data.Tipo_estado_Id === null) | ""
            ? (resp.data.Tipo_estado_Id = "")
            : await axios
                .get(
                  config.urlApiConciliacion +
                    "/tipos_estado/" +
                    resp.data.Tipo_estado_Id
                )
                .then((result) => {
                  resp.data.Tipo_estado_Id = result.data;
                });
        const estrato =
          (resp.data.Estrato_socioeconomico_Id === null) | ""
            ? (resp.data.Estrato_socioeconomico_Id = "")
            : await axios
                .get(
                  config.urlApiConciliacion +
                    "/estratos_socioeconomicos/" +
                    resp.data.Estrato_socioeconomico_Id
                )
                .then((result) => {
                  resp.data.Estrato_socioeconomico_Id = result.data;
                });
        const perfil =
          (resp.data.Perfil_Id === null) | ""
            ? (resp.data.Perfil_Id = "")
            : await axios
                .get(
                  config.urlApiConciliacion + "/perfiles/" + resp.data.Perfil_Id
                )
                .then((result) => {
                  resp.data.Perfil_Id = result.data;
                });
        const cargo =
          (resp.data.Tipo_cargo_Id === null) | ""
            ? (resp.data.Tipo_cargo_Id = "")
            : await axios
                .get(
                  config.urlApiConciliacion +
                    "/tipos_cargo/" +
                    resp.data.Tipo_cargo_Id
                )
                .then((result) => {
                  resp.data.Tipo_cargo_Id = result.data;
                });
        if (resp.data.Fecha_de_nacimiento === null)
          resp.data.Fecha_de_nacimiento = "";

        departamento.data.Pais_Id = pais.data;
        ciudad.data.Departamento_Id = departamento.data;
        localidad.data.Ciudad_Id = ciudad.data;
        barrio.data.Localidad_Id = localidad.data;
        resp.data.Barrio_Id = barrio.data;

        datos.push(resp.data);
      }
    }
    return datos;
  } catch (err) {
    // Handle Error Here
    console.log(err);
    throw new Error(err);
  }
};

datosPersonas.ExportarDatosPersona = async (req,response) => {
  let datos = {};
  try {
    const personas = await axios.get(
      config.urlGateway + "solicitudes/" + req.params.id + "/" + response
    );
    if (Object.keys(personas.data).length == 0) {
      return (datos = {});
    }

    if (
      (personas.data[personas.data.length - 1].Genero_Id == "") |
      (personas.data[personas.data.length - 1].Genero_Id == null)
    ) {
      personas.data[personas.data.length - 1].Genero_Id = 4;
    }

    const genero = await axios.get(
      config.urlApiConciliacion +
        "/generos/" +
        personas.data[personas.data.length - 1].Genero_Id
    );

    const barrio_persona = await axios.get(
      config.urlApiConciliacion +
        "/barrios/" +
        personas.data[personas.data.length - 1].Barrio_Id
    );
    const localidad_persona = await axios.get(
      config.urlApiConciliacion +
        "/localidades/" +
        barrio_persona.data.Localidad_Id
    );
    const ciudad_persona = await axios.get(
      config.urlApiConciliacion +
        "/ciudades/" +
        localidad_persona.data.Ciudad_Id
    );
    const departamento_persona = await axios.get(
      config.urlApiConciliacion +
        "/departamentos/" +
        ciudad_persona.data.Departamento_Id
    );
    const pais_persona = await axios.get(
      config.urlApiConciliacion + "/paises/" + departamento_persona.data.Pais_Id
    );

    personas.data[personas.data.length - 1].Tipo_documento_Id =
      personas.data[personas.data.length - 1].Tipo_documento_Id.Nombre;
    personas.data[personas.data.length - 1].Barrio_Id =
      barrio_persona.data.Nombre;
    personas.data[personas.data.length - 1].Localidad =
      localidad_persona.data.Nombre;
    personas.data[personas.data.length - 1].Ciudad = ciudad_persona.data.Nombre;
    personas.data[personas.data.length - 1].Departamento =
      departamento_persona.data.Nombre;
    personas.data[personas.data.length - 1].Pais = pais_persona.data.Nombre;
    personas.data[personas.data.length - 1].Genero_Id = genero.data.Nombre;
    personas.data[personas.data.length - 1].Tipo_persona_Id =
      personas.data[personas.data.length - 1].Tipo_persona_Id.Nombre;

    datos = personas.data[personas.data.length - 1];
    return datos;
  } catch (error) {
    console.log(error);
  }
};

const edad = (fecha) => {
  const hoy = new Date();
  const cumpleaños = new Date(fecha);
  let edad = hoy.getFullYear() - cumpleaños.getFullYear();
  const m = hoy.getMonth() - cumpleaños.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleaños.getDate())) {
    edad--;
  }
  return edad

};
const informacion_persona= async(req,iterator)=>{
  let data=[]
    const barrio_persona = await axios.get(config.urlApiConciliacion +"/barrios/" +iterator.Barrio_Id);
    const localidad_persona = await axios.get(config.urlApiConciliacion +"/localidades/" +barrio_persona.data.Localidad_Id);
    const ciudad_persona = await axios.get(config.urlApiConciliacion +"/ciudades/" +localidad_persona.data.Ciudad_Id);
    const departamento_persona = await axios.get(config.urlApiConciliacion +"/departamentos/" +ciudad_persona.data.Departamento_Id);
    const pais_persona = await axios.get(config.urlApiConciliacion + "/paises/" + departamento_persona.data.Pais_Id);
    const genero = await axios.get(config.urlApiConciliacion +"/generos/" +iterator.Genero_Id);
    const estrato= await axios.get(config.urlApiConciliacion +"/estratos_socioeconomicos/" +iterator.Estrato_socioeconomico_Id);
    if (iterator.Fecha_de_nacimiento == null) {
      return (iterator.Fecha_de_nacimiento= '');
    }
    const encuesta=await axios.get(config.urlApiConciliacion + "/encuestas?Solicitud_Id=" + req.params.id + "&Persona_Id=" + iterator.Id)
    if (Object.keys(encuesta.data).length != 0) {
    const medio = await axios.get(config.urlApiConciliacion + "/medios_conocimiento/" + encuesta.data[0].Medio_conocimiento_Id)
                    await axios.get(config.urlApiConciliacion + "/respuestas?Encuesta_Id=" + encuesta.data[0].Id)

                        .then(response => {
                            
                            data[0] = medio.data
                            data[1] = response.data
                            iterator.respuestas=data[1]
                            iterator.conocimiento=data[0].Nombre
                            
                            
                        })}
    let edades = await edad(iterator.Fecha_de_nacimiento);
    if ((edades >= 12) & (edades <= 25)) {
      iterator.poblacion = "JOVENES(12-25)"
      
    } else if ((edades >= 26) & (edades <= 60)) {
      iterator.poblacion = "ADULTOS(26-60)"
    } else if ((edades >60)) {
      iterator.poblacion = "(ADULTO MAYOR DE 60)"
    }
    
    iterator.Barrio_Id=barrio_persona.data.Nombre
    iterator.localidad_persona=localidad_persona.data.Nombre
    iterator.ciudad_persona=ciudad_persona.data.Nombre
    iterator.departamento_persona=departamento_persona.data.Nombre
    iterator.pais=pais_persona.data.Nombre
    iterator.Genero_Id=genero.data.Nombre
    iterator.Estrato_socioeconomico_Id=estrato.data.Numero
    
     
return iterator
}
datosPersonas.ExportarDatosTodasLasPersonasReporte = async (id, response, data,req) => { // repsonse por cada solicitud encontrada
  try {
    let informacion=[]
    
    if (response === " ") {
      
        req.params.id=id
        const solicitud = await datosPersonas.ExportarDatos(req,response);
       
        
        //const area = await axios.get(config.urlApiConciliacion + "/solicitudes/" + id )
        //data.solicitud = solicitud.data
        
        return solicitud
      
  }
  if (response === "convocantes") {
    req.params.id=id
    const convocantes = await axios.get(config.urlGateway + "solicitudes/"+id + "/"+response)
   
    if (Object.keys(convocantes.data).length == 0) {console.log("entre")} 
    for await (const iterator of convocantes.data) {
      informacion[informacion.length] =await informacion_persona(req,iterator)
   
    }
    //console.log(informacion)
    return informacion
  
  
}
if (response === "convocados") {
  req.params.id=id
  const convocados = await axios.get(config.urlGateway + "solicitudes/"+id + "/"+response)
 
  if (Object.keys(convocados.data).length == 0) {console.log("entre")} 
  for await (const iterator of convocados.data) {
    informacion[informacion.length] =await informacion_persona(req,iterator)
    console.log(informacion )
  }
  
  return informacion


}

if (response === "citaciones") {
  req.params.id=id
  const citaciones= await datosPersonas.ExportarDatos(req,"citaciones")
  console.log(citaciones)

  return citaciones
  }
  
  




    // if (personas.data[personas.data.length - 1].Genero_Id == '' | personas.data[personas.data.length - 1].Genero_Id == null) { personas.data[personas.data.length - 1].Genero_Id = 4 }

    // const genero = await axios.get(config.urlApiConciliacion + "/generos/" + personas.data[personas.data.length - 1].Genero_Id);

    // const barrio_persona = await axios.get(config.urlApiConciliacion + "/barrios/" + personas.data[personas.data.length - 1].Barrio_Id);
    // const localidad_persona = await axios.get(config.urlApiConciliacion + "/localidades/" + barrio_persona.data.Localidad_Id);
    // const ciudad_persona = await axios.get(config.urlApiConciliacion + "/ciudades/" + localidad_persona.data.Ciudad_Id);
    // const departamento_persona = await axios.get(config.urlApiConciliacion + "/departamentos/" + ciudad_persona.data.Departamento_Id);
    // const pais_persona = await axios.get(config.urlApiConciliacion + "/paises/" + departamento_persona.data.Pais_Id);

    // personas.data[personas.data.length - 1].Tipo_documento_Id = personas.data[personas.data.length - 1].Tipo_documento_Id.Nombre
    // personas.data[personas.data.length - 1].Barrio_Id = barrio_persona.data.Nombre
    // personas.data[personas.data.length - 1].Localidad = localidad_persona.data.Nombre
    // personas.data[personas.data.length - 1].Ciudad = ciudad_persona.data.Nombre
    // personas.data[personas.data.length - 1].Departamento = departamento_persona.data.Nombre
    // personas.data[personas.data.length - 1].Pais = pais_persona.data.Nombre
    // personas.data[personas.data.length - 1].Genero_Id = genero.data.Nombre
    // personas.data[personas.data.length - 1].Tipo_persona_Id = personas.data[personas.data.length - 1].Tipo_persona_Id.Nombre

    // datos = personas.data[personas.data.length - 1]
    //return datos;
  } catch (error) {
    console.log(error);
  }
}



datosPersonas.ExportarDatosTodasLasPersonas = async (id, response, datos) => {
  try {
    if (response === " ") {
        const solicitud = await axios.get(config.urlApiConciliacion + "/solicitudes/" + id );
        datos.condicion[ solicitud.data.Area_Id-1][1]++
        return
    
    }else {
    const personas = await axios.get(
   
    config.urlGateway + "solicitudes/" + id + "/" + response
    );
   
    if (Object.keys(personas.data).length == 0) {
      return;
    }
    for await (const iterator of personas.data) {

        

      if (iterator.Fecha_de_nacimiento == null) {
        return (datos = {});
      }
      
      let edades = edad(iterator.Fecha_de_nacimiento);
      if ((edades >= 12) & (edades <= 25)) {
        datos.ciclo_vital.jovenes++;
        
      } else if ((edades >= 26) & (edades <= 60)) {
        datos.ciclo_vital.adultos ++;
      } else if ((edades >60)) {
        datos.ciclo_vital.adultos_mayores ++;
      }
      if ((iterator.Genero_Id == "") | (iterator.Genero_Id == null)) {
        iterator.Genero_Id = 4;
      }
      datos.grupos[iterator.Genero_Id-1][1]++
     
    }
  }
    return datos;

    // if (personas.data[personas.data.length - 1].Genero_Id == '' | personas.data[personas.data.length - 1].Genero_Id == null) { personas.data[personas.data.length - 1].Genero_Id = 4 }

    // const genero = await axios.get(config.urlApiConciliacion + "/generos/" + personas.data[personas.data.length - 1].Genero_Id);

    // const barrio_persona = await axios.get(config.urlApiConciliacion + "/barrios/" + personas.data[personas.data.length - 1].Barrio_Id);
    // const localidad_persona = await axios.get(config.urlApiConciliacion + "/localidades/" + barrio_persona.data.Localidad_Id);
    // const ciudad_persona = await axios.get(config.urlApiConciliacion + "/ciudades/" + localidad_persona.data.Ciudad_Id);
    // const departamento_persona = await axios.get(config.urlApiConciliacion + "/departamentos/" + ciudad_persona.data.Departamento_Id);
    // const pais_persona = await axios.get(config.urlApiConciliacion + "/paises/" + departamento_persona.data.Pais_Id);

    // personas.data[personas.data.length - 1].Tipo_documento_Id = personas.data[personas.data.length - 1].Tipo_documento_Id.Nombre
    // personas.data[personas.data.length - 1].Barrio_Id = barrio_persona.data.Nombre
    // personas.data[personas.data.length - 1].Localidad = localidad_persona.data.Nombre
    // personas.data[personas.data.length - 1].Ciudad = ciudad_persona.data.Nombre
    // personas.data[personas.data.length - 1].Departamento = departamento_persona.data.Nombre
    // personas.data[personas.data.length - 1].Pais = pais_persona.data.Nombre
    // personas.data[personas.data.length - 1].Genero_Id = genero.data.Nombre
    // personas.data[personas.data.length - 1].Tipo_persona_Id = personas.data[personas.data.length - 1].Tipo_persona_Id.Nombre

    // datos = personas.data[personas.data.length - 1]
    return datos;
  } catch (error) {
    console.log(error);
  }
};
datosPersonas.ExportarDatos = async (req, response) => {
  try {
    let datos = {};
    const search = await axios.get(
      config.urlGateway + "solicitudes/" + req.params.id + "/" + response
    );

    if (Object.keys(search.data).length == 0) {
      return (datos = {});
    }

    if (response == "hechos") {
      search.data[0].Departamento =
        search.data[0].Ciudad_Id.Departamento_Id.Nombre;
      search.data[0].Ciudad_Id = search.data[0].Ciudad_Id.Nombre;
      datos = search.data[0];
    } else if (response == "citaciones") {
      search.data[0].Turno_Id = search.data[0].Turno_Id.Franja_horaria;
      search.data[0].Tipo_medio_Id = search.data[0].Tipo_medio_Id.Nombre;
      datos = search.data[0];
    } else if (response === " ") {
      if (search.data.Tipo_resultado_Id != "") {
        search.data.Tipo_resultado_Id = search.data.Tipo_resultado_Id.Nombre;
      }
      const historico = await axios.get(config.urlApiConciliacion +"/historicos_solicitud?Solicitud_Id=" +req.params.id );
    
        if (historico.data.length > 0) {
          const estado =(historico.data[0].Tipo_estado_Id === null) | ""? (historico.data.Tipo_estado_Id = ""): await axios.get(
                    config.urlApiConciliacion +"/tipos_estado/" +historico.data[0].Tipo_estado_Id)
                  .then((result) => {
                    search.data.estado_tramite = result.data.Nombre;
                  });
        
    };
      search.data.Tipo_servicio_Id = search.data.Tipo_servicio_Id.Nombre;
      search.data.Inicio_conflicto_Id = search.data.Inicio_conflicto_Id.Nombre;
      search.data.Area_Id = search.data.Area_Id.Nombre;
      search.data.Subtema_Id = search.data.Subtema_Id.Nombre;
      search.data.Solicitante_servicio_Id =
        search.data.Solicitante_servicio_Id.Nombre;
      datos = search.data;
    }

    return datos;
  } catch (error) {
    console.log(error);
  }
};
datosPersonas.CrearPersona = async (req) => {
  let datos = {};
  try {
    if (req.body.Fecha_de_nacimiento === "") {
      {
        req.body.Fecha_de_nacimiento = "";
      }
    }
    if (req.body.Telefono === "") {
      {
        req.body.Telefono = 0;
      }
    }
    if (typeof req.body.Perfil_Id != "number") {
      {
        req.body.Perfil_Id = "";
      }
    }
    if (typeof req.body.Tipo_cargo_Id != "number") {
      {
        req.body.Tipo_cargo_Id = null;
      }
    }
    if ((req.body.Identificacion === null) | "") {
      res.sendStatus(404);
    } else if ((typeof req.body.Nombres != "string") & null & "") {
      res.sendStatus(404);
    } else if ((typeof req.body.Apellidos != "string") & null & "") {
      {
        res.sendStatus(404);
      }
    } else if (typeof req.body.Telefono != "number") {
      {
        res.sendStatus(404);
      }
    } else if (typeof req.body.Tipo_documento_Id != "number") {
      {
        res.sendStatus(404);
      }
    } else if (typeof req.body.Tipo_vivienda_Id != "number") {
      {
        res.sendStatus(404);
      }
    } else if (typeof req.body.Barrio_Id != "number") {
      {
        res.sendStatus(404);
      }
    } else if (typeof req.body.Tipo_persona_Id != "number") {
      {
        res.sendStatus(404);
      }
    } else if (typeof req.body.Estrato_socioeconomico_Id != "number") {
      {
        res.sendStatus(404);
      }
    } else if (typeof req.body.Tipo_estado_Id != "number") {
      {
        res.sendStatus(404);
      }
    } else {
      datos = {
        Identificacion: req.body.Identificacion,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Correo: req.body.Correo,
        Telefono: req.body.Telefono,
        Fecha_de_nacimiento: req.body.Fecha_de_nacimiento,
        Tipo_documento_Id: req.body.Tipo_documento_Id,
        Tipo_vivienda_Id: req.body.Tipo_vivienda_Id,
        Barrio_Id: req.body.Barrio_Id,
        Tipo_persona_Id: req.body.Tipo_persona_Id,
        Estrato_socioeconomico_Id: req.body.Estrato_socioeconomico_Id,
        Tipo_estado_Id: 1,
        Perfil_Id: req.body.Perfil_Id,
        Tipo_cargo_Id: req.body.Tipo_cargo_Id,
        Genero_Id: req.body.Genero_Id,
      };
    }
    return datos;
  } catch (error) {
    console.log(error);
  }
};

datosPersonas.Solicitudes = async (response) => {
  let datos = [];

  try {
    if (response.data != 0) {
      for await (const informacion_data of response.data) {
        if (typeof informacion_data.Solicitud_Id !== "number") {
          return datos;
        }
        const resp = await axios.get(
          config.urlApiConciliacion +
            "/solicitudes/" +
            informacion_data.Solicitud_Id
        );

        const historico = await axios.get(
          config.urlApiConciliacion +
            "/historicos_solicitud?Solicitud_Id=" +
            informacion_data.Solicitud_Id
        );
        if (historico.data.length > 0) {
          const estado =
            (historico.data[0].Tipo_estado_Id === null) | ""
              ? (historico.data.Tipo_estado_Id = "")
              : await axios
                  .get(
                    config.urlApiConciliacion +
                      "/tipos_estado/" +
                      historico.data[0].Tipo_estado_Id
                  )
                  .then((result) => {
                    historico.data.Tipo_estado_Id = result.data.Nombre;
                  });

          let data = {
            Solicitud_Id: informacion_data.Solicitud_Id,
            Fecha_registro: resp.data.Fecha_registro,
            Tipo_Estado: historico.data.Tipo_estado_Id,
          };
          datos.push(data);
        }
      }
    } else {
      return datos;
    }
    return datos;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

datosPersonas.SolicitudesEspecificas = async (response) => {
  let datos = [];

  try {
    // console.log(response.data)
    if (response.data != 0) {
      informacion_data = response.data;

      const area =
        (informacion_data.Area_Id === null) | ""
          ? (informacion_data.Area_Id = "")
          : await axios.get(
              config.urlApiConciliacion + "/areas/" + informacion_data.Area_Id
            );
      const subtema =
        (informacion_data.Subtema_Id === null) | ""
          ? (informacion_data.Subtema_Id = "")
          : await axios.get(
              config.urlApiConciliacion +
                "/subtemas/" +
                informacion_data.Subtema_Id
            );
      const tipo_servicio =
        (informacion_data.Tipo_servicio_Id === null) | ""
          ? (informacion_data.Tipo_servicio_Id = "")
          : await axios.get(
              config.urlApiConciliacion +
                "/tipos_servicio/" +
                informacion_data.Tipo_servicio_Id
            );
      const tipos_resultado =
        (informacion_data.Tipo_resultado_Id === null) | ""
          ? (informacion_data.Tipo_resultado_Id = "")
          : await axios.get(
              config.urlApiConciliacion +
                "/tipos_resultado/" +
                informacion_data.Tipo_resultado_Id
            );
      const inicio_conflicto =
        (informacion_data.Inicio_conflicto_Id === null) | ""
          ? (informacion_data.Inicio_conflicto_Id = "")
          : await axios.get(
              config.urlApiConciliacion +
                "/inicios_conflicto/" +
                informacion_data.Inicio_conflicto_Id
            );
      const solicitante =
        (informacion_data.Solicitante_servicio_Id === null) | ""
          ? (informacion_data.Solicitante_servicio_Id = "")
          : await axios.get(
              config.urlApiConciliacion +
                "/solicitantes_servicio/" +
                informacion_data.Solicitante_servicio_Id
            );
      informacion_data.Area_Id = area.data;
      informacion_data.Subtema_Id = subtema.data;
      informacion_data.Tipo_servicio_Id = tipo_servicio.data;
      if (informacion_data.Tipo_resultado_Id != "") {
        informacion_data.Tipo_resultado_Id = tipos_resultado.data;
      }

      informacion_data.Inicio_conflicto_Id = inicio_conflicto.data;
      informacion_data.Solicitante_servicio_Id = solicitante.data;
      datos = informacion_data;
    }
    return datos;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

datosPersonas.Historial = async (response) => {
  let datos = [];

  try {
    if (response.data != 0) {
      for await (const informacion_data of response.data) {
        if (typeof informacion_data.Solicitud_Id !== "number") {
          console.log("error");
          return datos;
        }
        const resp = await axios.get(
          config.urlApiConciliacion +
            "/solicitudes/" +
            informacion_data.Solicitud_Id
        );
        //console.log(resp.data)
        const historico = await axios.get(
          config.urlApiConciliacion +
            "/historicos_solicitud?Solicitud_Id=" +
            informacion_data.Solicitud_Id
        );

        for await (const historial of historico.data) {
          historial.Fecha = historial.Fecha.substring(
            0,
            historial.Fecha.indexOf("T")
          );
          const estado =
            (historial.Tipo_estado_Id === null) | ""
              ? (historial.Tipo_estado_Id = "")
              : await axios
                  .get(
                    config.urlApiConciliacion +
                      "/tipos_estado/" +
                      historial.Tipo_estado_Id
                  )
                  .then((result) => {
                    historial.Tipo_estado_Id = result.data.Nombre;
                  });
          datos[datos.length] = historial;
        }
        // datos.push(""+resp.data.Solicitud_Id)
        // historico.data[0].Tipo_estado_Id = estado.data
      }
    }
    return datos;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
datosPersonas.SolicitudesSearch = async (response, search) => {
  let datos = [];

  try {
    if (response.data != 0) {
      for await (const informacion_data of response.data) {
        if (informacion_data.Solicitud_Id == search) {
          const resp = await axios.get(
            config.urlApiConciliacion +
              "/solicitudes/" +
              informacion_data.Solicitud_Id
          );

          const historico = await axios.get(
            config.urlApiConciliacion +
              "/historicos_solicitud?Solicitud_Id=" +
              informacion_data.Solicitud_Id
          );

          //console.log(historico.data)
          if (historico.data.length > 0) {
            const estado =
              (historico.data[0].Tipo_estado_Id === null) | ""
                ? (historico.data.Tipo_estado_Id = "")
                : await axios
                    .get(
                      config.urlApiConciliacion +
                        "/tipos_estado/" +
                        historico.data[0].Tipo_estado_Id
                    )
                    .then((result) => {
                      historico.data.Tipo_estado_Id = result.data.Nombre;
                    });

            let data = {
              Solicitud_Id: informacion_data.Solicitud_Id,
              Fecha_registro: resp.data.Fecha_registro,
              Tipo_Estado: historico.data.Tipo_estado_Id,
            };

            datos.push(data);
          } else {
            data = {};
          }
        }
      }
    }
    return datos;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

datosPersonas.EliminarPersonasDeCitacion = async (req) => {
  let datos = {};

  try {
    for await (const informacion_data of req.body) {
      const personas = await axios.get(
        config.urlApiConciliacion +
          "/personas?Identificacion=" +
          informacion_data
      );
      const resp = await axios.get(
        config.urlApiConciliacion +
          "/relaciones_citacion_persona?Citacion_Id=" +
          req.params.id2 +
          "&Persona_Id=" +
          personas.data[personas.data.length - 1].Id
      );
      const eliminar = await axios.delete(
        config.urlApiConciliacion +
          "/relaciones_citacion_persona/" +
          resp.data[0].Id +
          "/"
      );

      datos[informacion_data] = resp.data;
    }

    return datos;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

datosPersonas.BuscarPersona = async (response, search) => {
  let datos = [];

  try {
    if (response.data.length > 0) {
      for await (const informacion_data of response.data) {
        // Incrementando el tamaño total.
        await axios
          .get(
            config.urlApiConciliacion +
              "/personas/" +
              informacion_data.Persona_Id +
              "?Identificacion=" +
              search.params.search
          )
          .then(async (result) => {
            const documento = await axios.get(
              config.urlApiConciliacion +
                "/tipos_documento/" +
                result.data.Tipo_documento_Id
            );
            const tipo = await axios.get(
              config.urlApiConciliacion +
                "/tipos_persona/" +
                result.data.Tipo_persona_Id
            );
            result.data.Tipo_documento_Id = documento.data;
            result.data.Tipo_persona_Id = tipo.data;
            datos.push(result.data);
          })
          .catch((err) => {
            console.log(err);
          });

        //  datos.push(resp.data)
      }
    }
    return datos;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

module.exports = datosPersonas;

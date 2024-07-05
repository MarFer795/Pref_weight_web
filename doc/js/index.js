// import turnos from "./turnos.js";

const turnosContainer = document.getElementById("turnosContainer");
if (turnosContainer){
  console.error('No se encontró el contenedor "turnosContainer"');  
}

const detalleContainer = document.getElementById("detalleContainer");
let indiceSeleccionado;

const clienteElement = document.getElementById("cliente");
const modeloElement = document.getElementById("modelo");
const problemaElement = document.getElementById("problema");
const maquinaElement = document.getElementById("maquina");
const opElement = document.getElementById("op");
const comentarioElement = document.getElementById("comentario");
const comentarioElement1 = document.getElementById("comentario1");
const comentarioElement2 = document.getElementById("comentario2");
const comentarioElement3 = document.getElementById("comentario3");
const comentarioElement4 = document.getElementById("comentario4");
const comentarioElement5= document.getElementById("comentario5");
const marcarTerminadoElement = document.getElementById("finalizar");


function createTarjeta(turno,index){
  console.log(turno);
  const nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.classList = "tarjeta";
  nuevaTarjeta.innerHTML = `
    <h3>Referencia: ${turno.cliente}</h3>
    <p>Parte :${turno.email}</p>
    <p>Peso Pref: ${turno.modelo}</p>
    <p>Peso 30%: ${turno.problema}</p>
    <p>Maquina: ${turno.maquina}</p>
    <p>OP: ${turno.op !== undefined ? turno.op : "OP no definida"}</p>
  `
  nuevaTarjeta.addEventListener("click", ()=> actualizarDetalle(index))
  turnosContainer.appendChild(nuevaTarjeta);
}

function actualizarTarjetas(){
  turnosContainer.innerHTML = "";
  turnos.forEach((turno,i) => {
    createTarjeta(turno,i);
  })
}

function actualizarDetalle(index){
  if(indiceSeleccionado !== undefined) turnosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",false);
  clienteElement.innerText = turnos[index].cliente;
  modeloElement.innerText = turnos[index].modelo;
  problemaElement.innerText = turnos[index].problema;
  detalleContainer.classList.toggle("escondido",false);
  indiceSeleccionado = index;
  turnosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",true);
}

finalizar.addEventListener("click",()=> marcarTerminado(indiceSeleccionado))

async function marcarTerminado(i){
  const updateTurno = turnos[i];
  updateTurno.comentario = comentarioElement.value;
  updateTurno.comentario1 = comentarioElement1.value;
  updateTurno.comentario2 = comentarioElement2.value;
  updateTurno.comentario3 = comentarioElement3.value;
  updateTurno.comentario4 = comentarioElement4.value;
  updateTurno.comentario5 = comentarioElement5.value;
  const res = await editTurno(updateTurno.id,updateTurno);
  if(res.status === 200){
    turnos = turnos.filter(turno => turno.id !== updateTurno.id);
    indiceSeleccionado = 0;
    await actualizarTarjetas()
    detalleContainer.classList.toggle("escondido",true);
    comentarioElement.value="";
    comentarioElement1.value="";
    comentarioElement2.value="";
    comentarioElement3.value="";
    comentarioElement4.value="";
    comentarioElement5.value="";
    
  }
}


const hoja = "Turnos";
let turnos;

async function getTurnos() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja + "!A:Q",
    });
  } catch (err) {
    document.getElementById("content").innerText = err.message;
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById("content").innerText = "No values found.";
    return;
  }

  turnos = [];
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[8] !== undefined) return;
    const nuevoTurno = {
      id: fila[0],
      maquina: fila[1],
      moldes: fila[2],
      op : fila [3],
      cliente: fila[4],
      email: fila[5],
      modelo: fila[6],
      problema: fila[7],
      fecha_terminado: fila[8],
      comentario: fila[9],
      comentario1: fila[10],
      comentario2: fila[11],
      comentario3: fila[12],
      comentario4: fila[13],
      comentario5: fila[14],
  };
    turnos.push(nuevoTurno);
  });
}

async function editTurno(id, contenido) {
  const update = [
    contenido.id,
    contenido.maquina,
    contenido.moldes,
    contenido.Op,
    contenido.cliente,
    contenido.email,
    contenido.modelo,
    contenido.problema,
    new Date().toISOString(),
    contenido.comentario,
    contenido.comentario1,
    contenido.comentario2,
    contenido.comentario3,
    contenido.comentario4,
    contenido.comentario5,
  ]
  const filaAEditar = parseInt(id)+1;
  response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET,
    range: `${hoja}!A${filaAEditar}:Q${filaAEditar}`,
    values: [update],
    valueInputOption:"USER_ENTERED"
  });
  return response;
}

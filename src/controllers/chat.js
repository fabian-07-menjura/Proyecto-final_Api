const { Chat } = require("../db.js");
const guardarchat = async (data) => {
  try {
    await Chat.create({
      room: data.room,
      remitente: data.remitente,
      receptor: data.receptor,
      mensaje: data.mensaje,
      time: data.time,
    });
    return "chat insertado correctamente";
  } catch (e) {
    console.log(e);
  }
};
const mensajesAntiguos = async (userLogin, receptor) => {
  try {
    let chatOld = await Chat.findAll();
    let arreglo = [];
    chatOld.forEach((e) => {
      arreglo.push(e.dataValues);
    });
    const mensajesAlumno = arreglo.filter(
      (e) =>
        (e.remitente === userLogin && e.receptor === receptor) ||
        (e.remitente === receptor && e.receptor === userLogin)
    );
    return mensajesAlumno;
  } catch (error) {
    console.log(error);
  }
};
const usuariosChat = async (userLogin) => {
  try {
    let usuarios = await Chat.findAll();
    let arrayUsers = [];
    usuarios.forEach((e) => {
      arrayUsers.push(e.dataValues);
    });
    let usuariosProfe = [];
    arrayUsers.forEach((e) => {
      if (e.remitente === userLogin && !usuariosProfe.includes(e.receptor)) {
        usuariosProfe.push(e.receptor);
      }
      if (e.receptor === userLogin && !usuariosProfe.includes(e.remitente)) {
        usuariosProfe.push(e.remitente);
      }
    });
    return usuariosProfe;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  guardarchat,
  mensajesAntiguos,
  usuariosChat,
};

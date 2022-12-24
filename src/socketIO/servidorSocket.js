const { guardarchat } = require("../controllers/chat.js");
const { mensajesAntiguos } = require("../controllers/chat.js");
const { usuariosChat } = require("../controllers/chat.js");
const eventosSocket = (io) => {
  let arrAlert = [];
  io.on("connection", (socket) => {
    console.log("nueva conexion");
    socket.on("join_room", (data) => {
      socket.join(data);
    });
    socket.on("solicitarMSG_pendientes", () => {
      socket.emit("alerta_mensajes", arrAlert);
    });
    socket.on("chat_abierto", (receptor) => {
      if (arrAlert.length) {
        arrAlert = arrAlert.filter((e) => e.remitente !== receptor);
      }
      socket.emit("alerta_mensajes", arrAlert);
    });

    socket.on("mensajes_de_profe", (data) => {
      socket.emit("mensajes_de_profe", data);
    });
    socket.on("mensaje_privado", (data) => {
      console.log(data);
      arrAlert.push(data);
      guardarchat(data);
      io.to(data.room).emit("mensaje_privado", data);
      io.to(data.room).emit("alerta_mensajes", arrAlert);
    });
    socket.on("mensajes_antiguos", async (userLogin, receptor) => {
      const mensajes = await mensajesAntiguos(userLogin, receptor);
      socket.emit("mensajes_antiguos", mensajes);
    });
    socket.emit("alerta_mensajes", arrAlert);
    socket.on("usuarios_chat", async (userLogin) => {
      let userchat = await usuariosChat(userLogin);
      socket.emit("usuarios_chat", userchat);
    });
    socket.on("alerta_mensajes", (data) => {
      arrAlert.push(data);
      socket.emit("alerta_mensajes", arrAlert);
    });
    socket.on("disconnect", () => {
      console.log("Usuario desconnectado");
    });
  });
};
module.exports = eventosSocket;

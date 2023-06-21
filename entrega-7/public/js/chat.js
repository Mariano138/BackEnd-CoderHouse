const socket = io();
let user;
const inputMSJ = document.getElementById("msj");

Swal.fire({
  title: "Bienvenido",
  input: "text",
  text: "Ingresa tu nombre",
  icon: "success",
  inputValidator: (value) => {
    return !value && "Por favor ingresa tu nombre";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("sayhello", user);
});

function render(data) {
  const html = data
    .map((elem, index) => {
      return `<div>
				<strong>${elem.user}:</strong>
                <em>${elem.message}</em>
            </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

inputMSJ.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    let message = inputMSJ.value;
    if (message.trim().length > 0) {
      socket.emit("message", { user, message });
      inputMSJ.value = "";
    }
  }
});

socket.on("messages", (data) => {
  render(data);
});

socket.on("connected", (data) => {
  Swal.fire({
    text: `Se conecto ${data}`,
    toast: true,
    position: "top-right",
  });
});
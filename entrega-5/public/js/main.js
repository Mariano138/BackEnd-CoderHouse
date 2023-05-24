
const socket = io();

const cards = document.getElementById("cards");

function sendProduct() {
  newProduct = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    code: document.getElementById("code").value,
    price: document.getElementById("price").value,
    status: document.getElementById("status").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
  };

  socket.emit("new-product", newProduct);
}

function deleteProduct(eLe) {
  socket.emit("del-product", eLe);
}

function render(data) {
  cards.innerHTML = "";
  data.forEach((element) => {
    let { title, description, code, stock, category, id } = element;
    let div = document.createElement("div");
    div.className = "col my-2";
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">Su estado es:
    ${element.description}
    <br />
    Codigo:
    ${element.code}
    <br />
    Stock:
    ${element.stock}
    <br />
    Categoria:
    ${element.category}
    <br />
    ID:
    ${element.id}</p>
    <button id="del${element.id}" class="btn btn-outline-danger" onclick="deleteProduct(${element.id})">Borrar Producto</button>
    </div>
  </div>`;
    cards.append(div);
  });
}

socket.on("products", (data) => {
  render(data);
});
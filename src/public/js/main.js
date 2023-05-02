const socket = io()
const ul = document.getElementById("list-products")
const formProduct = document.getElementById("formProducto")


socket.on('nuevoProducto', (prod) => {
    const product = JSON.parse(prod)
    const li = document.createElement("li")
    li.id = `product-${product.id}`
    li.textContent = product.title
    ul.appendChild(li)
})

socket.on("eliminarProducto", (id) => {
    const li = document.getElementById(`product-${id}`)
    li.remove()
})
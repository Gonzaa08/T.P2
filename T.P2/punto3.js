document.addEventListener("DOMContentLoaded", function() {
    let productos = [];
    let carrito = [];

    fetch("productos.json")
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar productos");
            return response.json();
        })
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        })
        .catch(error => console.error(error));

    function mostrarProductos(lista) {
        const contenedor = document.getElementById("productos");
        contenedor.innerHTML = "";
        lista.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <p>Stock: ${producto.stock}</p>
                <button ${producto.stock === 0 ? 'disabled' : ''} onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            `;
            contenedor.appendChild(div);
        });
    }

    document.getElementById("buscar").onclick = function () {
        const buscado = document.getElementById("buscador").value.toLowerCase();
        const filtrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscado));
        mostrarProductos(filtrados);
    }

    window.agregarAlCarrito = function(productId) {
        const producto = productos.find(p => p.id === productId);
        if (producto && producto.stock > 0) {
            carrito.push({ ...producto, cantidad: 1 });
            producto.stock--;
            actualizarCarrito();
            mostrarProductos(productos);
        }
    }

    function actualizarCarrito() {
        const carritoItems = document.getElementById("carrito-items");
        carritoItems.innerHTML = "";
        let total = 0;

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            const div = document.createElement("div");
            div.innerHTML = `${item.nombre} (x${item.cantidad}): $${subtotal.toFixed(2)} <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>`;
            carritoItems.appendChild(div);
        });

        document.getElementById("total").textContent = total.toFixed(2);
    }

    window.eliminarDelCarrito = function(productId) {
        const index = carrito.findIndex(item => item.id === productId);
        if (index !== -1) {
            carrito.splice(index, 1);
            actualizarCarrito();
            mostrarProductos(productos);
        }
    }

    document.getElementById("pedir-envio").onclick = function() {
        if (carrito.length > 0) {
            document.getElementById("mensaje-envio").textContent = "Pedido enviado";
            carrito = []; // Vaciar el carrito
            actualizarCarrito(); // Actualizar la visualización del carrito
        } else {
            document.getElementById("mensaje-envio").textContent = "El carrito está vacío.";
        }
    }
});

const modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'))

const on = (element, event, selector, handler) =>{
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click', '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    txtCodigo_editar.value = fila.children[0].innerHTML
    txtNombre_editar.value = fila.children[1].innerHTML
    txtNit_editar.value = fila.children[2].innerHTML
    txtPrecioCompra_editar.value = fila.children[3].innerHTML
    txtIVA_editar.value = fila.children[4].innerHTML
    txtPrecioVenta_editar.value = fila.children[5].innerHTML
    modalProducto.show()
})
const modalCliente = new bootstrap.Modal(document.getElementById('modalCliente'))

const on = (element, event, selector, handler) =>{
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
on(document, 'click', '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    txtCedula_editar.value = fila.children[0].innerHTML
    txtNombre_editar.value = fila.children[1].innerHTML
    txtTelefono_editar.value = fila.children[2].innerHTML
    txtCorreo_editar.value = fila.children[3].innerHTML
    txtDireccion_editar.value = fila.children[4].innerHTML
    modalCliente.show()
})

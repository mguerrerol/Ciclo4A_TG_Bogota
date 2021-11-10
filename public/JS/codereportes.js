const modalCliente = new bootstrap.Modal(document.getElementById('modalCliente'))

const on = (element, event, selector, handler) =>{
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click', '.btnListadoClientes', e =>{
    modalCliente.show()
})

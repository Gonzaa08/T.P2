// Alert
function showAlert() {
    const alertDialog = document.getElementById('alertDialog');
    document.getElementById('alertMessage').textContent = 'Esto es un mensaje de alerta';
    alertDialog.showModal();
}

function closeAlert() {
    document.getElementById('alertDialog').close();
}

// Confirm
function showConfirm() {
    const confirmDialog = document.getElementById('confirmDialog');
    document.getElementById('confirmMessage').textContent = '¿Estás seguro de continuar?';
    confirmDialog.showModal();
}

function confirmOk() {
    alert('Has confirmado');
    document.getElementById('confirmDialog').close();
}

function confirmCancel() {
    alert('Has cancelado');
    document.getElementById('confirmDialog').close();
}

// Prompt
function showPrompt() {
    const promptDialog = document.getElementById('promptDialog');
    document.getElementById('promptMessage').textContent = 'Introduce tu nombre:';
    promptDialog.showModal();
}

function promptOk() {
    const input = document.getElementById('promptInput').value;
    alert('Has ingresado: ' + input);
    document.getElementById('promptDialog').close();
}

function promptCancel() {
    alert('Operación cancelada');
    document.getElementById('promptDialog').close();
}

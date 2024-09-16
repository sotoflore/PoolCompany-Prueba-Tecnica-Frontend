const modalImagen = document.querySelector('#modal-image');
const btn = document.querySelector('#button');
const alertContainer = document.querySelector('#alert-container');
const form = document.querySelector('#form')
let currentYear = document.querySelector('#currentYear');


if (modalImagen) {
    modalImagen.addEventListener('show.bs.modal', handleModalShow )
    modalImagen.addEventListener('hidden.bs.modal', handleModalHide)
} 

function handleModalShow(event) {
    const link = event.relatedTarget;
    const routeImage = link.getAttribute('data-bs-imagen');

    const imagen = document.createElement('IMG');
    imagen.src = `./assets/images/pools/${routeImage}.jpg`;
    imagen.classList.add('img-fluid');
    imagen.alt = 'Imagen Galería';

    const contentModal = document.querySelector('.modal-body');
    contentModal.appendChild(imagen);
}

function handleModalHide() {
    const contentModal = document.querySelector('.modal-body');
    contentModal.textContent = '';
}

function showAlert(message, type) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertContainer.innerHTML = alertHtml;

    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            alert.classList.remove('show');
            alert.classList.add('fade');
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 150);
        }
    }, 3000); 
}

emailjs.init('wYRCaXw5C3PmN_VpX')

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) { 
    event.preventDefault();

    const fromName = document.getElementById('from_name').value.trim();
    const fromEmail = document.getElementById('from_email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fromName || !fromEmail || !message) {
        showAlert('Por favor, completa todos los campos.', 'danger');
        return;
    }

    if (!validateEmail(fromEmail)) {
        showAlert('Por favor, ingresa un email válido.', 'danger');
        return;
    }

    const btn = document.getElementById('button');
    btn.innerHTML = 'Enviando mensaje... <i class="bi bi-send"></i>';

    const serviceID = 'default_service';
    const templateID = 'template_o8gu7z3';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerHTML = 'Enviar mensaje <i class="bi bi-send"></i>';
            showAlert('¡Tu mensaje ha sido enviado exitosamente!', 'success');
            document.getElementById('form').reset();
        }, (err) => {
            btn.innerHTML = 'Intentar de nuevo <i class="bi bi-x-circle"></i>';
            showAlert('Ocurrió un error: ' + JSON.stringify(err), 'danger');
        });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

currentYear.textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50
    });
});

function closeNavbar() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
    }
}
document.addEventListener('click', closeNavbar);


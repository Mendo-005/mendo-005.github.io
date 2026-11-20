// Resalta en el menú la sección que está a la vista
const links = document.querySelectorAll('.nav nav a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => section && observer.observe(section));

// Formulario de contacto (Formspree)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const button = document.getElementById('form-button');

function showStatus(message, color) {
    status.textContent = message;
    status.style.color = color;
    status.hidden = false;
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    button.textContent = 'Sending...';
    button.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });

        if (response.ok) {
            showStatus('Thanks for your submission!', '#7CE3A1');
            form.reset();
        } else {
            const data = await response.json();
            const message = data.errors
                ? data.errors.map(error => error.message).join(', ')
                : 'Oops! There was a problem submitting your form';
            showStatus(message, '#FF8A80');
        }
    } catch (error) {
        showStatus('Oops! There was a problem submitting your form', '#FF8A80');
    }

    button.textContent = 'Send message';
    button.disabled = false;
});
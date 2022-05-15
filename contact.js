
const form  = document.getElementById('contactForm');

form.addEventListener('submit', (event) => {
    // handle the form data
    console.log("event before");
    event.preventDefault();
    console.log("event");
});
<script setup>
import { ref } from 'vue';

// Referencias reactivas para cada campo del formulario
const name = ref('');
const rut = ref('');
const cellphone = ref('');
const email = ref('');
const city = ref('');
const message = ref('');

// Refs para manejar el estado del envío
const submitting = ref(false);
const submissionStatus = ref(null); // Puede ser 'success', 'error', o null

// Función que se ejecuta al enviar el formulario
async function handleSubmit() {
    submitting.value = true;
    submissionStatus.value = null; // Reiniciar el estado antes de un nuevo intento

    try {
        const response = await fetch('https://formspree.io/f/xwpnozny', { // Asegúrate de que este URL de Formspree sea el correcto para tu formulario
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                name: name.value,
                rut: rut.value,
                cellphone: cellphone.value,
                email: email.value,
                city: city.value,
                message: message.value,
            }),
        });

        if (response.ok) {
            // Éxito en el envío
            submissionStatus.value = 'success';
            // Limpiamos los campos del formulario
            name.value = '';
            rut.value = '';
            cellphone.value = '';
            email.value = '';
            city.value = '';
            message.value = '';
        } else {
            // Hubo un error en la respuesta del servidor (ej. validación de Formspree)
            const data = await response.json(); // Intentar obtener más detalles del error
            console.error('Error del servidor Formspree:', data);
            throw new Error('Hubo un problema al procesar tu solicitud, por favor, intenta otra vez.');
        }
    } catch (error) {
        // Error en la conexión o en el envío
        console.error('Se produjo un error al enviar el formulario:', error);
        submissionStatus.value = 'error';
    } finally {
        // Se ejecuta siempre, al final del try/catch
        submitting.value = false;
    }
}
</script>

<template>
<div class="container pt-1 pb-4 page-section" id="acompanamiento">   
    <div class="row">
        <div class="col-11 col-md-11 col-lg-4 mx-auto my-4">
            <h2 class="py-3 form-title">¡ÚNETE A NOSOTR@S!</h2>
            <p class="form-text">Somos una organización sin fines de lucro
                que busca ayudar de forma integral a adultos y 
                adultas mayores, entregando asistencia psicosocial,
                fomentando el buen vivir y el respeto que merecen las 
                personas de tercera y cuarta edad. A través de asistencia 
                material, talleres integrativos culturales y acompañamiento 
                continuo.
            </p>
            <h4 class="form-bases pt-3 pb-1">Inscríbite como voluntario.</h4>
            <!-- <p class="form-bases-text">- Pertenecer bajo el <span class="form-bases-text-highlight">60%</span> en el Registro Social
                de Hogares.
            </p><br>
            <p class="form-bases-text-greetings">Si crees cumplir los requisitos, rellena el siguiente formulario y te contactaremos
                a la brevedad.<br>¡Te esperamos!
            </p> -->
        </div>

        <div class="col-12 col-md-12 col-lg-7">
        <div class="contact-form-container">
        <div class="card shadow-sm p-4">
            <form @submit.prevent="handleSubmit">
                <p class="text-end"><span class="required-data">*</span> <span class="optional-data">Indica datos requeridos</span></p>
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre <span class="required-data">*</span></label>
                    <input type="text" class="form-control" id="name" v-model="name" required>
                </div>
                <div class="mb-3">
                    <label for="rut" class="form-label">RUT <span class="required-data">*</span> <span class="optional-data">Sin puntos y con guión. Ej: 6123456-1</span></label>
                    <input type="text" class="form-control" id="rut" v-model="rut" required>
                </div>
                <div class="mb-3">
                    <label for="cellphone" class="form-label">Teléfono <span class="required-data">*</span></label>
                    <input type="tel" class="form-control" id="cellphone" v-model="cellphone" required>
                </div>
                <div class="mb-3">
                    <label for="city" class="form-label">Comuna <span class="required-data">*</span></label>
                    <input type="text" class="form-control" id="city" v-model="city" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email <span class="optional-data">(Opcional)</span></label>
                    <input type="email" class="form-control" id="email" v-model="email">
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Comentario <span class="optional-data">(Opcional)</span></label>
                    <textarea class="form-control" id="message" rows="4" v-model="message"></textarea>
                </div>
                <div class="d-grid gap-2 mb-3">
                <button type="submit" class="btn submit-button" :disabled="submitting">
                    <span v-if="submitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="submitting"> Enviando...</span>
                    <span v-else>Enviar Mensaje</span>
                </button>
                </div>
                <div v-if="submissionStatus === 'success'" class="alert alert-success mt-3" role="alert">
                    ¡Mensaje enviado con éxito! Te contactaremos a la brevedad.
                </div>
                <div v-if="submissionStatus === 'error'" class="alert alert-danger mt-3" role="alert">
                    Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo.
                </div>
            </form>
        </div>
        </div>
        </div>
    </div>
</div>
</template>

<style scoped>
/* Colores personalizados */
/* Estilos para el texto antes del form */
.form-title{
    color: var(--primary-color);
    font-weight: bold;
    font-family: 'Oswald', sans-serif;
    letter-spacing: 0.03rem;
    font-size: 2.4rem;
}

.form-text{
    font-size: 1.1rem;
    color: var(--text-color);
    font-weight: 500;
    line-height: 1.5;
    text-align: justify;
}

.form-bases{
    font-size: 1.6rem;
    color: orange;
    font-weight: bold;
    font-family: 'Oswald', sans-serif;
}

.form-bases-text{
    font-size: 1rem;
    color: var(--text-color);   
    font-weight: 500;
    line-height: 1.5;
    font-style: italic;
    text-align: justify;
}

.form-bases-text-highlight{
    color: var(--secondary-color);
    font-weight: bold;
}

.form-bases-text-greetings{
    font-size: 1rem;
    color: #333;
    font-weight: 600;
    line-height: 1.5;
    text-decoration: underline;
    text-align: justify;
}

.contact-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.card {
    width: 100%;
    border: none;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1); /* Sombra suave para el card */
    background-color: #e7e8ee;
}

.card-title {
    color: var(--primary-color) !important;
    font-weight: bold;
}

.form-label {
    color: #333; /* Color oscuro para las etiquetas */
    font-weight: 500;
}

.form-control:focus {
    border-color: #9CADFC;
    box-shadow: 0 0 0 0.25rem rgba(156, 173, 252, 0.25); /* Sombra de enfoque con el color secundario */
}

.required-data {
    color: orange;
    font-weight: bold;
}

.optional-data {
    color: gray;
    font-style: italic;
    font-size: 0.9rem;
    font-weight: 400;
}

.submit-button {
    background-color: #9CADFC;
    color: white;
    font-weight: bold;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

.submit-button:hover {
    background-color: #9c73c0; /* Un tono un poco más oscuro para el hover */
    border-color: #9c73c0;
    transform: translateY(-2px); /* Pequeño efecto de elevación al pasar el ratón */
}

.submit-button:disabled {
    background-color: #d1bde8; /* Color tenue cuando está deshabilitado */
    border-color: #d1bde8;
    cursor: not-allowed;
}

.alert-success {
    background-color: #e6ffed; /* Un verde claro */
    color: #28a745; /* Verde Bootstrap */
    border-color: #c3e6cb;
}

.alert-danger {
    background-color: #fff0f0; /* Un rojo claro */
    color: #dc3545; /* Rojo Bootstrap */
    border-color: #f5c6cb;
}
</style>
import { ref, computed } from 'vue';

// 1. Cargamos las noticias desde Local Storage o usamos datos iniciales si no hay nada.
const initialArticles = [
    { id: 1, slug: 'viviendo-en-la-pobreza-la-realidad-economica-de-los-adultos-mayores-en-chile', 
      image: 'blog1.webp', date: '31-08-2025', 
      title: 'Viviendo en la pobreza: La realidad económica de los adultos mayores en Chile.', 
      description: 'La pobreza en la vejez es un problema complejo que trasciende la falta de ingresos, ya que también implica la carencia de acceso a servicios básicos, como la salud, la educación y la vivienda digna...', 
      content: 'La pobreza en la vejez es un problema complejo que trasciende la falta de ingresos, ya que también implica la carencia de acceso a servicios básicos, como la salud, la educación y la vivienda digna. <br><br>Según el Instituto Nacional de Estadísticas (INE), en 2024, el 22% de los adultos mayores en Chile vivían en situación de pobreza, lo que representa más de 440.000 personas. Una de las principales causas de la pobreza en la vejez es la falta de acceso a una pensión digna. En Chile, muchas personas no tienen acceso a una pensión que les permita vivir con dignidad. Según un informe del Servicio Nacional del Adulto Mayor (SENAMA), en 2024, el 40% de los adultos mayores en Chile recibían una pensión mensual inferior a $150.000, lo que es insuficiente para cubrir las necesidades básicas. <br><br>La región del Biobío es una de las más afectadas por la pobreza en la vejez. Según un informe del Gobierno Regional del Biobío, en 2024, el 25% de los adultos mayores en la región vivían en situación de pobreza. Esto se traduce en más de 20.000 personas que no tienen acceso a una vida digna. <br><br>Una historia real que ilustra la situación de pobreza en la vejez en la región del Biobío es la de María, una mujer de 75 años que vive en la comuna de Concepción. María es viuda y no tiene hijos, lo que significa que no tiene una red de apoyo familiar. Ella recibe una pensión mensual de $120.000, lo que es insuficiente para cubrir sus necesidades básicas. María vive en una casa pequeña y húmeda, y no tiene acceso a servicios básicos como la electricidad y el agua potable. La historia de María es solo una de las muchas que existen en Chile y en la región del Biobío. <br><br>Es importante que se tomen medidas para abordar la pobreza en la vejez y garantizar que las personas mayores tengan acceso a una vida digna. Esto requiere una política integral que incluya la reforma del sistema de pensiones, el acceso a servicios básicos y la creación de programas de apoyo y protección para las personas mayores.' },
    { id: 2, slug: 'la-otra-pandemia-el-aumento-del-maltrato-hacia-los-adultos-mayores-en-chile', image: 'blog2.webp', date: '31-08-2025', 
      title: 'La otra pandemia: El aumento del maltrato hacia los adultos mayores en Chile. ', 
      description: 'Según un informe del Servicio Nacional del Adulto Mayor (SENAMA), en 2022, se registraron más de 1.100 denuncias de maltrato hacia adultos mayores en Chile. Esto representa un aumento del 30% con respecto al año anterior...', 
      content: 'El maltrato hacia los adultos mayores es un problema grave que puede tener consecuencias devastadoras para la salud y el bienestar de las víctimas. Según un informe del Servicio Nacional del Adulto Mayor (SENAMA), en 2022, se registraron más de 1.100 denuncias de maltrato hacia adultos mayores en Chile. Esto representa un aumento del 30% con respecto al año anterior.<br><br>El maltrato hacia los adultos mayores puede tomar muchas formas, incluyendo el abuso físico, emocional, financiero y la negligencia. El abuso físico puede incluir golpes, empujones y otros tipos de violencia. El abuso emocional puede incluir insultos, humillaciones y aislamiento. El abuso financiero puede incluir la explotación de los recursos económicos de la víctima. La negligencia puede incluir la falta de atención médica, la falta de alimentación y la falta de cuidado.<br><br>Una de las principales causas del maltrato hacia los adultos mayores es la falta de conciencia y educación sobre el tema. Muchas personas no reconocen los signos y señales de maltrato, lo que puede llevar a que las víctimas no reciban la ayuda que necesitan. Otra causa importante es la dependencia económica y emocional de la víctima respecto del agresor. En muchos casos, las víctimas dependen del agresor para su supervivencia, lo que puede hacer que sea difícil para ellas denunciar el maltrato.' },
    { id: 3, slug: 'suicidio-en-el-adulto-mayor-una-realidad-silenciada-pero-creciente-chile', image: 'blog3.webp', date: '31-08-2025', 
      title: 'Suicidio en el adulto mayor en Chile: Una realidad silenciada pero creciente.', 
      description: 'El suicidio en el adulto mayor es un tema delicado y de preocupación en Chile durante los últimos años. A pesar de que la tasa de suicidio en el país ha disminuido en general, la tasa de suicidio en el adulto mayor ha aumentado de manera preocupante...', 
      content: 'El suicidio en el adulto mayor es un tema delicado y complejo que ha sido objeto de estudio y preocupación en Chile durante los últimos años. A pesar de que la tasa de suicidio en el país ha disminuido en general, la tasa de suicidio en el adulto mayor ha aumentado de manera preocupante.<br><br>Una de las principales causas del suicidio en el adulto mayor en Chile es la depresión. Según un estudio realizado por la Universidad de Chile, el 60% de los adultos mayores que se suicidaron en el país en 2023 habían sido diagnosticados con depresión. Otros factores que pueden contribuir al suicidio en el adulto mayor incluyen la soledad, el aislamiento social, la pérdida de la pareja o de seres queridos, y la falta de acceso a servicios de salud mental.<br><br>Otro factor que puede contribuir al suicidio en el adulto mayor en Chile es la falta de conciencia y educación sobre la salud mental. Muchas personas en Chile no reconocen los signos y señales de la depresión y otros trastornos mentales, lo que puede llevar a que las personas que necesitan ayuda no la reciban.<br><br>Es importante destacar que el suicidio en el adulto mayor es un problema que requiere una atención inmediata y coordinada. Es fundamental que se tomen medidas para prevenir el suicidio en este grupo etario, incluyendo la educación y conciencia sobre la salud mental, el acceso a servicios de salud mental, y el apoyo y orientación para las personas que necesitan ayuda.'},
    { id: 4, slug: 'adultos-mayores-en-situacion-de-calle-un-problema-social-invisible-en-chile', image: 'blog4.webp', date: '31-08-2025', 
      title: 'Adultos mayores en situación de calle: Un problema social invisible en Chile.', 
      description: 'En 2024, se estimó que había más de 1.500 adultos mayores en situación de calle en Chile. Esto representa un aumento del 25% con respecto al año anterior...', 
      content: 'Según un informe del Ministerio de Desarrollo Social y Familia, en 2024, se estimó que había más de 1.500 adultos mayores en situación de calle en Chile. Esto representa un aumento del 25% con respecto al año anterior.<br><br>La situación de calle puede ser causada por una variedad de factores, incluyendo la pobreza, la falta de acceso a vivienda asequible, la enfermedad mental o física, y la falta de apoyo familiar o social. Muchos adultos mayores en situación de calle han sido obligados a abandonar sus hogares debido a la pobreza o la falta de acceso a vivienda asequible.<br><br>Una de las principales consecuencias de la situación de calle es la falta de acceso a servicios básicos como la alimentación, el agua potable y la atención médica. Esto puede llevar a problemas de salud graves, incluyendo la desnutrición, la enfermedad respiratoria y la enfermedad cardiovascular.' },
];

const articlesData = JSON.parse(localStorage.getItem('newsArticles')) || initialArticles;
export const articles = ref(articlesData);

// 2. Función para guardar las noticias en Local Storage
function saveArticles() {
    localStorage.setItem('newsArticles', JSON.stringify(articles.value));
}

// 3. Lógica para el carrusel (últimas 5 noticias)
export const recentArticles = computed(() => {
  // Ordena las noticias por fecha, de más nueva a más vieja, y toma las 5 primeras.
    return [...articles.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
});

// 4. Lógica para el modo administrador (añadir nueva noticia)
export function addArticle(newArticle) {
    const newId = Math.max(...articles.value.map(a => a.id)) + 1;
    const newSlug = newArticle.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50);

  articles.value.unshift({ // unshift() la añade al principio de la lista
    id: newId,
    slug: newSlug,
    image: newArticle.image || 'default.webp', // Asigna una imagen por defecto
    date: new Date().toISOString().slice(0, 10), // Fecha actual
    title: newArticle.title,
    description: newArticle.description,
    content: newArticle.content,
    });
  saveArticles(); // Guardamos los cambios
}

// 5. Lógica para editar una noticia existente
export function updateArticle(articleId, updatedData) {
  // Buscamos el índice del artículo que queremos actualizar
    const index = articles.value.findIndex(a => a.id === articleId);
    if (index !== -1) {
    // SI EXISTE, REEMPLAZA LA NOTICIA ANTIGUA POR LA NUEVA EDITADA Y ACTUALIZADA
    articles.value[index] = { ...articles.value[index], ...updatedData };
    saveArticles(); // Guardamos los cambios en Local Storage
    }
}
// 6. Lógica para eliminar una noticia
export function deleteArticle(articleId) {
  // Creamos un nuevo array que excluye el artículo con el id a eliminar
    articles.value = articles.value.filter(a => a.id !== articleId);
    saveArticles(); // Guardamos los cambios
}
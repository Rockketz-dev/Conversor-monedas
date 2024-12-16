const total = document.querySelector("#resultado"); // Párrafo donde mostrar el resultado
const inputMoneda = document.querySelector("#cifra"); // Monto a convertir
const selecMoneda = document.querySelector("#moneda"); // Selector de Moneda a Convertir
const botonCalcular = document.querySelector("#calcular"); // Botón para Calcular
const identificador = document.querySelector("#identificador"); // Identificador para el gráfico

// Función para obtener datos de la API
const getApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderDom(data); // Llamar a renderDom con los datos obtenidos
  } catch (error) {
    console.error("Error:", error);
    total.innerHTML = "Error al cargar los datos.";
  }
};

// Función para procesar y mostrar los datos
const renderDom = (data) => {
  const valorDolar = Math.trunc(data.dolar.valor); // Valor del dólar (sin decimales)
  const valorEuro = Math.trunc(data.euro.valor); // Valor del euro (sin decimales)

  const monedaDif = selecMoneda.value; // Obtener el valor seleccionado en el <select>
  const montoIngresado = parseFloat(inputMoneda.value); // Obtener el monto desde el input

  // Verificar si el monto ingresado es válido
  if (isNaN(montoIngresado) || montoIngresado <= 0) {
    total.innerHTML = "Por favor, ingresa un monto válido.";
    return;
  }

  // Calcular conversiones
  const calcularDolar = montoIngresado / valorDolar; // Usar montoIngresado aquí
  const calcularEuro = montoIngresado / valorEuro; // Usar montoIngresado aquí

  // Formato de Moneda
  const formatoDolar = calcularDolar.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatoEuro = calcularEuro.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  // Mostrar el resultado en el DOM según la moneda seleccionada
  if (monedaDif === "dolar") {
    identificador.innerHTML = `${data.dolar.codigo}`;
    total.innerHTML = `<p>Monto: ${formatoDolar} ${data.dolar.codigo}</p>`;
  } else if (monedaDif === "euro") {
    identificador.innerHTML = `${data.euro.codigo}`;
    total.innerHTML = `<p>Monto: ${formatoEuro} ${data.euro.codigo}</p>`;
  } else {
    total.innerHTML = `<p>Por favor selecciona una moneda válida.</p>`;
  }
};

// Función para manejar el evento de clic en el botón "Calcular"
const llamarApi = () => {
  // Llamar a la API
  getApi("https://mindicador.cl/api/");
};

// Escuchar el clic en el botón
botonCalcular.addEventListener("click", llamarApi);

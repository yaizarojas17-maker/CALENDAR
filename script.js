const form = document.getElementById("periodForm");
const results = document.getElementById("results");
const predictionList = document.getElementById("predictionList");

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const lastPeriodValue = document.getElementById("lastPeriod").value;
  const cycleLength = parseInt(
    document.getElementById("cycleLength").value
  );

  if (!lastPeriodValue || !cycleLength) {
    return;
  }

  // Crear fecha evitando problemas de zona horaria
  const [year, month, day] = lastPeriodValue.split("-").map(Number);

  const lastPeriod = new Date(year, month - 1, day);

  predictionList.innerHTML = "";

  // Calcular los próximos 3 periodos
  for (let i = 1; i <= 3; i++) {

    const predictedDate = new Date(lastPeriod);

    predictedDate.setDate(
      predictedDate.getDate() + (cycleLength * i)
    );

    const formattedDate = formatDate(predictedDate);

    const monthName = predictedDate.toLocaleDateString(
      "es-PE",
      {
        month: "long",
        year: "numeric"
      }
    );

    const prediction = document.createElement("div");

    prediction.className = "prediction";

    prediction.innerHTML = `
      <div class="month-number">
        ${i}
      </div>

      <div class="prediction-info">
        <h3>${capitalize(monthName)}</h3>
        <p>Fecha estimada: <strong>${formattedDate}</strong></p>
      </div>
    `;

    predictionList.appendChild(prediction);
  }

  results.classList.remove("hidden");

  // Llevar al usuario a los resultados
  results.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


// Formato de fecha
function formatDate(date) {

  return date.toLocaleDateString(
    "es-PE",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );
}


// Primera letra en mayúscula
function capitalize(text) {

  return text.charAt(0).toUpperCase() + text.slice(1);
}
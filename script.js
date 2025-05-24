// ===== ÁRBOL DE CORAZONES (como en el video) =====
const canvas = document.getElementById("arbolCanvas");
const ctx = canvas.getContext("2d");

// Ajustar canvas al tamaño de la pantalla
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Dibujar el árbol con corazones
function dibujarArbol() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2 - 50;
  const baseArbolY = centroY + 150;

  // Tronco del árbol
  ctx.fillStyle = "#5D4037";
  ctx.fillRect(centroX - 20, baseArbolY - 100, 40, 100);

  // Hojas en forma de corazón (como en el video)
  for (let i = 0; i < 200; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 120 * (1 - Math.sin(angle)) * Math.cos(angle);
    const x = centroX + radius * Math.cos(angle) * 0.8;
    const y = centroY - radius * Math.sin(angle) * 0.6;
    
    // Corazones individuales
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random() * 30 + 330}, 80%, 70%)`;
    dibujarCorazon(ctx, 0, 0, Math.random() * 8 + 5);
    ctx.restore();
  }
}

// Función para dibujar un corazón
function dibujarCorazon(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size, y + size, x, y + size);
  ctx.bezierCurveTo(x + size, y + size, x + size, y - size, x, y);
  ctx.fill();
}

// Corazones flotantes (efecto del video)
let corazonesFlotantes = [];
for (let i = 0; i < 30; i++) {
  corazonesFlotantes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 10 + 5,
    speed: Math.random() * 2 + 1,
    color: `hsl(${Math.random() * 30 + 330}, 80%, 70%)`
  });
}

// Animación
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dibujar árbol estático
  dibujarArbol();
  
  // Dibujar corazones flotantes
  corazonesFlotantes.forEach(corazon => {
    ctx.fillStyle = corazon.color;
    dibujarCorazon(ctx, corazon.x, corazon.y, corazon.size);
    corazon.y -= corazon.speed;
    if (corazon.y < -20) {
      corazon.y = canvas.height + 20;
      corazon.x = Math.random() * canvas.width;
    }
  });
  
  requestAnimationFrame(animar);
}

// ===== CONTADOR DE TIEMPO =====
function actualizarContador() {
  const fechaInicio = new Date("2024-11-08T00:00:00"); // Tu fecha de inicio
  const ahora = new Date();
  const diff = ahora - fechaInicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("contador").textContent = 
    `${dias} días ${horas.toString().padStart(2, '0')} horas ${minutos.toString().padStart(2, '0')} minutos ${segundos.toString().padStart(2, '0')} segundos`;

  setTimeout(actualizarContador, 1000);
}

// ===== INICIAR TODO =====
resizeCanvas();
animar();
actualizarContador();

window.addEventListener("resize", resizeCanvas);
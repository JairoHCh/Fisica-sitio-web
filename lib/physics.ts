export const PHYSICS_CONSTANTS = {
  g: 9.81, // Gravedad en m/s^2
};

export function calcularTrayectoria(v0: number, anguloDeg: number) {
  const { g } = PHYSICS_CONSTANTS;
  const anguloRad = (anguloDeg * Math.PI) / 180;
  
  const vx = v0 * Math.cos(anguloRad);
  const vy = v0 * Math.sin(anguloRad);
  
  const tiempoVuelo = (2 * vy) / g;
  const alturaMax = Math.pow(vy, 2) / (2 * g);
  const alcanceMax = vx * tiempoVuelo;

  return { vx, vy, tiempoVuelo, alturaMax, alcanceMax };
}
const pre = document.getElementById('solar-system');
const width = 180; // slightly larger
const height = 70;
let angle = 0;

function generateGalaxy(angle) {
  const output = Array.from({ length: height }, () => Array(width).fill(' '));
  const centerX = width / 2;
  const centerY = height / 2;
  const numArms = 6;
  const chars = ['.', ':', '+', '*', 'o', 'O'];
  const spiralTightness = 0.13; // tighter spiral
  const starCount = 2400;

  for (let i = 0; i < starCount; i++) {
    const arm = i % numArms;
    const t = i * 0.045; // slightly less radius expansion
    const radius = t;
    const theta = spiralTightness * t + (arm * Math.PI * 2 / numArms) + angle;

    const baseX = centerX + radius * Math.cos(theta + 0.6);
    const baseY = centerY + radius * Math.sin(theta) * 0.35 + radius * 0.03;

    for (let j = -1; j <= 1; j++) {
      for (let k = -1; k <= 1; k++) {
        const x = Math.floor(baseX + j);
        const y = Math.floor(baseY + k);
        const distFromCenter = Math.hypot(x - centerX, y - centerY);
        if (distFromCenter > 4 && x >= 0 && x < width && y >= 0 && y < height) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          output[y][x] = char;
        }
      }
    }
  }

  return output.map(row => row.join('')).join('\n');
}

function drawFrame() {
  const frame = generateGalaxy(angle);
  pre.textContent = frame;
  angle += 0.0015; // slower rotation
  requestAnimationFrame(drawFrame);
}

drawFrame();

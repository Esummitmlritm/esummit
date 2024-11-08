const starsContainer = document.getElementById('stars');
const stars = [];
const glowRadius = 100;
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.random() * 100 + 'vw';  
  star.style.top = Math.random() * 100 + 'vh';  
  star.style.setProperty('--drift-x', Math.random());
  star.style.setProperty('--drift-y', Math.random());
  starsContainer.appendChild(star);
  stars.push(star);
}
for (let i = 0; i < 100; i++) {
  createStar();
}
function connectStars() {
  document.querySelectorAll('.line').forEach(line => line.remove());
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const star1 = stars[i];
      const star2 = stars[j];
      const star1Rect = star1.getBoundingClientRect();
      const star2Rect = star2.getBoundingClientRect();

      const distance = Math.hypot(star1Rect.left - star2Rect.left, star1Rect.top - star2Rect.top);
      if (distance < 100) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.width = `${distance}px`;  
        const angle = Math.atan2(star2Rect.top - star1Rect.top, star2Rect.left - star1Rect.left) * (180 / Math.PI);
        line.style.transform = `rotate(${angle}deg)`;  
        line.style.left = `${star1Rect.left + star1Rect.width / 2}px`;  
        line.style.top = `${star1Rect.top + star1Rect.height / 2}px`;  

        starsContainer.appendChild(line);
      }
    }
  }
}
setInterval(connectStars, 100);
document.addEventListener('mousemove', (e) => {
  stars.forEach(star => {
    const starRect = star.getBoundingClientRect();
    const starX = starRect.left + starRect.width / 2;
    const starY = starRect.top + starRect.height / 2;
    const distance = Math.hypot(e.clientX - starX, e.clientY - starY);
    if (distance < glowRadius) {
      star.style.transform = 'scale(1.5)';  
      star.style.boxShadow = '0 0 15px 6px rgba(255, 255, 255, 0.8)'; 
      star.style.opacity = 1;
    } else {
      star.style.transform = 'scale(1)'; 
      star.style.boxShadow = 'none'; 
      star.style.opacity = 0.8;
    }
  });
});

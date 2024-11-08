const sponsorsContainer = document.getElementById('sponsors');
const logos = sponsorsContainer.innerHTML;
sponsorsContainer.innerHTML += logos;
sponsorsContainer.addEventListener('animationiteration', () => {
    sponsorsContainer.style.transform = 'translateX(0)';
});

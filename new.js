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

const febHolidays = [
    "Ideathon", "Hackathon", "Internship Fair", "Startup Expo",
    "Auto Expo", "Keynote Session", "Panel Discussion", "Hello", "Esummit", "IIC",
    "Meghanad", "Akhil", "Mithresh", "Rochan"
];

const eventDetails = [
    "Pitch your idea and get sponsors for your idea.",
    "24hrs hackathon at college will be a crazy time to spend.",
    "Grab an internship with your skills.",
    "Pitch your startup idea and get rights for it.",
    "Come and experience a wide variety of cars and bikes.",
    "Experience stories from great speakers.",
    "Wild people will come and interact.",
    "Hello people.",
    "Esummit 2k24, a grand event coming ahead.",
    "IIC - Innovation and Incubation Center.",
    "Meghanad Reddy, indie game developer.",
    "Akhil, a tension candidate.",
    "Mithresh, known for his unique style.",
    "Rochan, a brilliant candidate."
];

const eventImages = [
    "images/coming.png", "images/hackathon.jpg", "images/internship.jpg", 
    "images/startup.jpg", "images/autoexpo.jpg", "images/keynote.jpg", 
    "images/panel.jpg", "images/hello.jpg", "images/esummit.jpg", 
    "images/iic.jpg", "images/meghanad.jpg", "images/akhil.jpg", 
    "images/mithresh.jpg", "images/rochan.jpg"
];

const eventLinks = [
    "https://docs.google.com/forms/d/e/1FAIpQLSdTRyfkcQv2uxBZIytQn6IKyKZvLyeWQpFUCG-4MeLngq2PWA/viewform", "https://link-hackathon.com", "https://link-internship.com",
    "https://link-startup.com", "https://link-autoexpo.com", "https://link-keynote.com",
    "https://link-panel.com", "https://link-hello.com", "https://link-esummit.com",
    "https://link-iic.com", "https://link-meghanad.com", "https://link-akhil.com",
    "https://link-mithresh.com", "https://link-rochan.com"
];

const ulEl = document.querySelector("ul");
const eventDetailsEl = document.getElementById("eventDetails");
const eventInfoEl = document.querySelector(".event-info");
const modalBody = document.getElementById("modalBody");
const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
const registerButtonPC = document.getElementById("registerbutton");
const d = new Date();
let daynumber = d.getMonth() === 1 ? d.getDate() - 1 : 0;
let activeIndex = daynumber;
const rotate = -360 / febHolidays.length;
let startY, diffY, isDragging = false;

init();

function init() {
    febHolidays.forEach((holiday, idx) => {
        const liEl = document.createElement("li");
        liEl.style.setProperty("--day_idx", idx);
        liEl.innerHTML = `<time datetime="2022-02-${idx + 1}">${idx + 1}</time><span>${holiday}</span>`;
        ulEl.append(liEl);

        // Add click event for both PC and Mobile views
        liEl.addEventListener('click', () => {
            adjustDay(idx - daynumber);
            updateEventInfo(activeIndex);
            eventModal.show();
        });
    });
    ulEl.style.setProperty("--rotateDegrees", rotate);

    adjustDay(0);

    // Enable swipe functionality
    ulEl.addEventListener("pointerdown", (e) => {
        startY = e.clientY;
        isDragging = true;
        ulEl.setPointerCapture(e.pointerId);
    });

    ulEl.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        diffY = e.clientY - startY;
        if (Math.abs(diffY) > 20) {
            adjustDay(diffY > 0 ? 1 : -1);
            startY = e.clientY;
        }
    });

    ulEl.addEventListener("pointerup", () => {
        isDragging = false;
        startY = null;
    });

    ulEl.addEventListener("pointercancel", () => {
        isDragging = false;
        startY = null;
    });

    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                adjustDay(-1);
                break;
            case "ArrowDown":
                adjustDay(1);
                break;
            default:
                return;
        }
    });
}

function adjustDay(nr) {
    daynumber += nr;
    ulEl.style.setProperty("--currentDay", daynumber);

    const activeEl = document.querySelector("li.active");
    if (activeEl) activeEl.classList.remove("active");

    activeIndex = (activeIndex + nr + febHolidays.length) % febHolidays.length;
    const newActiveEl = document.querySelector(`li:nth-child(${activeIndex + 1})`);
    document.body.style.backgroundColor = "black";

    newActiveEl.classList.add("active");

    // Update event details and image for PC view
    updateEventInfo(activeIndex);
}

function updateEventInfo(index) {
    eventDetailsEl.innerHTML = `
        <img src="${eventImages[index]}" alt="Event Poster" class="event-img">
        <p>${eventDetails[index]}</p>
    `;

    // Update event details and image for the modal on mobile
    modalBody.innerHTML = `
        <img src="${eventImages[index]}" alt="Event Poster" class="event-img">
        <p>${eventDetails[index]}</p>
        <button id="modalRegisterButton" class="btn btn-1">Register Now</button>
    `;

    // Show event info on PC view
    eventInfoEl.classList.add('active');

    // Set register button link for PC and mobile
    registerButtonPC.onclick = () => window.open(eventLinks[index], '_blank');
    document.getElementById("modalRegisterButton").onclick = () => window.open(eventLinks[index], '_blank');
}
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
    "images/coming.png", "images/coming.png", "images/coming.png", 
    "images/coming.png", "images/coming.png", "images/coming.png", 
    "images/coming.png", "images/coming.png", "images/coming.png", 
    "images/coming.png", "images/coming.png", "images/coming.png", 
    "images/coming.png", "images/coming.png"
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

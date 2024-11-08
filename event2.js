const febHolidays = [
    "Dark Chocolate Day", "Groundhog Day", "Carrot Cake Day", "Wear Red Day",
    "Weatherperson's Day", "Chopsticks Day", "Periodic Table Day", "Kite Flying Day",
    "Pizza Day", "Umbrella Day", "Inventor's Day", "Global Movie Day", "Tortellini Day",
    "Valentine's Day", "Gumdrop Day", "Do a Grouch a Favor Day", "Cabbage Day",
    "Battery Day", "Chocolate Mint Day", "Love Your Pet Day", "President's Day",
    "Cook a Sweet Potato Day", "Tile Day", "Toast Day", "Clam Chowder Day",
    "Pistachio Day", "Polar Bear Day", "Tooth Fairy Day"
];

const eventDetails = [
    "Celebrate with some delicious dark chocolate.",
    "Find out if we’ll have six more weeks of winter.",
    "Enjoy a slice of delicious carrot cake.",
    "Wear red to raise awareness about heart disease.",
    "Thank your local weatherperson for their forecasts.",
    "Practice your chopstick skills with your favorite meal.",
    "Learn about the periodic table and its elements.",
    "Fly a kite and enjoy the breeze.",
    "Indulge in a slice of pizza from your favorite place.",
    "Keep yourself dry with a stylish umbrella.",
    "Celebrate inventors and their amazing creations.",
    "Watch a global movie to celebrate cinema.",
    "Enjoy a plate of delicious tortellini.",
    "Celebrate love and affection with Valentine's Day.",
    "Snack on some tasty gumdrops.",
    "Do something nice for someone who's grouchy.",
    "Cook up some cabbage in your favorite recipe.",
    "Make sure your batteries are charged and ready.",
    "Indulge in some chocolate mint treats.",
    "Show love for your pets.",
    "Celebrate past presidents and their contributions.",
    "Cook up a sweet potato dish.",
    "Appreciate the beauty of tiles in your home.",
    "Toast to a great day with your favorite drink.",
    "Enjoy a bowl of clam chowder.",
    "Snack on some pistachios.",
    "Learn about polar bears and their habitats.",
    "Leave a coin for the tooth fairy."
];

const ulEl = document.querySelector("ul");
const eventDetailsEl = document.getElementById("eventDetails");
const eventInfoEl = document.querySelector(".event-info");
const modalBody = document.getElementById("modalBody");
const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
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

        // Add click event for all devices
        liEl.addEventListener('click', () => {
            adjustDay(idx - daynumber);
            eventInfoEl.classList.add('active');
            modalBody.textContent = eventDetails[activeIndex];
            eventModal.show();
        });
    });
    ulEl.style.setProperty("--rotateDegrees", rotate);
    adjustDay(0);

    // Continuous swipe handling for smooth scrolling
    ulEl.addEventListener("pointerdown", (e) => {
        startY = e.clientY;
        isDragging = true;
        ulEl.setPointerCapture(e.pointerId);
    });

    ulEl.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        
        diffY = e.clientY - startY;
        if (Math.abs(diffY) > 20) { // Adjust sensitivity threshold
            adjustDay(diffY > 0 ? 1 : -1);
            startY = e.clientY; // Update start point for continuous adjustment
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

    // Optional: Allow keyboard navigation for accessibility
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

    // Update event details
    eventDetailsEl.textContent = eventDetails[activeIndex];
}

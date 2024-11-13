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
  "coming.png", "coming.png", "coming.png", 
  "coming.png", "coming.png", "coming.png", 
  "coming.png", "coming.png", "coming.png", 
  "coming.png", "coming.png", "coming.png", 
  "coming.png", "coming.png"
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
            updateEventInfo(idx);
            eventModal.show();
        
    });
});

  ulEl.style.setProperty("--rotateDegrees", rotate);

  adjustDay(0);

  // Enable swipe functionality for carousel on mobile
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

const cardsContainer = document.querySelector(".card-carousel");
const cardsController = document.querySelector(".card-carousel + .card-controller")

class DraggingEvent {
  constructor(target = undefined) {
    this.target = target;
  }
  
  event(callback) {
    let handler;
    
    this.target.addEventListener("mousedown", e => {
      e.preventDefault()
      
      handler = callback(e)
      
      window.addEventListener("mousemove", handler)
      
      document.addEventListener("mouseleave", clearDraggingEvent)
      
      window.addEventListener("mouseup", clearDraggingEvent)
      
      function clearDraggingEvent() {
        window.removeEventListener("mousemove", handler)
        window.removeEventListener("mouseup", clearDraggingEvent)
      
        document.removeEventListener("mouseleave", clearDraggingEvent)
        
        handler(null)
      }
    })
    
    this.target.addEventListener("touchstart", e => {
      handler = callback(e)
      
      window.addEventListener("touchmove", handler)
      
      window.addEventListener("touchend", clearDraggingEvent)
      
      document.body.addEventListener("mouseleave", clearDraggingEvent)
      
      function clearDraggingEvent() {
        window.removeEventListener("touchmove", handler)
        window.removeEventListener("touchend", clearDraggingEvent)
        
        handler(null)
      }
    })
  }
  
  // Get the distance that the user has dragged
  getDistance(callback) {
    function distanceInit(e1) {
      let startingX, startingY;
      
      if ("touches" in e1) {
        startingX = e1.touches[0].clientX
        startingY = e1.touches[0].clientY
      } else {
        startingX = e1.clientX
        startingY = e1.clientY
      }
      

      return function(e2) {
        if (e2 === null) {
          return callback(null)
        } else {
          
          if ("touches" in e2) {
            return callback({
              x: e2.touches[0].clientX - startingX,
              y: e2.touches[0].clientY - startingY
            })
          } else {
            return callback({
              x: e2.clientX - startingX,
              y: e2.clientY - startingY
            })
          }
        }
      }
    }
    
    this.event(distanceInit)
  }
}


class CardCarousel extends DraggingEvent {
  constructor(container, controller = undefined) {
    super(container)
    
    // DOM elements
    this.container = container
    this.controllerElement = controller
    this.cards = container.querySelectorAll(".card")
    
    // Carousel data
    this.centerIndex = (this.cards.length - 1) / 2;
    this.cardWidth = this.cards[0].offsetWidth / this.container.offsetWidth * 100
    this.xScale = {};
    
    // Resizing
    window.addEventListener("resize", this.updateCardWidth.bind(this))
    
    if (this.controllerElement) {
      this.controllerElement.addEventListener("keydown", this.controller.bind(this))      
    }

    
    // Initializers
    this.build()
    
    // Bind dragging event
    super.getDistance(this.moveCards.bind(this))
    this.container.addEventListener("wheel", this.handleScroll.bind(this))
  }
  
  updateCardWidth() {
    this.cardWidth = this.cards[0].offsetWidth / this.container.offsetWidth * 100
    
    this.build()
  }
  
  build(fix = 0) {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex;
      const scale = this.calcScale(x)
      const scale2 = this.calcScale2(x)
      const zIndex = -(Math.abs(i - this.centerIndex))
      
      const leftPos = this.calcPos(x, scale2)
     
      
      this.xScale[x] = this.cards[i]
      
      this.updateCards(this.cards[i], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex
      })
    }
  }
  
  
  controller(e) {
    const temp = {...this.xScale};
      
      if (e.keyCode === 39) {
        // Left arrow
        for (let x in this.xScale) {
          const newX = (parseInt(x) - 1 < -this.centerIndex) ? this.centerIndex : parseInt(x) - 1;

          temp[newX] = this.xScale[x]
        }
      }
      
      if (e.keyCode == 37) {
        // Right arrow
        for (let x in this.xScale) {
          const newX = (parseInt(x) + 1 > this.centerIndex) ? -this.centerIndex : parseInt(x) + 1;

          temp[newX] = this.xScale[x]
        }
      }
      
      this.xScale = temp;
      
      for (let x in temp) {
        const scale = this.calcScale(x),
              scale2 = this.calcScale2(x),
              leftPos = this.calcPos(x, scale2),
              zIndex = -Math.abs(x)

        this.updateCards(this.xScale[x], {
          x: x,
          scale: scale,
          leftPos: leftPos,
          zIndex: zIndex
        })
      }
  }
  
  calcPos(x, scale) {
    let formula;
    
    if (x < 0) {
      formula = (scale * 100 - this.cardWidth) / 2
      
      return formula

    } else if (x > 0) {
      formula = 100 - (scale * 100 + this.cardWidth) / 2
      
      return formula
    } else {
      formula = 100 - (scale * 100 + this.cardWidth) / 2
      
      return formula
    }
  }
  
  updateCards(card, data) {
    if (data.x || data.x == 0) {
      card.setAttribute("data-x", data.x)
    }
    
    if (data.scale || data.scale == 0) {
      card.style.transform = `scale(${data.scale})`

      if (data.scale == 0) {
        card.style.opacity = data.scale
      } else {
        card.style.opacity = 1;
      }
    }
   
    if (data.leftPos) {
      card.style.left = `${data.leftPos}%`        
    }
    
    if (data.zIndex || data.zIndex == 0) {
      if (data.zIndex == 0) {
        card.classList.add("highlight")
      } else {
        card.classList.remove("highlight")
      }
      
      card.style.zIndex = data.zIndex  
    }
  }
  
  calcScale2(x) {
    let formula;
   
    if (x <= 0) {
      formula = 1 - -1 / 5 * x
      
      return formula
    } else if (x > 0) {
      formula = 1 - 1 / 5 * x
      
      return formula
    }
  }
  
  calcScale(x) {
    const formula = 1 - 1 / 5 * Math.pow(x, 2)
    
    if (formula <= 0) {
      return 0 
    } else {
      return formula      
    }
  }
  
  checkOrdering(card, x, xDist) {    
    const original = parseInt(card.dataset.x)
    const rounded = Math.round(xDist)
    let newX = x
    
    if (x !== x + rounded) {
      if (x + rounded > original) {
        if (x + rounded > this.centerIndex) {
          
          newX = ((x + rounded - 1) - this.centerIndex) - rounded + -this.centerIndex
        }
      } else if (x + rounded < original) {
        if (x + rounded < -this.centerIndex) {
          
          newX = ((x + rounded + 1) + this.centerIndex) - rounded + this.centerIndex
        }
      }
      
      this.xScale[newX + rounded] = card;
    }
    
    const temp = -Math.abs(newX + rounded)
    
    this.updateCards(card, {zIndex: temp})

    return newX;
  }
  
  moveCards(data) {
    let xDist;
    
    if (data != null) {
      this.container.classList.remove("smooth-return")
      xDist = data.x / 250;
    } else {

      
      this.container.classList.add("smooth-return")
      xDist = 0;

      for (let x in this.xScale) {
        this.updateCards(this.xScale[x], {
          x: x,
          zIndex: Math.abs(Math.abs(x) - this.centerIndex)
        })
      }
    }

    for (let i = 0; i < this.cards.length; i++) {
      const x = this.checkOrdering(this.cards[i], parseInt(this.cards[i].dataset.x), xDist),
            scale = this.calcScale(x + xDist),
            scale2 = this.calcScale2(x + xDist),
            leftPos = this.calcPos(x + xDist, scale2)
      
      
      this.updateCards(this.cards[i], {
        scale: scale,
        leftPos: leftPos
      })
    }
  }
}

const carousel = new CardCarousel(cardsContainer)
const sponsorsContainer = document.getElementById('sponsors');
const logos = sponsorsContainer.innerHTML;
sponsorsContainer.innerHTML += logos;
sponsorsContainer.addEventListener('animationiteration', () => {
    sponsorsContainer.style.transform = 'translateX(0)';
});

const containerEl = document.querySelector(".container");
let startX = 0;
let endX = 0;

// Start touch event
container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

// End touch event
container.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

// Swipe detection function
function handleSwipe() {
    const threshold = 50; // Minimum swipe distance in pixels
    if (startX - endX > threshold) {
        // Swipe left
        adjustDay(1);
    } else if (endX - startX > threshold) {
        // Swipe right
        adjustDay(-1);
}
}

window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);


function flipCard(card) {
  const allCards = document.querySelectorAll('.unique-card');  // Select all unique cards

  // Check if any other cards are flipped, if yes, flip them back
  allCards.forEach(otherCard => {
    if (otherCard !== card && otherCard.classList.contains('flipped')) {
      otherCard.classList.remove('flipped');
    }
  });

  // Toggle the flipped state for the clicked card
  card.classList.toggle('flipped');
}

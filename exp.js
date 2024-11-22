
const febHolidays = [
  "E-Summit","Keynote Session", "Startup Expo", "Internship Fair", "Mock Interviews",
  "Fire Chat", "Networking Lounge", "Workshop & Master Class", "Career Guidance Program", "Hackthon", "Board Room",
  "Ideathon", "Entrepreneurship Quiz", "Battle of Bands", "Virtual Trading League" , "Panel Discussion"
];

const eventDetails = [
  "the e-summit2k24",
  "Inspiration from Visionary Leaders Listen to inspiringstories and valuable insights from successfulentrepreneurs, industry experts, and thought leaders in ourKeynote Session",
  "Showcasing Innovation and Enterprise Explore the Startup Expo, where emerging entrepreneurs showcase their products, prototypes, and services.",
  "Connecting Talent with Opportunity The Internship Fairconnects students with leading companies offeringinternship opportunities across various fields",
  "Practice , prepare , and Perfect Prepare for your next career move with our Mock Interviews! Led by HR Professionals and industry experts ",
  "Join our exclusive Fireside Chat with a renowned startup founder to gain insights, hear their inspiring journey, and receive practical advice",
  "Expand your professional network and forge lasting connections at our exlusive Network Lounge",
  "Connecting Talent with Opportunity The Internship Fairconnects students with leading companies offeringinternship opportunities across various fields",
  "Plan Your Path with Expert Advice Get personalized career advice from seasoned professionals in our Career Guidance sessions",
  "Code the Future Our Hackathon brings together tech enthusiasts andproblem-solvers for an immersive coding experience",
  "Where Strategy Meets Execution In this high-stakes simulation, teams step intothe shoes of executives to tackle real-world business challenges",
  "Ignite Innovation and Solve Real-World Challengesp",
  "Test Your Business Savvy Dive into the world of startups, innovation, and business strategy with our Entrepreneurship Quiz.",
  "Battle of Bands is an exciting competition where talented bandscompete live, showcasing their music, energy, and creativity.",
  "Connecting Markets, Unleashing Opportunities",
  "Engage with Experts, Gain Insights Join industryleaders, innovators, and entrepreneurs as they delveinto thought-provoking topics in a dynamic paneldiscussion."
];

const eventImages = [
  "mainposter.jpg","keynote.png", "startupexpro.png", "intershipfair.jpg", 
  "mockinterview.png", "firechat.png", "networklougue.png", 
  "workshop.png", "career.png", "hackathon.png", 
  "board.png", "ideathon.jpg", "entro.png", 
  "battle.png", "vitualTrade.jpg","paneldiscussion.png"
];

const eventLinks = [
  "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view",
  "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view",
  "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view",
  "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view",
  "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view", "https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view","https://pages.razorpay.com/pl_PLYjKmhBfvFxRf/view"
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
      // Detect if the device is mobile
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  
      // Perform your logic only for mobile
      if (isMobile) {
          adjustDay(idx - daynumber);
          updateEventInfo(activeIndex);
          updateEventInfo(idx);
          eventModal.show(); // Only show modal on mobile
      } else {
          adjustDay(idx - daynumber);
          updateEventInfo(activeIndex);
          updateEventInfo(idx);

          // Perform PC-specific actions if needed
      }
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
        e.preventDefault();
        adjustDay(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
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

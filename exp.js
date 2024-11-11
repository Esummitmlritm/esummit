@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
  @import 'normalize.css';

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  
  body {
      display: grid;
      place-items: center;
      min-height: 100vh;
      background: hsl(0 0% 90%);
      color: hsl(0 0% 10%);
      font-family: 'Roboto', sans-serif;

  }
  
  body::before {
      --size: 60px;
      --line: hsl(0 0% 10% / 0.5);
      content: '';
      height: 100vh;
      width: 100vw;
      position: fixed;
      background: linear-gradient(
                  90deg,
                  var(--line) 1px,
                  transparent 1px var(--size)
              )
              50% 50% / var(--size) var(--size),
          linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
              var(--size) var(--size);
      mask: linear-gradient(-15deg, transparent 50%, white);
      top: 0;
      transform-style: flat;
      pointer-events: none;
      z-index: -1;
      font-family: 'Roboto', sans-serif;
  }
  
  h1 {
      position: relative;
      font-size: clamp(2rem, 3vw + 1rem, 8rem);
      font-family: 'Roboto', sans-serif;
  }
  
  h2,
  p {
      margin: 0;
  }
  
  :root {
      --lower: 150px;
      --upper: 290px;
      --mid: 40vmin;
      --ratio: 0.075;
      --gap: clamp(
          var(--lower) * var(--ratio),
          var(--mid) * var(--ratio),
          var(--upper) * var(--ratio)
      );
  }
  
  section,
  article {
      height: 100%;
      position: relative;
      width: 100%;
      max-width: 40ch;
      z-index: 1;
  }
  
  header {
      height: 50vh;
      display: grid;
      place-items: end;
  }
  body > section {
      height: 25vh;
  }
  /* These determine the scroll distance for change  */
  main > section {
      height: 80vh;
  }
  
  h1 span {
      font-size: 0.5em;
      display: block;
      text-align: center;
      font-variant: small-caps;
  }
  
  h1::after {
      position: absolute;
      top: 0;
      left: 100%;
      font-size: 0.75em;
  }
  
  .centered {
      display: grid;
      place-items: center;
      width: 100%;
      max-width: 100%;
  }
  
  .centered h2 {
      font-size: clamp(1.5rem, 2vw + 1rem, 6rem);
  }
  
  .tiles {
      display: grid;
      width: clamp(var(--lower), var(--mid), var(--upper));
      display: flex;
      flex-direction: column-reverse;
      justify-self: center;
      translate: 0 calc(50% + (var(--gap)));
  }
  .tile {
      height: var(--gap);
      position: relative;
  }
  hr {
      height: 2px;
      width: 100%;
  }
  @media(min-width: 768px) {
      hr {
          width: calc(100% + 4rem);
          translate: -4rem 0;
      }
      .tiles {
          justify-self: flex-end;
      }
  }
  .tile::after,
  .tile::before {
      content: '';
      background-image: url(https://assets.codepen.io/605876/translucent-panel.png);
      position: absolute;
      width: 100%;
      aspect-ratio: 1160 / 521;
      background-size: cover;
      top: 50%;
      left: 30%;
      translate: -50% -50%;
  }
  .tile::after {
      opacity: 0;
      background-image: url(https://assets.codepen.io/605876/color-panel.png);
      filter: hue-rotate(var(--r, 0deg));
  }
  .tile:nth-of-type(1)::after {
      background-image: url(https://assets.codepen.io/605876/bottom-panel.png);
      filter: hue-rotate(var(--r, 0deg)) brightness(2);
  }
  .tile:nth-of-type(4)::after {
      opacity: 1;
  }
  body, 
article p, 
header, 
footer, 
.title-wrap, 
.content-wrap {
    color: white;
}

body {
    display: grid;
    place-items: center;
    min-height: 100vh;
    background: hsl(0 0% 90%);
    font-family: 'Libre Baskerville', 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
        Helvetica, Arial, sans-serif, system-ui;
    background-color: black;
    
}

.content {
    min-height: 100vh;
    display: grid;
    grid-template: 1fr 1fr / 1fr;
    place-items: center;
    gap: 4rem;
    position: sticky;
    top: 0;
    margin-bottom: 50vh;
    padding: 2rem;
}

article {
    display: grid;
    position: absolute;
    height: 100%;
    grid-template-rows: auto auto 1fr;
    top: 0;
    left: 0;
    font-weight: 300;
    transform: translateY(-10%); /* Move slightly upwards */
    background-color: transparent; /* Ensure no background color */
    font-size: 1.5rem;
}

footer {
    padding: 2rem;
}

.title-wrap {
    align-self: end;
    color: white;
}
.content-wrap {
    align-self: start;
}

:is(.title-wrap, .content-wrap) {
    line-height: 1.5;
    mask: linear-gradient(transparent, white 10px calc(100% - 10px), transparent);
}

@media (min-width: 768px) {
    article {
        grid-template-rows: 1fr auto 1fr;
    }
    .content {
        grid-template: 1fr / 1fr 1fr;
    }
    
}


@supports (animation-timeline: scroll()) {
    :root {
        timeline-scope: --section-one, --section-two, --section-three, --section-four;
    }

    .tiles {
        --orig: 0;
        --dest: calc(-100% + var(--gap));
        animation: translate both linear;
        animation-timeline: --main;
        animation-range: entry 150vh exit -100vh;
    }

    @media(max-width: 768px) {
        .tiles {
            --orig: 200%;
            --dest: 0%;
            align-self: center;
        }
    }

    main {
        view-timeline-name: --main;
        width: 100%;
    }

    .section--one {
        view-timeline-name: --section-one;
    }

    @media(min-width: 768px) {
        .section--one {
            justify-self: start;
        }
    }

    .section--two {
        view-timeline-name: --section-two;
    }

    .section--three {
        view-timeline-name: --section-three;
    }

    .section--four {
        view-timeline-name: --section-four;
    }

    .section--five {
        height: 50vh;
    }

    article :is(h2, p),
    .tile,
    .tile::before,
    .tile::after {
        animation: journey both linear;
    }

    article :is(h2, p),
    .tile,
    .tile::after,
    .tile::before {
        animation-range: entry 20% entry 120%;
    }

    article:nth-of-type(1) :is(h2, p),
    .tile:nth-of-type(4)::after,
    .tile:nth-of-type(4)::before {
        animation-range: entry -80% entry 20%;
    }

    .tile::after,
    .tile::before {
        --start: 0;
        --end: 0;
        --origin: -50% -50%;
        --destination: -50% -50%;
        --via: -50% -50%;
    }

    .tile::before {
        --start: 1;
        --mid: 1;
        --end: 0.5;
    }

    .tile:nth-of-type(4)::after {
        --start: 1;
    }

    .tile:nth-of-type(4) {
        --origin: 0 -150%;
    }

    .tile:nth-of-type(1)::after {
        --start: 0;
        --mid: 1;
        --end: 1;
    }

    article :is(h2, p) {
        --origin: 0 100%;
        --via: 0 0;
        --destination: 0 -100%;
        --start: 0;
        --mid: 1;
        --end: 0;
        font-family: 'Roboto', sans-serif;
    }

    article:nth-of-type(4) :is(h2, p) {
        --destination: 0 0;
        --end: 1;
    }

    article:nth-of-type(1) :is(h2, p) {
        --origin: 0 0;
        --via: 0 0;
        --destination: 0 -100%;
        --start: 1;
        --end: 0;
        font-family: 'Roboto', sans-serif;
    }

    .tile {
        --origin: 0 0;
        --via: 0 -150%;
        --destination: 0 -150%;
    }

    .tile:nth-of-type(3),
    .tile:nth-of-type(3)::after,
    .tile:nth-of-type(4),
    .tile:nth-of-type(4)::after,
    article:nth-of-type(1) :is(h2, p),
    article:nth-of-type(2) :is(h2, p) {
        animation-timeline: --section-two;
    }

    .tile:nth-of-type(2),
    .tile:nth-of-type(2)::after,
    article:nth-of-type(3) :is(h2, p) {
        animation-timeline: --section-three;
    }

    .tile:nth-of-type(1),
    .tile:nth-of-type(1)::after,
    article:nth-of-type(4) :is(h2, p) {
        animation-timeline: --section-four;
    }

    @keyframes translate {
        from {
            transform: translateY(var(--orig));
        }
        to {
            transform: translateY(var(--dest));
        }
    }

    @keyframes journey {
        0% {
            translate: var(--origin, 0 0);
            opacity: var(--start, 1);
        }
        15%, 85% {
            translate: var(--via, 0 0);
            opacity: var(--mid, 1);
        }
        100% {
            translate: var(--destination, 0 0);
            opacity: var(--end, 1);
        }
    }
}

/* Social */
.bear-link {
    color: canvasText;
    position: fixed;
    top: 2rem;
    right: 2rem;
    width: 48px;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    opacity: 0.8;
}

:where(.x-link, .bear-link):is(:hover, :focus-visible) {
    opacity: 1;
}

.bear-link svg {
    width: 75%;
}

@media (max-width: 768px) {
  .bear-link {
      top: 1rem;
      right: 1rem;
  }
}
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 80%;
}

/* Unique styling for the main container */
.event-stats {
    text-align: center;
    padding: 40px;
    border-radius: 15px;
    background: linear-gradient(145deg, #1a1a1a, #333);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(128, 128, 255, 0.3);
    position: relative;
    overflow: hidden;
    bottom: 300px;
}

/* Optional animation effect for uniqueness */
.event-stats::before {
    content: '';
    position: absolute;
    top: -30%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(128, 128, 255, 0.2), transparent 70%);
    transform: rotate(45deg);
    animation: pulse 5s infinite alternate;
}

@keyframes pulse {
    0% {
        transform: scale(1) rotate(45deg);
    }
    100% {
        transform: scale(1.5) rotate(45deg);
    }
}

.event-stats h2 {
    font-size: 1.5em;
    margin-bottom: 25px;
    text-align: center;
}

.statistics {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.stat-card {
    background-color: #222;
    border-radius: 10px;
    padding: 20px 30px;
    text-align: center;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    min-width: 120px;
}

.number {
    font-size: 2em;
    color: #b39ddb; /* Purple color */
    font-weight: bold;
}

.label {
    font-size: 0.9em;
    color: #888;
    text-transform: uppercase;
    margin-top: 5px;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    position: relative;
    max-width: 100%;
    font-family: 'Roboto', sans-serif;
}

.event-info {
    background-color: #333;
    padding: 1rem;
    border-radius: 5px;
    display: none;
    margin-right: 50px;
}

.event-info.active {
    display: block;
}

ul {
    list-style: none;
    width: 100%;
    height: 100%;
    position: relative;
    perspective: 900px;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
    margin-left: 30px;
}

ul > li {
    position: absolute;
    left: 50%;
    top: calc(50% - 1.2rem);
    --rotateX: calc(1deg * var(--rotateDegrees) * calc(var(--day_idx) - var(--currentDay)));
    transform: rotateX(var(--rotateX)) translateZ(190px) translateX(-50%) scale(var(--scale, 1));
    --hue: calc(var(--rotateDegrees) * var(--day_idx));
    background-color: hsl(var(--hue), 50%, var(--lightness, 50%));
    width: 70%;
    color: white;
    display: grid;
    grid-template-columns: 2.5rem auto;
    height: 2.4rem;
    transition: transform 500ms ease, background-color 500ms ease;
}

ul > li.active {
    --lightness: 30%;
    --scale: 1.1;
}

ul > li > * {
    display: grid;
    align-items: center;
}

li > time {
    text-align: center;
}

li > span {
    padding-inline-start: 0.5rem;
    color: white;
}

ul, ul > li {
    user-select: none;
}

ul {
    cursor: grab;
}

.event-img {
    width: 100%;
    height: auto;
    max-height: 200px; /* Adjust based on your layout needs */
    object-fit: cover;
}
.modal-body{
    background-color: black;
}
.modal-body img {
    width: 100%;
    height: auto;
    max-height: 300px; /* Adjust based on your layout needs */
    object-fit: cover;
}

.modal-title{
    color: black;
}
.btn-1 {
    background-color: aqua;
    border-radius: 10px;
    text-align: center;
    display: block;
    margin: 10px auto;
}

.event-img {
    width: 100%;
    max-height: 300px; /* Adjust this value based on desired height */
    object-fit: contain; /* Ensures the full image is shown without cropping */
    border-radius: 8px; /* Optional: adds rounded corners */
    margin: 10px 0; /* Optional: adds spacing around the image */
}


.modal-body {
    background-color: black;
    color: white;
}

.modal-body img {
    max-height: 300px;
}
.visuallyhidden {
    position: absolute;
    z-index: -1;
    right: 0;
    opacity: 0;
  }

  h1 {
    color: white;
    text-align: center;
    margin-top: 1em;
  }

  .container {
    overflow: hidd;
    padding: 20px;
    margin-top: 1.5em;
    background: rgba(0,0,0,.1);
    margin-bottom: 3em;
  }
  
  .card-carousel {
    --card-width: 80%;
    --card-max-width: 280px;
    --card-height: 350px;
    --carousel-min-width: 600px;
    z-index: 1;
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: var(--card-height);
    min-width: var(--carousel-min-width);
    transition: filter .3s ease;
  }
  
  @media screen and (max-width: 640px) {
    .card-carousel {
      margin-left: calc((100vw - var(--carousel-min-width) - 40px) / 2);
      margin: 0 auto;
    }
    .pad{
      margin: 10rem;
      padding-left: 0;

    }
  }
  
  .card-carousel.smooth-return {
    transition: all .2s ease;
  }
  
  .card-carousel .card {
    background: whitesmoke;
    width: var(--card-width);
    max-width: var(--card-max-width);
    text-align: center;
    padding: 1em;
    min-width: 250px;
    height: var(--card-height);
    position: absolute;
    margin: 0 auto;
    color: rgba(0,0,0,.5);
    transition: inherit;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3);
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3);
    border-radius: 1em;
    filter: brightness(.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .card.highlight {
    filter: brightness(1)
  }
  
  
  .card:nth-of-type(1) .image-container {
      background-image: url("user.png");
  }
   
  .card:nth-of-type(2) .image-container {
    background-image: url("user.png")
  }
  
  .card:nth-of-type(3) .image-container {
    background-image: url("user.png")
  }
  .card:nth-of-type(4) .image-container {
    background-image: url("user.png")
  }
  .card:nth-of-type(5) .image-container {
    background-image: url("user.png")
  }
  
  
  
  .image-container {
    width: 8em;
    height: 8em;
    position: relative;
    background-size: cover;
    margin-bottom: 2em;
    border-radius: 100%;
    padding: 1em;
    -webkit-box-shadow: inset 0px 0px 17px 0px rgba(0,0,0,0.3);
  -moz-box-shadow: inset 0px 0px 17px 0px rgba(0,0,0,0.3);
  box-shadow: inset 0px 0px 17px 0px rgba(0,0,0,0.3);
  }
  
  .image-container::after {
    content: "";
    display: block;
    width: 120%;
    height: 120%;
    border: solid 3px rgba(0,0,0,.1);
    border-radius: 100%;
    position: absolute;
    top: calc(-10% - 3px);
    left: calc(-10% - 3px);
  }
  
  .event-stats h2 {
    padding: 1em;
    margin-top: 1em;
    background: rgba(0,0,0,.3);
    text-align: center;
    justify-content: center;
    color: white;
    border-radius: .2em;
    display: inline-block;
    transform: translateX(calc((100vw - 100%) / 2));
    margin-right: 30em;
  }
  
  h2 a {
    color: #f5b916
  }

.handles{
    display: flex;
}
a{
    padding: 10px;
}
.sponsors-container {
    overflow: auto;
    width: 100%; /* Full width of viewport */
    margin-top: 10rem;
}

.sponsors {
    display: flex;
    gap: 20px;
    animation: scroll 12s linear infinite;
}

.sponsor-logo {
    background-color:white;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
.sponsor-logo img {
    width: 150%; 
    height: auto;
    object-fit: cover; 
    }
    .foot {
        height: 300px;
        width: 100%;
        border: 2px solid black;
        margin-top: 10%; 
        position: relative;
        padding: 20px;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        
    }
    .foot .social {
        position: absolute;
        bottom: 20px; 
        right: 20px;  
    }
    
    a i {
        font-size: 24px;
        color: white;
        margin: 0 10px;
        text-decoration: none;
        transition: transform 0.1s ease-in;
    }
    
    a i:hover {
        color: #0077b5;
        transform: scale(1.2);
        font-size: 25px;
    }
    .address {
        margin-left: 750px;
        margin-top: -80px;
    }
    
    .clg_add {
        margin-top: 40px;
        display: block;
    }
    
    .contact {
        margin-left: 1050px;
        margin-top: 10px;
    }
    
    .contact .email_id {
        margin-top: 20px;
    }
    
    .contact .email_id a {
        text-decoration: none;
        transition: transform 0.3s ease-in;
    }
    
    .contact .email_id a:hover {
        font-size: 15px;
        color: #0077b5;
        transform: scale(1.2);
    }
    .bottom-right {
        position: fixed;
        bottom: 10px;
        left: 15px;
        font-size: 14px; 
         color: white;   
        z-index: 1;  
    }
    .msg {
        position: absolute;
        top: 5px; 
        left: 20px; 
        font-size: 16px; 
        color: white;
    }

@media screen and (max-width: 600px) {
    html, body {
        overflow-x: hidden;
        display: flex;
        flex-direction: column; /* Stack content vertically on small screens */
    }

    .container-rochan {
        position: relative;/* Ensure no horizontal overflow */
        right: 10px;
        margin-top: 50px;
    }
    .pad{
        position: relative;
        right: 25px;
    }
}

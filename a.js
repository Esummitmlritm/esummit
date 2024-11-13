function flipCard(card) {
    const allCards = document.querySelectorAll('.card');  // Select all cards
  
    // Check if any other cards are flipped, if yes, flip them back
    allCards.forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('flipped')) {
        otherCard.classList.remove('flipped');
      }
    });
  
    // Toggle the flipped state for the clicked card
    card.classList.toggle('flipped');
  }
  
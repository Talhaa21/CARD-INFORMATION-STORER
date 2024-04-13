document.addEventListener('DOMContentLoaded', function() {
    const cardForm = document.getElementById('card-form');
    const cardList = document.getElementById('card-list');
    const deleteAllButton = document.getElementById('delete-all');
    const searchInput = document.getElementById('search-input');

    cardForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const card = getFormData();
        const editIndex = parseInt(cardForm.getAttribute('data-edit-index'));
        if (isNaN(editIndex)) {
            addCard(card);
            alert('New card added!');
        } else {
            updateCard(card, editIndex);
            cardForm.removeAttribute('data-edit-index');
        }
        cardForm.reset();
    });

    deleteAllButton.addEventListener('click', function() {
        localStorage.removeItem('cards');
        renderCards([]);
        alert('All cards deleted!');
    });

    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        const filteredCards = cards.filter(card => {
            return (
                card.date.toLowerCase().includes(searchValue) ||
                card.time.toLowerCase().includes(searchValue) ||
                card.title.toLowerCase().includes(searchValue) ||
                card.description.toLowerCase().includes(searchValue) ||
                card.event.toLowerCase().includes(searchValue) ||
                card.nearestPlace.toLowerCase().includes(searchValue)
            );
        });
        renderCards(filteredCards);
    });

    function addCard(card) {
        let cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push(card);
        localStorage.setItem('cards', JSON.stringify(cards));
        renderCards(cards);
    }

    function updateCard(card, index) {
        let cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards[index] = card;
        localStorage.setItem('cards', JSON.stringify(cards));
        renderCards(cards);
    }

    function deleteCard(index) {
        let cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.splice(index, 1);
        localStorage.setItem('cards', JSON.stringify(cards));
        renderCards(cards);
        alert('Card deleted!');
    }

    function renderCards(cards) {
        cardList.innerHTML = '';
        cards.forEach(function(card, index) {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.style.backgroundColor = 'transparent';
            cardElement.style.border = '2px solid white';
            cardElement.innerHTML = `
                <p><strong>Date:</strong> ${card.date}</p>
                <p><strong>Time:</strong> ${card.time}</p>
                <p><strong>Title:</strong> ${card.title}</p>
                <p><strong>Description:</strong> ${card.description}</p>
                <p><strong>Event:</strong> ${card.event}</p>
                <p><strong>Nearest Place:</strong> ${card.nearestPlace}</p>
                <img src="${card.image}" alt="Card Image">
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            cardList.appendChild(cardElement);
        });

        // Add event listener to edit buttons
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(button.getAttribute('data-index'));
                const cards = JSON.parse(localStorage.getItem('cards')) || [];
                const card = cards[index];
                populateForm(card);
                cardForm.setAttribute('data-edit-index', index.toString());
            });
        });

        // Add event listener to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(button.getAttribute('data-index'));
                deleteCard(index);
            });
        });
    }

    function getFormData() {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const eventText = document.getElementById('event').value;
        const nearestPlace = document.getElementById('nearest-place').value;

        return {
            date,
            time,
            title,
            description,
            event: eventText,
            nearestPlace
        };
    }

    function populateForm(card) {
        document.getElementById('date').value = card.date;
        document.getElementById('time').value = card.time;
        document.getElementById('title').value = card.title;
        document.getElementById('description').value = card.description;
        document.getElementById('event').value = card.event;
        document.getElementById('nearest-place').value = card.nearestPlace;
    }

    // Initial rendering
    const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
    renderCards(storedCards);
});

 
document.addEventListener('DOMContentLoaded', function() {

    // Voice Recognition
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        if (transcript.toLowerCase().includes('add card')) {
            // Scroll to the Add Information section
            document.getElementById('addInfo').scrollIntoView({ behavior: 'smooth' });
            // Place the icon
            const homeIcon = document.querySelector('nav ul li:first-child i');
            homeIcon.classList.remove('fas', 'fa-home');
            homeIcon.classList.add('fas', 'fa-home', 'added-icon');
        } else if (transcript.toLowerCase().includes('delete card')) {
            // Scroll to the Delete Information section
            document.getElementById('deleteinfo').scrollIntoView({ behavior: 'smooth' });
        }
    };

    recognition.onerror = function(event) {
        console.error(event.error);
    };

    // Start listening for voice command when the icon is clicked
    document.getElementById('voice-icon').addEventListener('click', function() {
        recognition.start();
    });
});


function changeTheme(themeName) {
    document.body.className = themeName;
}




const scriptURL = 'https://script.google.com/macros/s/AKfycbw8mcDP4oCSAEnjYEHb6ASzKndrJn_8LSH3rImAdrBSvJwOdNEtzTgKsyGZ3zOgBGdiLg/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
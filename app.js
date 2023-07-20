const section = document.querySelector('section');

const playerLivesCount = document.querySelector('.attempts');
let playerLives = 3;
playerLivesCount.textContent = playerLives;

const level = document.querySelector('.level');
let levelNumb = 1;
level.textContent = levelNumb;

const score = document.querySelector('.score');
let scoreNumb = 0;
score.textContent = scoreNumb;


const getData = () => [
    { color: '#feb73b', name: 'Yellow' },
    { color: '#3f7841', name: 'Green' },
    { color: '#ee5115', name: 'Orange' },
    { color: '#11487d', name: 'Blue' },
    { color: '#fa448c', name: 'Pink' },
    { color: '#9350ad', name: 'Violet' },
    { color: '#d62637', name: 'Red' },
    { color: '#622a2d', name: 'Brown' },

    { color: '#feb73b', name: 'Yellow' },
    { color: '#3f7841', name: 'Green' },
    { color: '#ee5115', name: 'Orange' },
    { color: '#11487d', name: 'Blue' },
    { color: '#fa448c', name: 'Pink' },
    { color: '#9350ad', name: 'Violet' },
    { color: '#d62637', name: 'Red' },
    { color: '#622a2d', name: 'Brown' }
];

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData
};

const cardGenerator = () => {
    const cardData = randomize();

    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('div');
        const back = document.createElement('div');

        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        face.style.background = item.color;
        card.setAttribute('id', item.name);

        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};


const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');

    if (flippedCards.length === 2) {
        if (
            flippedCards[0].getAttribute('id') ===
            flippedCards[1].getAttribute('id')
        ) {

            if (toggleCard.length !== 16) {
                setTimeout(() => {
                    flippedCards[0].querySelector('.face').style.background = '#949494';
                    flippedCards[1].querySelector('.face').style.background = '#949494';
                }, 1500);
            }

            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })

            scoreNumb++;
            score.textContent = scoreNumb;

        } else {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });

            playerLives--;
            playerLivesCount.textContent = playerLives;

            if (playerLives === 0) restart();
        }
    }

    if (toggleCard.length === 16) {
        levelNumb++;
        level.textContent = levelNumb;

        setTimeout(() => {
            const cardData = randomize();

            const faces = document.querySelectorAll('.face');
            const cards = document.querySelectorAll('.card');

            section.style.pointerEvents = 'none';

            cardData.forEach((item, index) => {

                cards[index].classList.remove('toggleCard');

                setTimeout(() => {
                    cards[index].style.pointerEvents = 'all';
                    faces[index].style.background = item.color;
                    cards[index].setAttribute('id', item.name);
                    section.style.pointerEvents = 'all';

                }, 100)

                backSide = document.querySelectorAll('.back');
                backSide.forEach((div) => div.style.display = 'none');

                setTimeout(() => {
                    backSide.forEach((div) => div.style.display = 'block');
                }, 4000);
            })
        }, 1000);
    }
};

const restart = () => {
    const cardData = randomize();
    const faces = document.querySelectorAll('.face');
    const cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';

    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        cards[index].style.pointerEvents = 'all';
        faces[index].style.background = item.color;
        cards[index].setAttribute('id', item.name);
        section.style.pointerEvents = 'all';
    });

    playerLives = 3;
    playerLivesCount.textContent = playerLives;

    scoreNumb = 0;
    score.textContent = scoreNumb;

    levelNumb = 1;
    level.textContent = levelNumb;
}
const startButton = document.getElementById('startBtn');
startButton.addEventListener('click', startGame);

function startGame() {
    const cardData = randomize();
    const cards = document.querySelectorAll('.card');

    const cardWithFlippClass = document.querySelector('.flipped');

    if (cardWithFlippClass) cardWithFlippClass.classList.remove('flipped');

    restart();

    backSide = document.querySelectorAll('.back');
    backSide.forEach((div) => div.style.display = 'none');

    setTimeout(() => {
        backSide.forEach((div) => div.style.display = 'block')
        cardData.forEach((item, index) => cards[index].style.pointerEvents = 'all');
    }, 4000);
}

cardGenerator()
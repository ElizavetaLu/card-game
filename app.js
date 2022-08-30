const section = document.querySelector('section');

const playerLivesCount = document.querySelector('.attempts');
let playerLives = 3;
playerLivesCount.textContent = playerLives;

const level = document.querySelector('.level');
let levelNumb = 0;
level.textContent = levelNumb;

const score = document.querySelector('.score');
let scoreNumb = 0;
score.textContent = scoreNumb;


const getData = () => [
    { color: '#DDA0DD', name: 'Plum' },
    { color: '#00FFFF', name: 'Aqua' },
    { color: '#8A2BE2', name: 'BlueViolet' },
    { color: '#0000FF', name: 'Blue' },
    { color: '#7FFF00', name: 'Chartreuse' },
    { color: '#DC143C', name: 'Crimson' },
    { color: '#808080', name: 'Gray' },
    { color: '#FF4500', name: 'OrangeRed' },
    { color: '#DDA0DD', name: 'Plum' },
    { color: '#00FFFF', name: 'Aqua' },
    { color: '#8A2BE2', name: 'BlueViolet' },
    { color: '#0000FF', name: 'Blue' },
    { color: '#7FFF00', name: 'Chartreuse' },
    { color: '#DC143C', name: 'Crimson' },
    { color: '#808080', name: 'Gray' },
    { color: '#FF4500', name: 'OrangeRed' }
];

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData
};

const cardGenerator = () => {
    const cardData = randomize()

    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('div');
        const back = document.createElement('div');

        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        face.style.background = item.color;
        card.setAttribute('id', item.name)

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
    const toggleCard = document.querySelectorAll('.toggleCard')
    
    if (flippedCards.length === 2) {
        if (
            flippedCards[0].getAttribute('id') ===
            flippedCards[1].getAttribute('id')
        ) {

            if (toggleCard.length !== 16) {
                setTimeout(() => {
                    flippedCards[0].querySelector('.face').style.background = '#d3e3ef'
                    flippedCards[1].querySelector('.face').style.background = '#d3e3ef'
                }, 1500);
            }

            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none'
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

            if (playerLives === 0) {
                restart()
            }
        }
    }

    if (toggleCard.length === 16) {
        levelNumb++;
        level.textContent = levelNumb;

        setTimeout(() => {
            let cardData = randomize();
            let faces = document.querySelectorAll('.face');
            let cards = document.querySelectorAll('.card');
            section.style.pointerEvents = 'none';
            cardData.forEach((item, index) => {
                cards[index].classList.remove('toggleCard');
                setTimeout(() => {
                    cards[index].style.pointerEvents = 'all';
                    faces[index].style.background = item.color;
                    cards[index].setAttribute('id', item.name);
                    section.style.pointerEvents = 'all';

                }, 100)

                backSide = document.querySelectorAll('.back')
                backSide.forEach((div) => div.style.display = 'none')
                setTimeout(() => {
                    backSide.forEach((div) => div.style.display = 'block')

                }, 4000)
            })
        }, 1000)
    }
};

const restart = () => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].style.background = item.color;
            cards[index].setAttribute('id', item.name);
            section.style.pointerEvents = 'all';

        }, 100)
    });
    playerLives = 3;
    playerLivesCount.textContent = playerLives;
    score.textContent = 0;
    level.textContent = 0;
}
const startButton = document.getElementById('startBtn')
startButton.addEventListener('click', startGame)

function startGame() {


    const cardWithFlippClass = document.querySelector('.flipped')
    if(cardWithFlippClass){
        cardWithFlippClass.classList.remove('flipped');
    }

    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        setTimeout(() => {
            cards[index].style.pointerEvents = 'none';
            faces[index].style.background = item.color;
            cards[index].setAttribute('id', item.name);
            section.style.pointerEvents = 'all';

        }, 0)
    });
    playerLives = 3;
    playerLivesCount.textContent = playerLives;
    level.textContent = 0;
    score.textContent = 0;

    backSide = document.querySelectorAll('.back')
    backSide.forEach((div) => div.style.display = 'none')

    setTimeout(() => {
        backSide.forEach((div) => div.style.display = 'block')
        cardData.forEach((item, index) => cards[index].style.pointerEvents = 'all');
    }, 4000)
}

cardGenerator()
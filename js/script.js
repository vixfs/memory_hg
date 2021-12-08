let timeForRembemer;   // (сек * 1000мс) Время для запоминания карт (от старта до закрытия)
let timeBeforeUnflip = 750;       // (мс) Время перед закрытием неверно найденных карт
let pointsForFound ;         // Кол-во очков за верную найденную пару
let pointsForFail;           // Кол-во очков за ошибку

let sizeX;  // Кол-во столбцов
let sizeY;  // Кол-во строк
let gridSize;

let timeForGame; // (сек) Таймер для прохождения уровня
let timeleft;

let points;
let currentBackgroundId;

let cards = [];
 
let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent); 
let startEvent = mobile ? "touchend" : "click";

function generateCards(){
    allCards.sort(() => Math.random() - 0.5);       // Перемешиваем все карты
    for (let i = 0; i < gridSize / 2; i++) {    // Массив используемых карт в сетке (каждой по две)
        cards.push(allCards[i]);
        cards.push(allCards[i]);
    }
};

function randomizeCards(){
    cards.sort(() => Math.random() - 0.5);      // Перемешиваем используемые карты вместе с парами
};

function reorderRepeatedCards(){
    let countOfAllowedRepeat = 2 + Math.floor(gridSize / 20);

    for (let i = 0; i < gridSize - 1; i++){
        if(cards[i] === cards[i+1]){
            countOfAllowedRepeat -= 1;
        }
    };

    for (let i = 0; i < gridSize - sizeX; i++){
        if(cards[i] === cards[i+sizeX]){
            countOfAllowedRepeat -= 1;
        }
    };

    if(countOfAllowedRepeat<0){
        randomizeCards();
        reorderRepeatedCards();
    }
};

function generateGrid() {
	$("#screen").html(`
            <div id="gridwrapper">
	           <div id="grid" class="game"></div> 
            </div>
		`);

    function randomBackground(){
        randomBackgroundId = Math.floor(Math.random() * (allBackgrounds.length));
        if (currentBackgroundId == randomBackgroundId) {
            randomBackground(currentBackgroundId);
        } else{
            currentBackgroundId = randomBackgroundId;
        }
    }

    let grid = document.getElementById('grid');
    let randomBackgroundId;
    randomBackground();

    grid.style.backgroundColor = allBackgrounds[currentBackgroundId].color;
    grid.style.backgroundImage = allBackgrounds[currentBackgroundId].img;

    for (let i = 0; i < gridSize; i++) {
        let griddiv = document.createElement('div');
        let griddivcard = document.createElement('div');
        griddivcard.setAttribute('class', 'game-card flip');
        griddivcard.setAttribute('data-id', cards[i].id);
        griddiv.appendChild(griddivcard);
        grid.appendChild(griddiv);

        let griddivImgfront = document.createElement('div');
        griddivImgfront.innerHTML = cards[i].img;
        griddivImgfront.setAttribute('class', 'front-card');
        griddivcard.appendChild(griddivImgfront);

        let griddivImgback = document.createElement('div');
        griddivImgback.setAttribute('class', 'back-card');
        let backquestion = document.createElement('div');
        backquestion.setAttribute('class','back-card-question')
        backquestion.innerHTML = `<svg height="100%" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7829 20.8518C11.0487 20.8518 11.2784 20.9485 11.4717 21.1418C11.6651 21.3352 11.7618 21.5648 11.7618 21.8307V25.0211C11.7618 25.287 11.6651 25.5166 11.4717 25.71C11.2784 25.9033 11.0487 26 10.7829 26H7.66494C7.39907 26 7.16946 25.9033 6.9761 25.71C6.78274 25.5166 6.68606 25.287 6.68606 25.0211V21.8307C6.68606 21.5648 6.78274 21.3352 6.9761 21.1418C7.16946 20.9485 7.39907 20.8518 7.66494 20.8518H10.7829ZM9.33267 0.258942C10.4687 0.258942 11.5684 0.416047 12.6319 0.730257C13.7195 1.04447 14.6742 1.51578 15.496 2.1442C16.342 2.74845 17.0187 3.50981 17.5263 4.42827C18.0339 5.32256 18.2877 6.36187 18.2877 7.5462C18.2877 8.513 18.1306 9.35895 17.8163 10.084C17.5263 10.785 17.1396 11.4255 16.6562 12.0056C16.197 12.5615 15.6894 13.0811 15.1335 13.5645C14.5776 14.0238 14.0458 14.4709 13.5383 14.906C13.0549 15.3169 12.6198 15.7519 12.2331 16.2111C11.8705 16.6704 11.653 17.1659 11.5805 17.6976C11.5321 17.9635 11.4234 18.1931 11.2542 18.3864C11.085 18.5798 10.8675 18.6765 10.6016 18.6765H7.84622C7.58035 18.6765 7.33865 18.5798 7.12112 18.3864C6.92776 18.1931 6.84316 17.9635 6.86733 17.6976C6.91567 16.755 7.10903 15.9332 7.44741 15.2323C7.80996 14.5072 8.23294 13.8667 8.71634 13.3107C9.22391 12.7307 9.75565 12.211 10.3116 11.7518C10.8916 11.2925 11.4234 10.8575 11.9068 10.4466C12.3902 10.0115 12.789 9.58856 13.1032 9.17767C13.4174 8.74261 13.5745 8.2713 13.5745 7.76373C13.5745 6.84527 13.1878 6.096 12.4143 5.51592C11.6409 4.91167 10.6137 4.60954 9.33267 4.60954C7.27822 4.60954 5.7676 5.63677 4.8008 7.69122C4.67995 7.95709 4.54701 8.16253 4.40199 8.30755C4.28114 8.4284 4.06361 8.48883 3.7494 8.48883H0.812747C0.595217 8.48883 0.401857 8.41632 0.232667 8.2713C0.0876467 8.12628 0.0151367 7.93292 0.0151367 7.69122C0.0393067 6.84527 0.293092 5.98723 0.776492 5.11711C1.28406 4.22282 1.94874 3.42521 2.77052 2.72428C3.61647 1.99918 4.59535 1.40702 5.70717 0.947786C6.84316 0.488556 8.05166 0.258942 9.33267 0.258942Z" fill="#CC9AC3"/>
            </svg>
        `
        griddivImgback.appendChild(backquestion);

        griddivcard.appendChild(griddivImgback);

    }

    if(gridSize % 2 != 0){
        alert("Ошибка. Колличество элементов нечетное");
        document.body.innerHTML = null;
    };         
};

//5х6

function updateSizeGrid(){
	$(".progress_line").css({
            "max-width": `calc((100vh - 68px - 26px) / 6 * 5)`,
        });
    $("#gridwrapper").css({
            "height": `calc(100vh - 68px - 26px)`,
        });
    if(((window.innerHeight - 68 - 26) / sizeY) > ((window.innerWidth - 30) / sizeX)){
        $("#grid").css({
            "width": `calc(100vw - 30px)`,
            "grid-template-rows": `repeat( ${sizeY}, calc((100vw - 30px) / ${sizeX}) )`,
            "grid-template-columns": `repeat( ${sizeX}, calc((100vw - 30px) / ${sizeX}) )`,
        })
    } else {
        $("#grid").css({
            "width": `calc((100vh - 68px - 26px) / ${sizeY} * ${sizeX})`,
            "grid-template-rows": `repeat( ${sizeY}, calc((100vh - 68px - 26px) / ${sizeY}) )`,
            "grid-template-columns": `repeat( ${sizeX}, calc((100vh - 68px - 26px) / ${sizeY}) )`,
        })
    }
};

/* grid generated */

let htmlCards = document.querySelectorAll('.game-card');
let flippedCard = false;
let lockCards = false;
let firstCard, secondCard;
let countDisabledCards = 0;

function flipCard() {
    if (lockCards) {return;}
    if (this === firstCard) {return;}

    this.classList.add('flip');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    lockCards = true;

    checkForDoublet();
}

function checkForDoublet() {
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;
    if (isMatch) {
            disableCards();
            changePoints(pointsForFound)
            
        } else{
            unflipCards();
        }         
};

function disableCards() {
        countDisabledCards += 2;

        if(countDisabledCards === gridSize){            //победа
            document.getElementById('screen').style.backgroundColor = allBackgrounds[currentBackgroundId].color;
            document.getElementById('screen').style.transition = `1s`;
            changeLevelState();
        };

    setTimeout(() => {
        firstCard.removeEventListener(startEvent, flipCard);
        secondCard.removeEventListener(startEvent, flipCard);

        firstCard.parentElement.classList.add('hidden');
        secondCard.parentElement.classList.add('hidden');

        resetBoard();
    }, 350);  
};


function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        changePoints(pointsForFail)

        resetBoard();
    }, timeBeforeUnflip);
};

function resetBoard() {
    flippedCard = false;
    lockCards = false;
    firstCard = null;
    secondCard = null;
};

function generateGame(){
    $("#screen").html(null);
    cards = [];
    countDisabledCards = 0;
    gridSize = sizeX * sizeY;
    generateCards();
    randomizeCards();
    reorderRepeatedCards();
    generateGrid();
    updateSizeGrid();
    let htmlCards = document.querySelectorAll('.game-card');
    document.getElementById('screen').style.backgroundColor = `#704C99`;
    document.getElementById('screen').style.transition = `1s`;
    jQuery("#grid").fadeTo(1000, 1);
    setTimeout(function() {
        $('.game-card').removeClass('flip');
        resetBoard();
        htmlCards.forEach(card => card.addEventListener(startEvent, flipCard));
    }, timeForRembemer);

    setTimeout(function(){
        htmlCards.forEach(card => card.removeEventListener(startEvent, flipCard));
    }, (dataGame.time+dataGame.delay_time)*1000);

    $(window).resize(function(){
        updateSizeGrid();
    });   
}
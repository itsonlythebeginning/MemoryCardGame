let game_field = document.querySelector(".game__field")

let errors = 0

let card = document.querySelector(".game__field-card")
let game_title = document.querySelector(".game__title")

let firstCard
let secondCard

let cards = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

let fullCardsArr

let board = []


function shuffleCards() {

    fullCardsArr = [...cards, ...cards]

    for (let i = 0; i < fullCardsArr.length; i++) {

        let j = Math.floor(Math.random() * fullCardsArr.length)
        let temp = fullCardsArr[i]
        fullCardsArr[i] = fullCardsArr[j]
        fullCardsArr[j] = temp

    }

}

shuffleCards()




function createTable() {

    for (let i = 0; i < 4; i++) {

        let arr = []
        for (let j = 0; j < 5; j++) {
            let index = i * 5 + j
            arr.push(fullCardsArr[index])
        }
        board.push(arr)
        arr = []

    }

}

createTable()




function startGame() {

    for (let i = 0 ; i < board.length; i++) {

        for (let j = 0; j < board[i].length; j++) {

            let card = document.createElement("div")
            card.classList.add("game__field-card")
            card.id = i.toString() + "-" + j.toString()


            let cardFront = document.createElement("div")
            cardFront.classList.add("game__field-card_front")
            cardFront.style.background = `url("cards/${board[i][j]}.jpg") no-repeat center center / cover`


            let cardBack = document.createElement("div")
            cardBack.classList.add("game__field-card_back")
            cardBack.style.background = `url("cards/back.jpg") no-repeat center center / cover`

            card.append(...[cardFront, cardBack])

            card.addEventListener("click", chooseCard)

            game_field.appendChild(card)

        }


    }

}


startGame()



function showCards() {

    let cardsArr = document.querySelectorAll(".game__field-card")

    for (let i = 0; i < cardsArr.length; i++) {
        cardsArr[i].children[0].classList.add("game__field-card_front_active")
        cardsArr[i].children[1].classList.add("game__field-card_back_active")
    }
}


setTimeout(showCards, 1000)



function chooseCard() {

    if (this.classList.contains("game__field-card_open") === false) {
        if (firstCard === undefined) {
            firstCard = this

            this.classList.add("game__field-card_open")
            this.children[0].classList.remove("game__field-card_front_active")
            this.children[1].classList.remove("game__field-card_back_active")
        }

        else if (secondCard === undefined && secondCard !== firstCard) {
            secondCard = this

            this.classList.add("game__field-card_open")
            this.children[0].classList.remove("game__field-card_front_active")
            this.children[1].classList.remove("game__field-card_back_active")

            setTimeout(function () {
                checkTwo()
            }, 1000)

        }
    }

}



function checkTwo() {

        let x1 = firstCard.id.split("-")[0]
        let y1 = firstCard.id.split("-")[1]

        let x2 = secondCard.id.split("-")[0]
        let y2 = secondCard.id.split("-")[1]

        if ( board[x1][y1] !== board[x2][y2]    ) {

            firstCard.children[0].classList.add("game__field-card_front_active")
            firstCard.children[1].classList.add("game__field-card_back_active")
            firstCard.classList.remove("game__field-card_open")

            secondCard.children[0].classList.add("game__field-card_front_active")
            secondCard.children[1].classList.add("game__field-card_back_active")
            secondCard.classList.remove("game__field-card_open")

            errors++
            game_title.textContent = `Ошибки: ${errors}`

        }

        firstCard = undefined
        secondCard = undefined
}








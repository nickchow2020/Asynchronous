/************************************* */
//Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
/************************************* */


url = "https://deckofcardsapi.com/api/deck/new/draw"
// Using XHMHttpRequest 

function get(url){
    return new Promise((resolve,reject) => {
        const xml = new XMLHttpRequest()
        xml.onload = function(){
            if (xml.readyState !== 4 ) return 

            if(xml.status >= 200 && xml.status < 300){
                resolve({
                    status_code: xml.status,
                    data: JSON.parse(xml.response)
                })
            }else{
                reject("error occurs")
            }
        }
        xml.onerror = function(){
            reject("NETwork ERROR")
        }
        xml.open("GET",url)
        xml.send()
    })
}

//Using axios
function _get(url){
    return axios.get(url)
}


/************************************ */
//Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
//Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
/************************************ */

// _get(url)
//     .then(response => {
//         const value = response.data.cards[0].value
//         const suit = response.data.cards[0].suit
//         console.log({
//             value,
//             suit
//         })
//     })

/************************************ */
//Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
//Once you have the card, make a request to the same API to get one more card from the same deck.
/************************************ */
const new_draw_url = "https://deckofcardsapi.com/api/deck/new/shuffle"
const deck_url = "https://deckofcardsapi.com/api/deck"

let desk_id;
// let result = []
// _get(new_draw_url)
//     .then(response => {
//         desk_id = response.data.deck_id
//         return _get(`${deck_url}/${desk_id}/draw`)
//     })
//     .then(response => {
//         result.push({
//             value : response.data.cards[0].value,
//             suit: response.data.cards[0].suit
//         })
//         return _get(`${deck_url}/${desk_id}/draw`)
//     })
//     .then(response => {
//         result.push({
//             value : response.data.cards[0].value,
//             suit: response.data.cards[0].suit
//         })
//         console.log(result)
//     })
//     .catch(err => console.log(err))



/************************************ */
// Build an HTML page that lets you draw cards from a deck. 
// When the page loads, go to the Deck of Cards API to create a new deck,
// and show a button on the page that will let you draw a card. Every time you click the button, 
// display a new card, until there are no cards left in the deck.
/************************************ */

$("#addCard").on("click",getDeskId)

function handleCards(url,id){

    _get(`${url}/${id}/draw`)
        .then(response => {
            const image = response.data.cards[0].image
            $("#show_card").append(`<image src=${image} />`)
        })
        .catch(err => console.log("error",err))
    
}

function getDeskId(){
    _get(new_draw_url)
        .then(response => {
            const desk_id = response.data.deck_id
            handleCards(deck_url,desk_id)
        })
        .catch(err => {
            console.log("Error",err)
        })

}
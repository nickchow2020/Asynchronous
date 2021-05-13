/************************************* */
//Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
/************************************* */


url = "http://numbersapi.com/3/?json"
multi_url = "http://numbersapi.com/3,13,18/?json"
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



// get(url)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// _get(url)
//     .then(data => console.log(data.data))
//     .catch(err => console.log(err))



/************************************* */
//Figure out how to get data on multiple numbers in a single request. 
//Make that request and when you get the data back, put all of the number facts on the page
/************************************* */

// _get(multi_url)
//     .then(response => {
//         const res_texts = response.data
//         console.log(res_texts[18])
//         for(text in res_texts){
//             $("#show_text").append(`<li>${res_texts[text]}</li>`)
//         }
//     })
//     .catch(err => console.log(err))


/************************************* */
// Use the API to get 4 facts on your favorite number. 
// Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
/************************************* */

const holdWholePromise = []

const myFavoriteNumber = [3,13,18]

for(let i = 0; i < myFavoriteNumber.length; i ++){
    holdWholePromise.push(
        axios.get(`http://numbersapi.com/${myFavoriteNumber[i]}/?json`)
    )
}

Promise.all(holdWholePromise)
    .then(response => {
        response.forEach(data => {
            $("#show_text").append(`<li>${data.data.text}</li>`)
        })
    })


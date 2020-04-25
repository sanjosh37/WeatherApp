// fetch('http://localhost:4000/weather?address=hyderabad').then((response)=> {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent='Loading..'
    messageTwo.textContent=''

    const location = search.value
    const url = 'http://localhost:4000/weather?address=' + location
    fetch(url).then((response)=> {
        response.json().then((data)=>{
            messageOne.textContent=''
            messageTwo.textContent=''

            if (data.Error) {
                console.log(data.Error)
                messageTwo.textContent = 'Error: ' + data.Error
            } else {
                messageOne.textContent = 'Temperature: ' + data.temperature 
                    + ' Forecast :' + data.forecast + ' Address: ' + data.address
                console.log(data)
            }
           // console.log(data)
        })
    })
    //console.log (location)

})
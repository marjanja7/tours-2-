const { container } = require("postcss")

import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"

let tours = []

const cards = document.getElementById("cards")

async function loadTours() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const data = await response.json()
    
    return data
}

async function init() {
    tours = await loadTours()
    renderTours(tours)
}
init()


function renderTours(tours) {
    cards.innerHTML = ""
    tours.forEach((tour) => {
        const duration = differenceInDays(
            new Date(tour.endTime),
            new Date(tour.startTime)
        )
        cards.innerHTML += `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img class="h-56 w-full" src="${tour.image}" alt="" />   
                <div class="p-5">
                    <div>
                        <a href="#">
                            <p class="font-semibold mt-3 text-lg text-rose-600">${tour.country}</p>
                            <p class='font-semibold mt-3 text-Sm text-rose-400'>${tour.city !== null ? tour.city : ""}</p>
                            <p class="text-grey-400 mt-3">${tour.hotelName}</p>
                        </a>
                        <p class="text-teal-500 font-medium text-sm pt-2">
                            <a href="#">${format(new Date(tour.startTime),"dd MMMM yyyy", { locale: ru }
                                )}-${format(new Date(tour.endTime),"dd MMMM yyyy",{ locale: ru }
                           )}</a>
                        </p>
                    </div>
                    <div class="mt-3 text-grey-400 text-sm flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 text-rose-600 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="ml-1">Длительность:</span>
                        <span class="text-fblack font-medium" >${duration}</span>
                    </div>

                    <p class="py-2 text-2xl text-rose-600 font-bold">${tour.price}</p>
                    <div class="buttons flex">
                        <button class="btn-primary w-full ">Подробнее</button>
                        <button id="register-btn-${tour.id}" class="btn-primary w-full">Забронировать</button>
                    </div>
                </div>
                
            </div>
            </div>
        `
        })
        tours.forEach((tour) => {
            const reservationBtn = document.getElementById(`register-btn-${tour.id}`)
            reservationBtn.addEventListener("click", () => {
                openContainerRegister (tour.id)

            
        })
    })
}



const containerRegister = document.getElementById ('container-register')
const openContainerBtn = document.getElementById (`register-btn-${tours.id}`)

const sendBtn = document.getElementById('send-btn')


//reservationBtn.addEventListener('click', openContainerRegister )
//closeRegisterBtn.addEventListener('click', closeContainerRegister)  

sendBtn.addEventListener("click", (event) => sendTour(event))

let currentId

function openContainerRegister (id) {
    currentId = id
    containerRegister.style.display = 'flex'
    const currentTour = tours.find((u) => {
        return u.id === id
    })

    document.getElementById("tour-info").innerHTML = `
                <div class="flex justify-between"
                    <img class="h-30 w-full" src="${currentTour.image}" alt="" />
                    <div class="block color-"
                        <p class="font-semibold mt-3 text-lg text-rose-600">${currentTour.country}
                        <div>
                            <p class='font-semibold mt-3 text-Sm text-rose-400'>${currentTour.city !== null ? currentTour.city : ""}</p>
                      
                            <p class="text-grey-400 mt-3">${currentTour.hotelName}</p>
                        </div>
                        <p class="text-teal-500 font-medium text-sm pt-2">
                            <a href="#">${format(new Date(currentTour.startTime),"dd MMMM yyyy", { locale: ru }
                                )}-${format(new Date(currentTour.endTime),"dd MMMM yyyy",{ locale: ru }
                           )}</a>
                        </p>
                        <p class="py-2 text-2xl text-rose-600 font-bold">${currentTour.price}</p>


                    </div> 
                </div>
    `

}

const closeRegisterBtn = document.getElementById ('close-register-btn')
closeRegisterBtn.addEventListener('click', closeContainerRegister)

function closeContainerRegister () {
    containerRegister.style.display = 'none'
  }

  async function sendTour (t) {
    const form = document.getElementById("form").value
    const userName = document.getElementById("name").value
    const userPhone = document.getElementById("phone").value
    const userEmail = document.getElementById("email").value
    const userComment = document.getElementById("comment").value

    let userData = {
        customerName: userName,
        phone: userPhone,
        email: userEmail,
        comment: userComment

    }

    const tourId = currentId

    const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${tourId}`

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userData)
    })
    if (response.ok) {
        alert("Ваше обращение зарегистрировано")
        closeContainerRegister()
        let result = await response.json()
        return result
    }else {
        alert("Повторите еще раз! Произошла ошибка")
    }
  }
 
function clearContainer () {
    document.getElementById('name').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('email').value = ""
    document.getElementById('comment').value = ""
}
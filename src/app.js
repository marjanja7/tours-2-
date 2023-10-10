const { container } = require("postcss")

import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"


const cards = document.getElementById("cards")

async function loadTours() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const data = await response.json()
    
    return data
}

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
                            <p class="font-semibold mt-3 text-lg text-rose-600">${
                                tour.country
                            }</p>
                            <p class='font-semibold mt-3 text-Sm text-rose-400'>${
                                tour.city
                            }</p>
                            <p class="text-grey-400 mt-3">${tour.hotelName}</p>
                        </a>
                        <p class="text-teal-500 font-medium text-sm pt-2">
                            <a href="#">${format(
                                new Date(tour.startTime),
                                "dd MMMM yyyy",
                                { locale: ru }
                            )}-${format(
            new Date(tour.endTime),
            "dd MMMM yyyy",
            { locale: ru }
        )}</a>
                        </p>
                    </div>
                    <div class="mt-3 text-grey-400 text-sm flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 text-rose-600 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="ml-1">Длительность:</span>
                        <span class="text-fblack font-medium" >${duration
                        }</span>
                    </div>

                    <p class="py-2 text-2xl text-rose-600 font-bold">${
                        tour.price
                    }</p>
                    <button class="btn-primary w-full">Подробнее</button>
                </div>
                
            </div>
            </div>
        `
    })
}

async function init() {
    const tours = await loadTours()
    renderTours(tours)
}
init()
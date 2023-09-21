const { container } = require("postcss")

import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"

let counter = 0
let currentTourId
let tours = [
    {
        id: counter++,
        country: "Россия",
        hotelName: "Сочи Парк Отель",
        city: "Адлер",
        
        startTime: "2023-01-04T00:00:00.000Z",
        endTime: "2023-01-12T00:00:00.000Z",
        price: "57000 ₽",
        image: require("/src/images/tour-1.jpg"),
        rating: 7.8,
    },
    {
        id: counter++,
        country: "Россия",
        hotelName: "MONE",
        city: "Сочи",
        
        startTime: "2023-02-04T00:00:00.000Z",
        endTime: "2023-01-12T00:00:00.000Z",
        price: "75000 ₽",
        image: require("/src/images/tour-2.jpg"),
        rating: 8.8,
    },
    {
        id: counter++,
        country: "Россия",
        hotelName: "Bridge Resort",
        city: "Адлер",
        
        startTime: "2023-02-04T00:00:00.000Z",
        endTime: "2023-01-12T00:00:00.000Z",
        price: "89000 ₽",
        image: require("/src/images/tour-3.jpg"),
        rating: 8.4,
    },
]
const cards = document.getElementById("cards")

async function loadTours() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const data = await response.json()

    return data
}

function renderTours() {
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
                        <span class="text-fblack font-medium" >${
                            tour.duration
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
renderTours()
loadTours()
renderTours()
console(tours)
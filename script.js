// ✅ Pegando os elementos do HTML
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const todayButton = document.getElementById('today');
const holidaysList = document.getElementById('holidays');

// ✅ Cores do calendário 6x2
const colors = ['green', 'green', 'blue', 'blue', 'yellow', 'yellow', 'red', 'red'];

let currentDate = new Date();
let today = new Date();

// ✅ Lista de feriados nacionais (DD-MM)
const feriados = {
    "01-01": "Confraternização Universal",
    "21-04": "Tiradentes",
    "01-05": "Dia do Trabalho",
    "07-09": "Independência do Brasil",
    "12-10": "Nossa Senhora Aparecida",
    "02-11": "Finados",
    "15-11": "Proclamação da República",
    "25-12": "Natal"
};

function generateCalendar() {
    calendar.innerHTML = '';
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    let dayOfWeek = startDate.getDay();
    let daysInMonth = endDate.getDate();

    monthYear.textContent = `${startDate.toLocaleString('default', { month: 'long' })} ${startDate.getFullYear()}`;

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    let initialColorIndex = (Math.floor((startDate - new Date(2024, 7, 23)) / (1000 * 60 * 60 * 24)) % colors.length + colors.length) % colors.length;

    for (let i = 0; i < dayOfWeek; i++) {
        calendar.appendChild(document.createElement('div'));
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        let colorIndex = (initialColorIndex + i - 1) % colors.length;
        dayDiv.classList.add(colors[colorIndex]);
        dayDiv.innerHTML = `<span>${i}</span>`;

        if (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth() && i === today.getDate()) {
            dayDiv.classList.add('today');
        }

        calendar.appendChild(dayDiv);
    }

    updateHolidays(initialColorIndex);
}

function updateHolidays(initialColorIndex) {
    holidaysList.innerHTML = "";
    let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    let foundHoliday = false;

    for (let day in feriados) {
        if (day.endsWith(month)) {
            let dayNumber = parseInt(day.split("-")[0]);
            let colorIndex = (initialColorIndex + dayNumber - 1) % colors.length;
            let li = document.createElement("li");
            li.textContent = `${dayNumber}/${month}: ${feriados[day]}`;
            li.classList.add(colors[colorIndex]);
            holidaysList.appendChild(li);
            foundHoliday = true;
        }
    }

    if (!foundHoliday) {
        holidaysList.innerHTML = "<li style='font-style:italic'>Sem Feriados Nacionais esse Mês</li>";
    }
}

prevButton.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() - 1); generateCalendar(); });
nextButton.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); generateCalendar(); });
todayButton.addEventListener('click', () => { currentDate = new Date(today); generateCalendar(); });

generateCalendar();

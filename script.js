const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const todayButton = document.getElementById('today');
const colors = ['green', 'green', 'blue', 'blue', 'yellow', 'yellow', 'red', 'red'];
let currentDate = new Date(); // 23 de agosto de 2024
let today = new Date();

function generateCalendar() {
    calendar.innerHTML = '';
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    let dayOfWeek = startDate.getDay();
    let daysInMonth = endDate.getDate();

    monthYear.textContent = `${startDate.toLocaleString('default', { month: 'long' })} ${startDate.getFullYear()}`;

    // Adicionar cabeçalho dos dias da semana
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Calcular o índice de cor inicial
    let initialColorIndex = (Math.floor((startDate - new Date(2024, 7, 23)) / (1000 * 60 * 60 * 24)) % colors.length + colors.length) % colors.length;

    for (let i = 0; i < dayOfWeek; i++) {
        const emptyDiv = document.createElement('div');
        calendar.appendChild(emptyDiv);
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
}

prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
});

todayButton.addEventListener('click', () => {
    currentDate = new Date(today);
    generateCalendar();
});

generateCalendar();

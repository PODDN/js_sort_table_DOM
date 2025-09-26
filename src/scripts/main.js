'use strict';

const thead = document.querySelector('thead');
const allHeader = thead.querySelectorAll('th');
const tbody = document.querySelector('tbody');

allHeader.forEach((th, index) => {
  th.addEventListener('click', (e) => {
    // Забороняємо стандартну поведінку, якщо це <a>
    e.preventDefault();

    const columnIndex = index;

    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Визначаємо тип колонки: числова або текстова
    let isNumericColumn = true;
    for (let row of rows) {
      const cell = row.cells[columnIndex];
      const value = cell ? cell.textContent.trim() : '';
      if (value !== '' && isNaN(parseFloat(value.replace(/[^0-9.-]+/g, '')))) {
        isNumericColumn = false;
        break;
      }
    }

    rows.sort((rowA, rowB) => {
      const cellA = rowA.cells[columnIndex];
      const cellB = rowB.cells[columnIndex];

      const valA = cellA ? cellA.textContent.trim() : '';
      const valB = cellB ? cellB.textContent.trim() : '';

      if (isNumericColumn) {
        const numA = parseFloat(valA.replace(/[^0-9.-]+/g, '')) || 0;
        const numB = parseFloat(valB.replace(/[^0-9.-]+/g, '')) || 0;
        return numA - numB; // ASC only
      } else {
        return valA.localeCompare(valB); // ASC only
      }
    });

    // Оновлюємо таблицю
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
  });
});


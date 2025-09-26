'use strict';

const thead = document.querySelector('thead');
const allHeader = thead.querySelectorAll('th');
const tbody = document.querySelector('tbody');

// Об'єкт для зберігання стану сортування кожного стовпця
const sortState = {};

allHeader.forEach((th, index) => {
  th.addEventListener('click', (e) => {
    // Індекс стовпця
    const columnIndex = index;

    // Масив рядків
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Визначаємо напрям сортування (за замовчуванням зростання)
    sortState[columnIndex] = !sortState[columnIndex];

    const asc = sortState[columnIndex];

    // Сортуємо рядки
    rows.sort((rowA, rowB) => {
      const cellA = rowA.querySelectorAll('td')[columnIndex].textContent.trim();
      const cellB = rowB.querySelectorAll('td')[columnIndex].textContent.trim();

      const numA = parseFloat(cellA.replace(/[^0-9.-]+/g, ''));
      const numB = parseFloat(cellB.replace(/[^0-9.-]+/g, ''));

      const isNumeric = !isNaN(numA) && !isNaN(numB);

      if (isNumeric) {
        return asc ? numA - numB : numB - numA;
      } else {
        return asc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
      }
    });

    // Оновлюємо таблицю
    tbody.innerHTML = '';
    rows.forEach((row) => tbody.appendChild(row));
  });
});

import {Auth} from "../services/auth";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

export class IncomeAndExpense {
    constructor() {

        this.createIncomeBtn = document.getElementById('create-income-btn');
        this.transferToCreateIncome();
        this.createExpenseBtn = document.getElementById('create-expense-btn');
        this.transferToCreateExpense();

        // переменная для массива доходов/расходов
        // this.budgetItems = null;

        // переменная для хранения родительского элемента  - тела таблицы
        this.tableBodyElement = null;

        this.intervals = {
            "today": document.getElementById('today'),
            "week": document.getElementById('week'),
            "month": document.getElementById('month'),
            "year": document.getElementById('year'),
            "all": document.getElementById('all'),
        }

        this.intervalBtn = document.getElementById('interval-btn');
        this.intervalInputs = document.getElementById('interval-inputs');
        this.dateFrom = document.getElementById('date-from');
        this.dateTo = document.getElementById('date-to');

        this.accessToken = localStorage.getItem(Auth.accessTokenKey);

        const that = this;

        this.init().then();

        this.intervalBtn.onclick = function () {
            that.intervalBtn.classList.add('active');
            that.intervalInputs.classList.remove('d-none');
            that.prevButton.classList.remove('active');
            that.prevButton = that.intervalBtn;
        }

        this.calendarDates = {
            dateFrom: null,
            dateTo: null
        }

        new AirDatepicker('#date-from', {
            buttons: ['today', 'clear'],
            // range: true,
            // multipleDatesSeparator: ' по ',

            onSelect({date, formattedDate, datepicker}
            ) {
                that.calendarDates.dateFrom = date;
                that.getCalendarDates(that.calendarDates);
            }

        });

        new AirDatepicker('#date-to', {
            buttons: ['today', 'clear'],
            onSelect({date, formattedDate, datepicker}
            ) {
                that.calendarDates.dateTo = date;
                that.getCalendarDates(that.calendarDates);
            }
        });
    }

    // запрос имеющихся в базе строк бюджета (функция записывает массив с ними в переменную в конструкторе)
    async init() {
        this.changeInterval();
        this.intervals.today.click();
    }

    // проходится по массиву, где ключи - названия кнопок, а значения - поиск по id (придает кнопкам функцию вызова записей)
    changeInterval() {
        const that = this;
        this.prevButton = this.intervals.today;

        for (let period in this.intervals) {
            let periodButton = this.intervals[period];   // (там поиск по id)
            periodButton.onclick = function () {      // задание кнопке периода функции запроса

                that.getOperations(period).then();    // передача названия периода запрашивающей функции

                that.intervalInputs.classList.add('d-none');

                that.prevButton.classList.remove('active');
                periodButton.classList.add('active');

                that.prevButton = periodButton;
            }
        }
    }

    getCalendarDates(dates) {
        let datesIntervalString = 'interval&dateFrom=' + dates.dateFrom + '&dateTo=' + dates.dateTo;
        this.getOperations(datesIntervalString).then();
    }

    // работает, дает массив записей за указанный на кнопке период
    async getOperations(period) {

        if (this.accessToken) {
            try {
                const budgetRecords = await CustomHttp.request(config.host + '/operations?period=' + period, "GET");

                if (budgetRecords) {
                    if (budgetRecords.error) {
                        throw new Error(budgetRecords.error);
                    }

                    // console.log(budgetRecords);

                    this.showBudgetItems(budgetRecords);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // показывает категории
    showBudgetItems(budgetItems) {
        // объявление всеобщего родителя
        this.tableBodyElement = document.getElementById('income-and-expense-table');
        // его очистка при смене периода
        this.tableBodyElement.innerHTML = "";

        this.showBudgetItem(budgetItems);
    }

    showBudgetItem(budgetItems) {
        budgetItems.forEach((item, index) => {

            const budgetItemId = item.id;

            const number = index + 1;
            const type = item.type;
            const category = item.category;
            const amount = item.amount;
            const date = item.date.split('-')[2] + '.' + item.date.split('-')[1] + '.' + item.date.split('-')[0];
            const comment = item.comment;

            const tableStringElement = document.createElement('tr');

            const numberElement = document.createElement('th');
            numberElement.setAttribute('scope', 'row');
            numberElement.classList.add('text-primary-emphasis');
            numberElement.innerText = number;

            const typeElement = document.createElement('td');
            if (type === 'income') {
                typeElement.innerText = 'доход';
                typeElement.classList.add('text-success');
            } else if (type === 'expense') {
                typeElement.innerText = 'расход';
                typeElement.classList.add('text-danger');
            }

            const categoryElement = document.createElement('td');
            categoryElement.innerText = category;

            const amountElement = document.createElement('td');
            amountElement.innerText = amount + '$';

            const dateElement = document.createElement('td');
            dateElement.innerText = date;

            const commentElement = document.createElement('td');
            commentElement.innerText = comment;

            const actionsElement = document.createElement('td');
            const deleteSvgElement = document.createElement('a');
            deleteSvgElement.classList.add('me-2');
            deleteSvgElement.setAttribute('data-bs-toggle', 'modal');
            deleteSvgElement.setAttribute('data-bs-target', '#delete-category');
            const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const deletePath1 = document.createElementNS('http://www.w3.org/2000/svg','path');
            const deletePath2 = document.createElementNS('http://www.w3.org/2000/svg','path');
            const deletePath3 = document.createElementNS('http://www.w3.org/2000/svg','path');
            const deletePath4 = document.createElementNS('http://www.w3.org/2000/svg','path');
            deleteSvg.setAttribute('fill', 'none');
            deleteSvg.setAttribute('viewBox', '0 0 14 15');
            deleteSvg.setAttribute('width', '14');
            deleteSvg.setAttribute('height', '15');
            deletePath1.setAttribute('d', 'M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z');
            deletePath1.setAttribute('fill', 'black');
            deletePath2.setAttribute('d', 'M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z');
            deletePath2.setAttribute('fill', 'black');
            deletePath3.setAttribute('d', 'M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z');
            deletePath3.setAttribute('fill', 'black');
            deletePath4.setAttribute('d', 'M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z');
            deletePath4.setAttribute('fill-rule', 'evenodd');
            deletePath4.setAttribute('clip-rule', 'evenodd');
            deletePath4.setAttribute('fill', 'black');
            deleteSvg.appendChild(deletePath1);
            deleteSvg.appendChild(deletePath2);
            deleteSvg.appendChild(deletePath3);
            deleteSvg.appendChild(deletePath4);
            deleteSvgElement.appendChild(deleteSvg);

            const editSvgElement = document.createElement('a');
            const editSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const editPath = document.createElementNS('http://www.w3.org/2000/svg','path');
            editSvg.setAttribute('fill', 'none');
            editSvg.setAttribute('viewBox', '0 0 16 16');
            editSvg.setAttribute('width', '16');
            editSvg.setAttribute('height', '16');
            editPath.setAttribute('d', 'M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z');
            editPath.setAttribute('fill', 'black');
            editSvg.appendChild(editPath);
            editSvgElement.appendChild(editSvg);

            actionsElement.appendChild(deleteSvgElement);
            actionsElement.appendChild(editSvgElement);

            tableStringElement.appendChild(numberElement);
            tableStringElement.appendChild(typeElement);
            tableStringElement.appendChild(categoryElement);
            tableStringElement.appendChild(amountElement);
            tableStringElement.appendChild(dateElement);
            tableStringElement.appendChild(commentElement);
            tableStringElement.appendChild(actionsElement);

            this.tableBodyElement.appendChild(tableStringElement);

            editSvgElement.onclick = function () {
                // переход на страницу редактирования с сохранением id в href для переноса (в функции openRoute от href отсекается все лишнее, это не повлияет на загрузку нужной страницы)
                location.href = '#/income-and-expense-edit?id=' + budgetItemId;
            }

            const that = this;

            const confirmDeleteBudgetItemBtn = document.getElementById('confirm-delete-budget-btn');

            deleteSvgElement.onclick = function () {
                // переназначить обработчик для кнопки в поп-апе
                confirmDeleteBudgetItemBtn.onclick = function () {
                    console.log(budgetItemId);
                    that.deleteBudgetItem(budgetItemId).then();
                }
            }
        });
    }

    async deleteBudgetItem(id) {
        if (this.accessToken) {
            await CustomHttp.request(config.host + '/operations/' + id, "DELETE");
            location.reload();
        }
    }

    transferToCreateIncome() {
        this.createIncomeBtn.onclick = function () {
            location.href = '#/income-and-expense-create?income';
        }
    }
    transferToCreateExpense() {
        this.createExpenseBtn.onclick = function () {
            location.href = '#/income-and-expense-create?expense';
        }
    }

}
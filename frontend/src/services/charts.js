import Chart from 'chart.js/auto';
import {CustomHttp} from "./custom-http";
import config from "../../config/config";
import {Auth} from "./auth";
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

export class Charts {

    constructor() {
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

        const that = this;

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

                that.getBudgetItems(period).then();    // передача названия периода запрашивающей функции

                that.intervalInputs.classList.add('d-none');

                that.prevButton.classList.remove('active');
                periodButton.classList.add('active');

                that.prevButton = periodButton;
            }
        }
    }

    getCalendarDates(dates) {
        let datesIntervalString = 'interval&dateFrom=' + dates.dateFrom + '&dateTo=' + dates.dateTo;
        this.getBudgetItems(datesIntervalString).then();
    }

    // запрашивает массив записей за указанный на кнопке период
    async getBudgetItems(period) {

        if (this.accessToken) {
            try {
                const budgetItems = await CustomHttp.request(config.host + '/operations?period=' + period, "GET");

                if (budgetItems) {
                    if (budgetItems.error) {
                        throw new Error(budgetItems.error);
                    }

                    // console.log(budgetItems);

                    this.charts(budgetItems);
                    return budgetItems;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    async charts(budgetItems) {
        // очищать canvas, чтобы можно было заново отрисовать диаграмму при смене периода
        if (this.incomeChart) {
            this.incomeChart.destroy();
        }
        if (this.expenseChart) {
            this.expenseChart.destroy();
        }

        const budgetItemsAmount = budgetItems.reduce((object1, value) => {
            // записать по ключу категории число из строки с суммой, если такой категории в массиве еще нет - прибавить 0, иначе прибавить прежнее значение
            object1[value.type][value.category] = parseInt(value.amount) + (!object1[value.type][value.category] ? 0 : object1[value.type][value.category]);
            return {...object1};
        }, {income: {}, expense: {}});
        const incomeAmounts = Object.values(budgetItemsAmount.income);
        // console.log(incomeAmounts);
        const incomeCategoriesLabels = Object.keys(budgetItemsAmount.income);
        // console.log(incomeCategoriesLabels);
        const expenseAmounts = Object.values(budgetItemsAmount.expense);
        // console.log(expenseAmounts);
        const expenseCategoriesLabels = Object.keys(budgetItemsAmount.expense);
        // console.log(expenseCategoriesLabels);

        let plotIncomeChart = document.querySelector('#income-chart');

        this.incomeChart = new Chart(plotIncomeChart, {
            type: 'pie',
            data: {
                labels: incomeCategoriesLabels,   //названия категорий
                datasets: [{
                    data: incomeAmounts,  // количество денег в категории
                    borderWidth: 0
                }]
            },
        });

        let plotExpenseChart = document.querySelector('#expense-chart');
        this.expenseChart = new Chart(plotExpenseChart, {
            type: 'pie',
            data: {
                labels: expenseCategoriesLabels,
                datasets: [{
                    data: expenseAmounts,
                    borderWidth: 0
                }]
            },
        });
    }
}
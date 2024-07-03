import Chart from 'chart.js/auto';
import {FiltersBase} from "../base/filters-base.js";

export class Main extends FiltersBase {

    constructor() {
        super();
        this.initToday();
    }

    initToday() {
        if (this.accessToken) {
            this.intervals.today.classList.add('active');
            this.getOperations('today').then(operations => this.charts(operations));
        }
    }

    getCalendarDates(dates) {
        super.getCalendarDates(dates);

        this.getOperations(this.datesIntervalString).then(operations => {
            this.charts(operations);
        })
    }

    // проходится по массиву, где ключи - названия кнопок, а значения - поиск по id (придает кнопкам функцию вызова записей)
    changeInterval() {
        super.changeInterval();

        for (let period in this.intervals) {
            let periodButton = this.intervals[period];   // (там поиск по id)
            periodButton.onclick = () => {      // задание кнопке периода функции запроса
                // передача названия периода запрашивающей функции
                this.getOperations(period).then(operations => this.charts(operations));

                this.intervalInputs.classList.add('d-none');

                this.prevButton.classList.remove('active');
                periodButton.classList.add('active');

                this.prevButton = periodButton;
            }
        }
    }

// (вызывается в filters-base.js)
    charts(operations) {
        // очищать canvas, чтобы можно было заново отрисовать диаграмму при смене периода
        if (this.incomeChart) {
            this.incomeChart.destroy();
        }
        if (this.expenseChart) {
            this.expenseChart.destroy();
        }

        const operationsAmount = operations.reduce((object1, value) => {
            // записать по ключу категории число из строки с суммой, если такой категории в массиве еще нет - прибавить 0, иначе прибавить прежнее значение
            object1[value.type][value.category] = parseInt(value.amount) + (!object1[value.type][value.category] ? 0 : object1[value.type][value.category]);
            return {...object1};
        }, {income: {}, expense: {}});
        const incomeAmounts = Object.values(operationsAmount.income);
        // console.log(incomeAmounts);
        const incomeCategoriesLabels = Object.keys(operationsAmount.income);
        // console.log(incomeCategoriesLabels);
        const expenseAmounts = Object.values(operationsAmount.expense);
        // console.log(expenseAmounts);
        const expenseCategoriesLabels = Object.keys(operationsAmount.expense);
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





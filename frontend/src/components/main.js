import Chart from 'chart.js/auto';
import {FiltersBase} from "../base/filters-base.js";

export class Main extends FiltersBase {

    constructor() {
        super();
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
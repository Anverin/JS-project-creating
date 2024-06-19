import {Auth} from "../services/auth";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class IncomeAndExpense {
    constructor() {
        // переменная для массива доходов/расходов
        this.budgetItems = null;
        // переменная для хранения родительского элемента  - тела таблицы
        this.tableBodyElement = null;


        this.period = null;


        this.accessToken = localStorage.getItem(Auth.accessTokenKey);

        const that = this;

        this.init().then();

    }

    // запрос имеющихся в базе строк бюджета (функция записывает массив с ними в переменную в конструкторе)
    async init() {
        if (this.accessToken) {
            try {
                // const today = new Date();
                const result = await this.getOperations();

                // const result = await CustomHttp.request(config.host + '/operations?period=interval&dateFrom=2022-09-01&dateTo=2022-09-14', "GET");

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    this.budgetItems = result;

                    console.log(result);

                    this.showBudgetItems();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getOperations(period) {
       return await CustomHttp.request(config.host + '/operations?period=' + 'all', "GET");
    }

    // если все в порядке, показываются категории
    showBudgetItems() {
        // объявление всеобщего родителя
        this.tableBodyElement = document.getElementById('income-and-expense-table');

        this.showBudgetItem();
    }

    showBudgetItem() {
        this.budgetItems.forEach((item, index) => {

            const number = index + 1;
            const type = item.type;
            const category = item.category;
            const amount = item.amount;
            // const date = item.date;
            const date = item.date.split('-')[2] + '.' + item.date.split('-')[1] + '.' + item.date.split('-')[0];
            const comment = item.comment;


// <tr>
            const tableStringElement = document.createElement('tr');

// <th scope="row" className="text-primary-emphasis">1</th>
            const numberElement = document.createElement('th');
            numberElement.setAttribute('scope','row');
            numberElement.classList.add('text-primary-emphasis');
            numberElement.innerText = number;

// <td className="text-success">доход</td>
            const typeElement = document.createElement('td');
            if (type === 'income') {
                typeElement.innerText = 'доход';
                typeElement.classList.add('text-success');
            } else if (type === 'expense') {
                typeElement.innerText = 'расход';
                typeElement.classList.add('text-danger');
            }

// <td>зарплата</td>
            const categoryElement = document.createElement('td');
            categoryElement.innerText = category;

// <td>500$</td>
            const amountElement = document.createElement('td');
            amountElement.innerText = amount + '$';

// <td>11.09.2022</td>
            const dateElement = document.createElement('td');
            dateElement.innerText = date;

// <td></td>
            const commentElement = document.createElement('td');
            commentElement.innerText = comment;

// <td>  <a href="#" className="me-2" data-bs-toggle="modal" data-bs-target="#delete-category"><svg></a>
// <a href="#/income-and-expense-edit"> <svg></a>
// </td>
            const actionsElement = document.createElement('td');

            const editSvgElement = document.createElement('button');
            editSvgElement.innerText = 'У';
            editSvgElement.classList.add('me-2');
            editSvgElement.setAttribute('data-bs-toggle', 'modal');
            editSvgElement.setAttribute('data-bs-target', '#delete-category');

            const deleteSvgElement = document.createElement('a');
            deleteSvgElement.setAttribute('href', '#/income-and-expense-edit');
            deleteSvgElement.innerText = 'P';

            actionsElement.appendChild(editSvgElement);
            actionsElement.appendChild(deleteSvgElement);

            tableStringElement.appendChild(numberElement);
            tableStringElement.appendChild(typeElement);
            tableStringElement.appendChild(categoryElement);
            tableStringElement.appendChild(amountElement);
            tableStringElement.appendChild(dateElement);
            tableStringElement.appendChild(commentElement);
            tableStringElement.appendChild(actionsElement);
// </tr>

            this.tableBodyElement.appendChild(tableStringElement)





            // editBtnElement.onclick = function () {
            //     // переход на страницу редактирования с сохранением id в href для переноса (в функции openRoute от href отсекается все лишнее, это не повлияет на загрузку нужной страницы)
            //     location.href = '#/' + typeCategories + '-category-edit?id=' + categoryId;
            // }







        });

    }

}
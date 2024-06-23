import AirDatepicker from "air-datepicker";
import 'air-datepicker/air-datepicker.css';
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";

export class FiltersBase {
    constructor() {
        this.accessToken = localStorage.getItem(Auth.accessTokenKey);
        const that = this;
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

        if (this.accessToken) {
            this.intervalBtn.onclick = function () {
                that.intervalBtn.classList.add('active');
                that.intervalInputs.classList.remove('d-none');
                that.prevButton.classList.remove('active');
                that.prevButton = that.intervalBtn;
            };

            this.changeInterval();
            this.intervals.today.click();
        }
    }

    getCalendarDates(dates) {
        let datesIntervalString = 'interval&dateFrom=' + dates.dateFrom + '&dateTo=' + dates.dateTo;
        this.getOperations(datesIntervalString).then();
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

    // запрашивает массив записей за указанный на кнопке период
    async getOperations(period) {
        if (this.accessToken) {
            try {
                const operations = await CustomHttp.request(config.host + '/operations?period=' + period, "GET");

                if (operations) {
                    if (operations.error) {
                        throw new Error(operations.error);
                    }
                    // console.log(operations);

                    if (location.hash === '#/') {       // без условия вызывается только одна из них
                        this.charts(operations);
                    } else if (location.hash === '#/income-and-expense') {
                        this.showBudgetItems(operations);
                    }

                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
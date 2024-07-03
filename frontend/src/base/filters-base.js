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
        }
    }

    getCalendarDates(dates) {
        this.datesIntervalString = 'interval&dateFrom=' + dates.dateFrom + '&dateTo=' + dates.dateTo;
    }

    changeInterval() {
        this.prevButton = this.intervals.today;
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

                    return operations;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
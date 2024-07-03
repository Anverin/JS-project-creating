import {CustomHttp} from "./custom-http";
import config from "../../config/config";
import {Auth} from "./auth";

export class ChangeBalance {
    constructor() {
        this.accessToken = localStorage.getItem(Auth.accessTokenKey);
        this.changeBalanceInput = document.getElementById('change-balance-input');
        this.changeBalanceBtn = document.getElementById('change-balance');

        this.balanceValue = document.getElementById('balance');
        this.adaptiveBalanceValue = document.getElementById('balance-adaptive');

        const that = this;

        this.accessToken = localStorage.getItem(Auth.accessTokenKey);

        if (this.accessToken) {
            this.changeBalanceBtn.onclick = function () {
                that.changeBalanceManually().then();
            }
        }
    }


    async getBalance() {
        let balance = await CustomHttp.request(config.host + '/balance', "GET");
        const that = this;
        if (balance) {
            that.balanceValue.innerText = JSON.stringify(balance.balance);
            that.adaptiveBalanceValue.innerText = JSON.stringify(balance.balance);
        }
    }


    async changeBalanceManually() {
        if (this.accessToken) {
            await CustomHttp.request(config.host + '/balance', "PUT", {"newBalance": this.changeBalanceInput.value});
            await this.getBalance();
            // location.reload();
        }
    }
}
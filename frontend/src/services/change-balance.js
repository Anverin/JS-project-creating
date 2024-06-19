import {CustomHttp} from "./custom-http";
import config from "../../config/config";
import {Auth} from "./auth";

export class ChangeBalance {
    constructor() {
        this.accessToken = localStorage.getItem(Auth.accessTokenKey);
        this.changeBalanceInput = document.getElementById('change-balance-input');
        this.changeBalanceBtn = document.getElementById('change-balance');

        const that = this;

        this.accessToken = localStorage.getItem(Auth.accessTokenKey);

        if (this.accessToken) {
            this.changeBalanceBtn.onclick = function () {
                that.changeBalanceManually().then();
            }
        }
    }

    async changeBalanceManually() {
        if (this.accessToken) {
            await CustomHttp.request(config.host + '/balance', "PUT", {"newBalance": this.changeBalanceInput.value});
            location.reload();
        }
    }
}
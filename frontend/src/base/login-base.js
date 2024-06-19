import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class LoginBase {
    fields =[];
    async login() {
        let requestBody = null;
        if (this.rememberMeElement) {
            requestBody = {
                email: this.fields.find(item => item.name === 'email').element.value,
                password: this.fields.find(item => item.name === 'password').element.value,
                rememberMe: this.rememberMeElement.checked,
            }
        } else {
            requestBody = {
                email: this.fields.find(item => item.name === 'email').element.value,
                password: this.fields.find(item => item.name === 'password').element.value,
                rememberMe: false,
            }
        }

        const result = await CustomHttp.request(config.host + '/login', 'POST', requestBody);

        if (result) {
            if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
                throw new Error(result.message);
            }

            Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);

            Auth.setUserInfo({
                userName: result.user.name + ' ' + result.user.lastName,
                userId: result.userId,
            })

            // перевод на другую страницу
            location.href = '/';
        }
    }
}
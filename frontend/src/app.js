import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/common.css";

// import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import {Router} from "./router.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));

        this.router = new Router();    // отслеживание смены url
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));

    }

    handleRouteChanging() {
        this.router.openRoute();
    }
}

(new App());
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/common.css";

import "bootstrap/dist/js/bootstrap.min.js";

import {Router} from "./router.js";
import {SidebarMenuSections} from "./services/sidebar-menu-sections.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));

        this.router = new Router();    // отслеживание смены url
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));



        // изменение цвета ссылок в сайдбаре
        // window.addEventListener('popstate', this.changeMenuColor.bind(this));

    }

    handleRouteChanging() {
        this.router.openRoute();
    }


    // changeMenuColor() {
    //     new SidebarMenuSections().changeSections();
    // }
}

(new App());
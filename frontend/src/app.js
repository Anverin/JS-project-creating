import {Router} from "./router.js";
import {SidebarMenuSections} from "../scripts/sidebar-menu-sections.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));

        this.router = new Router();    // отслеживание смены url
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));


        // изменение цвета ссылок в сайдбаре
        window.addEventListener('popstate', this.changeMenuColor.bind(this));


    }

    handleRouteChanging() {
        this.router.openRoute();
    }


    changeMenuColor() {
        new SidebarMenuSections().changeSections();
    }
}

(new App());
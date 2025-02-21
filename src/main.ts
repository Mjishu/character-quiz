import { updateTheme, toggleLightMode } from './helper';
import { Stored } from './stored';
import { Navbar } from './components/Navbar';

export class Display {
    navbar: Navbar;
    constructor() {
        this.navbar = new Navbar(document.body);
    }

    initialize() {
        this.navbar.initialize();
    }
}

const storedData = new Stored();
const display = new Display();

display.initialize();
updateTheme(document.body, storedData.GetTheme());

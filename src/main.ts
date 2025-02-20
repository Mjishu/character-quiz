import { updateTheme, toggleLightMode } from './helper';
import { Stored } from './stored';

export class Display {
    constructor() {}
}

const storedData = new Stored();
updateTheme(document.body, storedData.GetTheme());

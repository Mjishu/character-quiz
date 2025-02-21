import { toggleLightMode } from '../helper';
// import { Stored } from '../stored';

export class Navbar {
    content: HTMLElement;
    navbar: HTMLElement;
    toggleButton: HTMLButtonElement;

    constructor(content: HTMLElement) {
        // content should be document.body
        this.content = content;
        this.navbar = document.createElement('div');
        this.navbar.id = 'navbar';
        this.toggleButton = document.createElement('button');
    }

    initialize() {
        this.content.appendChild(this.navbar);
        this.createChangeTheme();
        this._checkEvents();
    }

    createChangeTheme() {
        this.toggleButton.type = 'button';
        this.toggleButton.id = 'toggle-display';
        this.toggleButton.innerText = 'Display Mode';
        this.navbar.appendChild(this.toggleButton);
    }

    _checkEvents() {
        if (this.toggleButton != null) {
            this.toggleButton.addEventListener('click', () => {
                toggleLightMode(this.content);
            });
        }
    }
}

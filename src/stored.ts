export class Stored {
    constructor() {}

    SetLanguage(newLanguage: string) {
        localStorage.setItem('language', newLanguage);
    }

    GetLanguage(): string {
        let item = localStorage.getItem('language');
        if (item == null) return '';
        return item;
    }

    SetAlphabet(newAlphabet: string) {
        localStorage.setItem('alphabet', newAlphabet);
    }

    GetAlphabet(): string {
        let item = localStorage.getItem('alphabet');
        if (item === null) return '';
        return item;
    }

    SetMaterial(newMaterial: string) {
        localStorage.setItem('material', newMaterial);
    }

    GetMaterial(): string {
        let item = localStorage.getItem('material');
        if (item === null) return '';
        return item;
    }

    SetTheme(theme: string) {
        localStorage.setItem('theme', theme);
    }

    GetTheme(): 'light' | 'dark' | '' {
        let item = localStorage.getItem('theme');
        if (item === null) return '';
        if (item == 'light' || item == 'dark') {
            return item;
        } else {
            return '';
        }
    }
}

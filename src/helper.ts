import { Stored } from './stored';
const storedData = new Stored();

export function updateTheme(content: HTMLElement, theme: 'light' | 'dark' | '') {
    if (theme === '') return;
    if (theme == 'light') {
        content.classList.remove('dark-mode');
    } else if (theme == 'dark') {
        content.className = 'dark-mode';
    }
    storedData.SetTheme(theme);
}

export function toggleLightMode(content: HTMLElement) {
    content.classList.toggle('dark-mode');
    let currentTheme = storedData.GetTheme();
    if (currentTheme === 'light') {
        storedData.SetTheme('dark');
    } else if (currentTheme === 'dark') {
        storedData.SetTheme('light');
    }
}

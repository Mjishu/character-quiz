import '../styles/quiz.css';
import '../style.css';
import alphabetData from '../data/alphabet.json' assert { type: 'json' };
import languageData from '../data/language.json' assert { type: 'json' };
import { Stored } from '../stored';
import { updateTheme } from '../helper';
import { Navbar } from './Navbar';
import { Timer } from '../components/timer';

/** todo
 * language saves in localstorage but you cant select first item? make it so that the first item in the select is
 *      the current language selected
 * add support for arabic, cyrillic, sanskrit, greek, devanagari, hebrew, farsi, thai, urdu
 */

class AlphabetQuiz {
    content: HTMLElement;
    quizStarted: boolean;
    targetLanguage: Languages;
    alphabet: QuizItem[];
    progress: number;
    alphabetLength: number;
    correct: number;
    targetSelector: HTMLElement;
    inputSelector: HTMLInputElement;
    inputSubmitSelector: HTMLElement;
    currentQuiz: HTMLElement;
    currentAlphabet: string;
    currentMaterial: string;
    alphabetData: QuizItem[];
    languageSelect: HTMLElement;
    alphabetSelect: HTMLElement;
    materialSelect: HTMLElement;
    progressParent: HTMLElement;
    navbar: Navbar;
    audioButton: HTMLElement;
    canListen: boolean;
    Timer: Timer;

    constructor(targetLanguage: Languages, alphabet: any, currentAlphabet: string) {
        this.content = document.querySelector('#app') as HTMLElement;
        this.quizStarted = false;
        this.navbar = new Navbar(document.body);
        this.targetLanguage = targetLanguage;
        this.currentAlphabet = currentAlphabet;
        this.currentMaterial = storedData.GetMaterial();
        this.alphabet = alphabet;
        this.progress = 0;
        this.correct = 0;
        this.targetSelector = document.querySelector('#target-character') as HTMLElement;
        this.inputSelector = document.querySelector('#user-input') as HTMLInputElement;
        this.inputSubmitSelector = document.querySelector('#input-submit') as HTMLElement;
        this.currentQuiz = document.querySelector('#current-quiz') as HTMLElement;
        this.alphabetData = this.alphabet[this.targetLanguage.Language][this.currentAlphabet][this.currentMaterial];
        this.alphabetLength = this.alphabetData.length;
        this.languageSelect = document.querySelector('#language-select') as HTMLElement;
        this.alphabetSelect = document.querySelector('#alphabet-select') as HTMLElement;
        this.materialSelect = document.querySelector('#material-select') as HTMLElement;
        this.progressParent = document.querySelector('#progress-parent') as HTMLElement;
        this.audioButton = document.querySelector('#audio-button') as HTMLButtonElement;
        this.canListen = true;
        this.Timer = new Timer(7, this.content, this.quizStarted); // number = seconds
    }

    Initialize() {
        this.navbar.initialize();
        this.KeyboardInputChecker();
        this.ClickChecker();
        this._eventListeners();
        this.StartQuiz();
    }

    _updateData() {
        this.alphabetData = this.alphabet[this.targetLanguage.Language][this.currentAlphabet][this.currentMaterial];
        this.alphabetLength = this.alphabetData.length;
    }

    StartQuiz() {
        this.quizStarted = true;
        this.progress = 0;
        this.correct = 0;
        this.setCurrentLanguage();
        this.setCurrentAlphabet();
        this.setCurrentMaterial();
        this.ShowCurrentCharacter();
        this.Timer = new Timer(30, this.content);
        this.Timer.setOnTimerEnd(() => {
            this.quizStarted = false;
            this._showProgress();
        });
        this.Timer.Initialize();
    }

    KeyboardInputChecker() {
        document.addEventListener('keydown', (event) => {
            if (!this.quizStarted) return;
            
            if (event.key === 'Enter') {
                this.CheckAnswer();
            }
            if (event.key === ' ' || event.key === 'Space') {
                this._playAudio(this.alphabetData[this.progress]);
            }
        });
    }

    ClickChecker() {
        this.inputSubmitSelector.addEventListener('click', (e) => {
            e.preventDefault();
            if (!this.quizStarted) return;
            this.CheckAnswer();
        });
    }

    ShowCurrentCharacter() {
        this.targetSelector.innerText = this.alphabetData[this.progress].Target;
    }

    NextCharacter() {
        this.progress += 1;
    }

    Answer() {
        setTimeout(() => {
            this.inputSelector.className = '';
        }, 500);
        this.inputSelector.value = '';
        this.progressParent.innerHTML = `<p>${this.progress + 1}/${this.alphabetLength}</p>`;
        if (this.progress == this.alphabetLength - 1) {
            this._showProgress();
            return;
        }
        this.NextCharacter();
        this.ShowCurrentCharacter();
    }

    _replay(popup: HTMLElement) {
        popup.hidden = true;
        window.location.reload();
    }

    _showProgress() {
        const popup = document.createElement('div');
        const scoreResult = document.createElement('h3');
        scoreResult.innerText = this.correct + '/' + this.alphabetLength;
        const close = document.createElement('button');
        close.innerText = 'Home';
        close.addEventListener('click', () => {
            window.location.href = '/';
        });
        const replay = document.createElement('button');
        replay.innerText = 'Replay';
        replay.addEventListener('click', () => {
            this._replay(popup);
        });
        popup.append(scoreResult, close, replay);
        this.content.append(popup);
    }

    CheckAnswer() {
        const userInput = this.inputSelector.value;
        if (userInput == this.alphabetData[this.progress].English) {
            this.inputSelector.className = 'correct-input';
            this.correct++;
        } else {
            this.inputSelector.className = 'incorrect-input';
        }
        this.Answer();
    }

    // select the select from dom instead of credeating it eachtime

    _eventListeners() {
        this.languageSelect.addEventListener('change', (e) => {
            this._updateCurrentLanguage((e.target as HTMLSelectElement).value);
        });

        this.alphabetSelect.addEventListener('change', (e) => {
            this._updateCurrentAlphabet((e.target as HTMLSelectElement).value);
        });

        this.materialSelect.addEventListener('change', (e) => {
            this._updateCurrentMaterial((e.target as HTMLSelectElement).value);
        });

        this.audioButton.addEventListener('click', () => {
            this._playAudio(this.alphabetData[this.progress]);
        });
    }

    setCurrentLanguage() {
        this._removeChildren(this.languageSelect);
        const defaultLanguage = document.createElement('option');
        defaultLanguage.innerText = this.targetLanguage.Language;
        this.languageSelect.append(defaultLanguage);
        for (let i = 0; i < Object.keys(alphabetData).length; i++) {
            const language = Object.keys(alphabetData)[i];
            if (language === this.targetLanguage.Language) continue;
            const option = document.createElement('option');
            option.innerText = language;
            option.value = language;
            this.languageSelect.append(option);
        }
    }

    setCurrentAlphabet() {
        this._removeChildren(this.alphabetSelect);
        const defaultOption = document.createElement('option');
        defaultOption.innerText = this.currentAlphabet;
        this.alphabetSelect.appendChild(defaultOption);
        for (const alphabet of this.targetLanguage.alphabets) {
            const option = document.createElement('option');
            if (alphabet == this.currentAlphabet) continue;
            option.innerText = alphabet;
            option.value = alphabet;
            this.alphabetSelect.append(option);
        }
    }

    setCurrentMaterial() {
        this._removeChildren(this.materialSelect);
        const defaultOption = document.createElement('option');
        defaultOption.innerText = this.currentMaterial;
        this.materialSelect.appendChild(defaultOption);
        for (const item of this.targetLanguage.Parts) {
            const option = document.createElement('option');
            if (item == this.currentMaterial) continue;
            option.innerText = item;
            option.value = item;
            this.materialSelect.append(option);
        }
    }

    _updateCurrentLanguage(name: string) {
        this.targetLanguage = languageData[name] as Languages;
        this.currentAlphabet = this.targetLanguage.alphabets[0];
        this.currentMaterial = this.targetLanguage.Parts[0];
        storedData.SetLanguage(name);
        storedData.SetAlphabet(this.currentAlphabet);
        storedData.SetMaterial(this.currentMaterial);
        this._updateData();
        this.StartQuiz();
    }

    _updateCurrentAlphabet(name: string) {
        this.currentAlphabet = name;
        storedData.SetAlphabet(this.currentAlphabet);
        this._updateData();
        this.StartQuiz();
    }

    _updateCurrentMaterial(name: string) {
        this.currentMaterial = name;
        storedData.SetMaterial(this.currentMaterial);
        this._updateData();
        this.StartQuiz();
    }

    _removeChildren(domElement: HTMLElement) {
        console.log('removing child of ' + domElement.className);
        let child = domElement.lastElementChild;
        while (child) {
            domElement.removeChild(child);
            child = domElement.lastElementChild;
        }
    }

    _playAudio(item: QuizItem) {
        if (!item.Audio_src || !this.canListen) {
            console.log('cant Listen');
            return;
        }
        const music = new Audio(item.Audio_src);
        music.play();
        this.canListen = false;
    }
}

const storedData = new Stored();
const language = storedData.GetLanguage();
const alphabet = storedData.GetAlphabet();
const material = storedData.GetMaterial();
const theme = storedData.GetTheme();
storedData.SetLanguage(language != '' ? language : languageData['japanese'].Language);
storedData.SetAlphabet(alphabet != '' ? alphabet : languageData.japanese.alphabets[0]);
storedData.SetMaterial(material != '' ? material : languageData.japanese.Parts[0]);
storedData.SetTheme(theme != '' ? theme : 'light');
updateTheme(document.body, storedData.GetTheme());

const Quiz = new AlphabetQuiz(languageData[storedData.GetLanguage()] as Languages, alphabetData, storedData.GetAlphabet());
Quiz.Initialize();

import '../styles/learn.css';
import { Stored } from '../stored';
import { Navbar } from './Navbar';
import { updateTheme } from '../helper';
import courseData from '../data/courses.json' assert { type: 'json' };

class Learn {
    content: HTMLElement;
    lessonGrandparent: HTMLElement;
    navbar: Navbar;
    progress: number;
    language: string;
    alphabet: string;
    _lessons: Lesson[];

    constructor() {
        this.content = document.querySelector('#app') as HTMLElement;
        this.lessonGrandparent = document.querySelector('#lesson-grandparent') as HTMLElement;
        this.navbar = new Navbar(document.body);
        this.progress = 0;
        this.language = storedData.GetLanguage();
        this.alphabet = storedData.GetAlphabet();
        // language -> alphabet
        this._lessons = courseData[this.language][this.alphabet];
    }

    initialize() {
        this.navbar.initialize();
        this._createDisplays();
    }

    _createDisplays() {
        const courseParent = document.createElement('div');
        courseParent.className = 'course-parent';
        for (let i = 0; i < Object.keys(courseData).length; i++) {
            this._lessonDisplay(courseParent, Object.keys(courseData)[i], Object.keys(Object.values(courseData)[i]).length, i);
        }
        this.content.appendChild(courseParent);
    }

    _lessonDisplay(courseParent: HTMLElement, lessonName: string, courses: number, index: number) {
        const lessonHolder = document.createElement('button');
        lessonHolder.className = 'lesson-holder';
        const lessonTitle = document.createElement('h4');
        lessonTitle.innerText = lessonName;
        const lessonLengthElement = document.createElement('p');
        lessonLengthElement.innerText = 'Alphabets: ' + courses;
        lessonHolder.append(lessonTitle, lessonLengthElement);
        courseParent.appendChild(lessonHolder);

        lessonHolder.addEventListener('click', () => {
            courseParent.innerHTML = '';
            storedData.SetLanguage(lessonName);
            this._chooseAlphabet(courseParent, index);
        });
    }

    _chooseAlphabet(parent: HTMLElement, lessonNumber: number) {
        const alphabets = Object.keys(Object.values(courseData)[lessonNumber]);
        if (alphabets.length <= 1) {
            // set current language to hangul
            storedData.SetAlphabet(alphabets[0]);
        } else {
            this._alphabetDisplay(parent, alphabets);
        }
    }

    _alphabetDisplay(parent: HTMLElement, alphabets: string[]) {
        for (const alphabet of alphabets) {
            const button = document.createElement('button');
            button.className = 'select-alphabet-button lesson-holder';
            button.innerText = alphabet;
            button.addEventListener('click', () => {
                parent.innerHTML = '';
                storedData.SetAlphabet(alphabet);
                this._lessonInformation();
                this._navigationButtons();
            });
            parent.appendChild(button);
        }
    }

    _lessonInformation() {
        this.lessonGrandparent.hidden = false;
        this.lessonGrandparent.innerHTML = '';
        const currentLesson = this._lessons[this.progress];
        if (currentLesson.order != this.progress) alert('incorrect order');

        const lessonParent = document.createElement('div');
        const lessonTitle = document.createElement('h3');
        const lessonBody = document.createElement('p');

        lessonParent.className = 'lesson-parent';
        lessonTitle.innerText = currentLesson.title;
        lessonBody.innerText = currentLesson.content;

        lessonParent.append(lessonTitle, lessonBody);
        this.lessonGrandparent.append(lessonParent);
    }

    _navigationButtons() {
        const buttons = ['previous', 'next'];
        const buttonParent = document.createElement('div');
        buttonParent.className = 'button-parent';
        for (const button of buttons) {
            const domButton = document.createElement('button');
            domButton.id = button;
            domButton.innerText = button;
            domButton.className = 'navigation-button';
            domButton.addEventListener('click', () => {
                this._navigate(button);
            });
            buttonParent.append(domButton);
            // todo append button to somewhere in the DOM
        }
        this.content.appendChild(buttonParent);
    }

    _navigate(direction: string) {
        if (direction === 'next') {
            if (this.progress < this._lessons.length - 1) {
                this.progress++;
            }
        } else if (direction === 'previous') {
            if (this.progress > 0) {
                this.progress--;
            }
        }
        this._lessonInformation();
    }

    _updateLanguages(language: string, alphabet: string) {
        this.language = language;
        this.alphabet = alphabet;
        this._lessons = courseData[language][alphabet];
        storedData.SetLanguage(language);
        storedData.SetAlphabet(alphabet);
    }
}

const storedData = new Stored();
updateTheme(document.body, storedData.GetTheme());

const learn = new Learn();
learn.initialize();

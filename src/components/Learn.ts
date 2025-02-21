import '../styles/learn.css';
import { Stored } from '../stored';
import { Navbar } from './Navbar';
import { updateTheme } from '../helper';
import courseData from '../data/courses.json';

class Learn {
    content: HTMLElement;
    navbar: Navbar;

    constructor() {
        this.content = document.querySelector('#app') as HTMLElement;
        this.navbar = new Navbar(document.body);
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
            this._chooseAlphabet(courseParent, lessonName, index);
        });
    }

    _chooseAlphabet(parent: HTMLElement, language: string, lessonNumber: number) {
        const alphabets = Object.keys(Object.values(courseData)[lessonNumber]);
        if (alphabets.length <= 1) {
            console.log('just one alphabet');
        } else {
            this._alphabetDisplay(parent, alphabets);
        }
    }

    _alphabetDisplay(parent: HTMLElement, alphabets: string[]) {
        for (const alphabet of alphabets) {
            const button = document.createElement('button');
            button.className = 'select-alphabet-button';
            button.innerText = alphabet;
            button.addEventListener('click', () => {
                parent.innerHTML = '';
                this._startLessons(alphabet);
            });
            parent.appendChild(button);
        }
    }

    _startLessons(alphabet: string) {
        alert('starting ' + alphabet + ' lessons');
    }
}

const storedData = new Stored();
updateTheme(document.body, storedData.GetTheme());

const learn = new Learn();
learn.initialize();

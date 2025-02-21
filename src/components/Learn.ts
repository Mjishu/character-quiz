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
            this._lessonDisplay(courseParent, Object.keys(courseData)[i], Object.keys(Object.values(courseData)[i]).length);
        }
        this.content.appendChild(courseParent);
    }

    _lessonDisplay(courseParent: HTMLElement, lessonName: string, courses: number) {
        const lessonHolder = document.createElement('button');
        lessonHolder.className = 'lesson-holder';
        const lessonTitle = document.createElement('h4');
        lessonTitle.innerText = lessonName;
        const lessonLengthElement = document.createElement('p');
        lessonLengthElement.innerText = 'Alphabets: ' + courses;
        lessonHolder.append(lessonTitle, lessonLengthElement);
        courseParent.appendChild(lessonHolder);

        lessonHolder.addEventListener('click', () => {
            console.log(lessonName);
        });
    }
}

const storedData = new Stored();
updateTheme(document.body, storedData.GetTheme());

const learn = new Learn();
learn.initialize();

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
    }

    _createDisplays() {}

    _lessonDisplay(lessonName: string, courses: number) {
        const lessonHolder = document.createElement('div');
        lessonHolder.className = 'lesson-holder';
        const lessonTitle = document.createElement('h4');
        lessonTitle.innerText = lessonName;
        const lessonLengthElement = document.createElement('p');
        lessonLengthElement.innerText = courses.toString();
        lessonHolder.append(lessonTitle, lessonLengthElement);
        this.content.appendChild(lessonHolder);
    }
}

const storedData = new Stored();
updateTheme(document.body, storedData.GetTheme());

const learn = new Learn();
learn.initialize();

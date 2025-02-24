export class Timer {
    duration: number;
    timer: HTMLElement;
    parent: HTMLElement;

    constructor(duration: number, parent: HTMLElement) {
        // duration should be in ms
        this.duration = duration;
        this.timer = document.createElement('p');
        this.parent = parent;
    }

    Initialize() {
        this.parent.append(this.timer);
        this.Start();
    }

    Start() {
        const timerInterval = setInterval(() => {
            if (this.duration <= 0) {
                clearInterval(timerInterval);
            }
            if (this.duration > 60) {
                const minute = Math.floor(this.duration / 60);
                const seconds = this.duration - minute * 60;
                this.timer.innerText = `${minute}:${this.duration - minute * 60}`; // minute * 60 - this.duration?
                if (seconds < 10) {
                    this.timer.innerText = `${minute}:0${this.duration - minute * 60}`;
                }
            } else {
                this.timer.innerText = `00:${this.duration}`;
            }
            this.duration--;
        }, 1000);
    }
}

export class Timer {
    duration: number;
    timer: HTMLElement;

    constructor(duration: number) {
        // duration should be in ms
        this.duration = duration;
        this.timer = document.createElement('p');
    }

    Start() {
        setInterval(() => {
            this.timer.innerText = this.duration.toString();
            this.duration--;
        }, 1000);
    }
}

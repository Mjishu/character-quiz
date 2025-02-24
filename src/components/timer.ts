export class Timer {
    duration: number;
    timer: HTMLElement;
    parent: HTMLElement;
    isOver: boolean;
    onTimerEnd: (() => void) | null;
    timerStopped: boolean;

    constructor(duration: number, parent: HTMLElement) {
        // duration should be in ms
        this.duration = duration;
        this.timer = document.createElement('p');
        this.parent = parent;
        this.isOver = false;
        this.onTimerEnd = null;
        this.timerStopped = false;
    }

    GetIsOver() {
        return this.isOver;
    }

    Initialize() {
        this.parent.append(this.timer);
        this.Start();
    }

    setOnTimerEnd(callback: () => void) {
        this.onTimerEnd = callback;
    }

    StopTimer() {
        this.isOver = true;
    }

    Start() {
        const timerInterval = setInterval(() => {
            if (this.duration <= 0 || this.isOver) {
                clearInterval(timerInterval);
                this.isOver = true;
                if (this.onTimerEnd) {
                    this.onTimerEnd();
                }
            }
            const minute = Math.floor(this.duration / 60);
            const seconds = this.duration - minute * 60;
            if (this.duration > 60) {
                this.timer.innerText = `${minute}:${this.duration - minute * 60}`; // minute * 60 - this.duration?
                if (seconds < 10) {
                    this.timer.innerText = `${minute}:0${this.duration - minute * 60}`;
                }
            } else {
                this.timer.innerText = `00:${this.duration}`;
                if (seconds < 10) {
                    this.timer.innerText = `${minute}:0${this.duration - minute * 60}`;
                }
            }
            this.duration--;
        }, 1000);
    }
}

import './style.css'
import data from "./data/alphabet.json" assert {type: "json"}

class AlphabetQuiz {
  content: HTMLElement;
  targetLanguage: Languages;
  alphabet: QuizItem[];
  progress: number;
  alphabetLength: number;
  correct: number;
  targetSelector: HTMLElement;
  inputSelector: HTMLInputElement;
  inputSubmitSelector: HTMLElement;
  currentQuiz: HTMLElement;

  constructor (targetLanguage: Languages, alphabet: QuizItem[]) {
    this.content = document.querySelector("#app") as HTMLElement;
    this.targetLanguage = targetLanguage
    this.alphabet = alphabet
    this.progress = 0
    this.alphabetLength = alphabet.length
    this.correct = 0
    this.targetSelector = document.querySelector("#target-character") as HTMLElement;
    this.inputSelector  = document.querySelector("#user-input") as HTMLInputElement;
    this.inputSubmitSelector = document.querySelector("#input-submit") as HTMLElement;
    this.currentQuiz = document.querySelector("#current-quiz") as HTMLElement;
  }

  StartQuiz() {
    this.KeyboardInputChecker()
    this.ClickChecker()
    this.progress = 0;
    this.ShowCurrentCharacter()
    this.setCurrentQuiz()
  }

  KeyboardInputChecker() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.CheckAnswer();
      }
    });
  }

  ClickChecker () {
    this.inputSubmitSelector.addEventListener("click", (e) => {
      e.preventDefault()
      this.CheckAnswer();      
    })
  }

  ShowCurrentCharacter() {
    this.targetSelector.innerText = this.alphabet[this.progress].Target
  }

  NextCharacter() {
    this.progress += 1
  }

  Answer() {
    this.NextCharacter()
    this.ShowCurrentCharacter()
    this.inputSelector.value = ""
    console.log(this.progress)
  }

  _replay(popup: HTMLElement) {
    popup.hidden = true;
    this.StartQuiz();
  }

  _showProgress() {
    const popup = document.createElement("div");
    const scoreResult = document.createElement("h3")
    scoreResult.innerText = this.correct + "/" + this.alphabetLength;
    const close = document.createElement('button');
    close.innerText = "Close"
    close.addEventListener("click", () => {popup.hidden = true})
    const replay = document.createElement('button');
    replay.innerText = "Replay";
    replay.addEventListener('click', () => {this._replay(popup)})
    popup.append(scoreResult, close, replay)
    this.content.append(popup)
  }

  CheckAnswer() {
    if (this.progress == this.alphabetLength) {
      this._showProgress();
      return 
    }
    
    console.log("reached")
    const userInput = this.inputSelector.value
    if (userInput == this.alphabet[this.progress].English) {
      this.Answer();
      this.correct ++;
    } else {
      // show a popup or something of the target character with information on it
      alert("Incorrect!")
      this.Answer();
    }
  }

  setCurrentQuiz() {
    const quizName = document.createElement("h2")
    quizName.innerText = this.targetLanguage.alphabets[0]
    this.currentQuiz.appendChild(quizName);
  }

}



const alphabet:QuizItem[] = data.jp.hiragana.vowels

const japanese: Languages = {
  Language: "Japanese", alphabets: ["Hiragana", "Katakana"]
}

const Quiz = new AlphabetQuiz(japanese, alphabet)
Quiz.StartQuiz()
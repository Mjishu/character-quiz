import './style.css'

class AlphabetQuiz {
  content: HTMLElement;
  targetLanguage: LanguageOptions;
  alphabet: QuizItem[];
  progress: number;
  alphabetLength: number;
  correct: number;
  targetSelector: HTMLElement;
  inputSelector: HTMLInputElement;
  inputSubmitSelector: HTMLElement;

  constructor (targetLanguage: LanguageOptions, alphabet: QuizItem[]) {
    this.content = document.querySelector("#app") as HTMLElement;
    this.targetLanguage = targetLanguage
    this.alphabet = alphabet
    this.progress = 0
    this.alphabetLength = alphabet.length
    this.correct = 0
    this.targetSelector = document.querySelector("#target-character") as HTMLElement;
    this.inputSelector  = document.querySelector("#user-input") as HTMLInputElement;
    this.inputSubmitSelector = document.querySelector("#input-submit") as HTMLElement;
  }

  StartQuiz() {
    this.KeyboardInputChecker()
    this.ClickChecker()
    this.progress = 0;
    this.ShowCurrentCharacter()
  }

  KeyboardInputChecker() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        console.log('ran kb')
        this.CheckAnswer();
      }
    });
  }

  ClickChecker () {
    this.inputSubmitSelector.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("ran click")
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
    this.inputSelector.value = ""
    this.NextCharacter()
    this.ShowCurrentCharacter()
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
    close.addEventListener("click", () => {popup.hidden = true})
    const replay = document.createElement('button');
    replay.addEventListener('click', () => {this._replay(popup)})
    popup.append(scoreResult, close, replay)
    this.content.append(popup)
  }

  CheckAnswer() {
    if (this.progress == this.alphabetLength) {
      this._showProgress();
      console.log("reached")
      return 
    }

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
}

const alphabet:QuizItem[] = [
  {
    "Target": "あ",
    "English": "a"
  },
  {
    "Target": "い",
    "English": "i"
  },
  {
    "Target": "う",
    "English": "u"
  },
  {
    "Target": "え",
    "English": "e"
  },
  {
    "Target": "お",
    "English": "o"
  },
 ]

const Quiz = new AlphabetQuiz("jp", alphabet)
Quiz.StartQuiz()
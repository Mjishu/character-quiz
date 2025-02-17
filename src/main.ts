import './style.css'
import alphabetData from "./data/alphabet.json" assert {type: "json"}
import languageData from "./data/language.json" assert {type: "json"}

/** todo
 * update alphabet and material when updating language
 * add support for arabic, cyrillic, sanskrit, greek, devanagari, hebrew, farsi, thai, urdu 
 */

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
  currentAlphabet: string;
  currentMaterial: string;
  alphabetData: QuizItem[]
  languageSelect: HTMLElement;
  alphabetSelect: HTMLElement;
  materialSelect: HTMLElement;

  constructor (targetLanguage: Languages, alphabet: any, currentAlphabet: string) {
    this.content = document.querySelector("#app") as HTMLElement;
    this.targetLanguage = targetLanguage
    this.currentAlphabet = currentAlphabet
    this.currentMaterial = targetLanguage.Parts[0]
    this.alphabet = alphabet
    this.progress = 0
    this.correct = 0
    this.targetSelector = document.querySelector("#target-character") as HTMLElement;
    this.inputSelector  = document.querySelector("#user-input") as HTMLInputElement;
    this.inputSubmitSelector = document.querySelector("#input-submit") as HTMLElement;
    this.currentQuiz = document.querySelector("#current-quiz") as HTMLElement;
    this.alphabetData = this.alphabet[this.targetLanguage.Language][this.currentAlphabet][this.currentMaterial]
    this.alphabetLength = this.alphabetData.length
    this.languageSelect = document.querySelector("#language-select") as HTMLElement
    this.alphabetSelect = document.querySelector("#alphabet-select") as HTMLElement
    this.materialSelect = document.querySelector("#material-select") as HTMLElement
  }
  
  Initialize() {
    this.KeyboardInputChecker()
    this.ClickChecker()
    this.setCurrentLanguage()
    this.setCurrentAlphabet()
    this.setCurrentMaterial() 
    this._eventListeners()
    this.StartQuiz()
  }

  _updateData() {
    this.alphabetData = this.alphabet[this.targetLanguage.Language][this.currentAlphabet][this.currentMaterial]
    this.alphabetLength = this.alphabetData.length
  }

  StartQuiz() {
    this.progress = 0;
    this.correct = 0;
    this.ShowCurrentCharacter()
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
    this.targetSelector.innerText = this.alphabetData[this.progress].Target;
  }

  NextCharacter() {
    this.progress += 1
  }

  Answer() {
    this.inputSelector.value = ""
    if (this.progress == this.alphabetLength - 1) {
      this._showProgress();
      return 
    }
    this.NextCharacter()
    this.ShowCurrentCharacter()
  }

  _replay(popup: HTMLElement) {
    popup.hidden = true;
    window.location.reload();
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
    const userInput = this.inputSelector.value
    if (userInput == this.alphabetData[this.progress].English) {
      this.correct ++;
    } else {
      console.warn("Incorrect!")
    }
    this.Answer()
  }

  // select the select from dom instead of credeating it eachtime

  _eventListeners() {
    this.languageSelect.addEventListener("change", (e) => {
      this._updateCurrentLanguage((e.target as HTMLSelectElement).value)
    })

    this.alphabetSelect.addEventListener("change", (e) => {
      this._updateCurrentAlphabet((e.target as HTMLSelectElement).value)
    })

    this.materialSelect.addEventListener("change", (e) => {
      this._updateCurrentMaterial((e.target as HTMLSelectElement).value)
    })
  }

  setCurrentLanguage() {
    this._removeChildren(this.languageSelect)
    const defaultOption = document.createElement("option")
    defaultOption.innerText = this.targetLanguage.Language
    for (let i = 0; i < Object.keys(alphabetData).length; i++) {
      const language = Object.keys(alphabetData)[i]
      const option = document.createElement("option")
      option.innerText = language;
      option.value = language;
      this.languageSelect.append(option)
    }

  }

  setCurrentAlphabet() {
    this._removeChildren(this.alphabetSelect)
    const defaultOption = document.createElement("option")
    defaultOption.innerText = this.currentAlphabet
    for (const alphabet of this.targetLanguage.alphabets) {
      const option = document.createElement("option")
      option.innerText = alphabet;
      option.value = alphabet;
      this.alphabetSelect.append(option)
    }
  }

  setCurrentMaterial() {
    this._removeChildren(this.materialSelect)
    const defaultOption = document.createElement("option");
    defaultOption.innerText = this.targetLanguage.Parts[0];
    for (const item of this.targetLanguage.Parts) {
      const option = document.createElement("option")
      option.innerText = item;
      option.value = item;
      this.materialSelect.append(option)
    }
  }

  _updateCurrentLanguage(name: string) {
    this.targetLanguage =   languageData[name] as Languages
    console.log(this.targetLanguage)
    this.currentAlphabet = this.targetLanguage.alphabets[0]
    console.log(this.currentAlphabet)
    this.currentMaterial = this.targetLanguage.Parts[0]
    console.log(this.currentMaterial)
    this._updateData()
    this.StartQuiz();
  }

  _updateCurrentAlphabet(name: string) {
    this.currentAlphabet = name;
    this._updateData();
    this.StartQuiz();
  }

  _updateCurrentMaterial(name: string) {
    this.currentMaterial = name;
    this._updateData();
    this.StartQuiz();
  }

  _removeChildren(domElement: HTMLElement) {
    let child = domElement.lastElementChild;
    while (child) {
      domElement.removeChild(child);
      child = domElement.lastElementChild;
    }
  }
}

const Quiz = new AlphabetQuiz(languageData["japanese"] as Languages, alphabetData, languageData.japanese.alphabets[0])
Quiz.Initialize()
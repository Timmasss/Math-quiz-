class Question {
    constructor() {
      this.generateNumbers();
      this.generateQuestion();
    }
  
    generateNumbers() {
      this.num1 = Math.floor(Math.random() * 90) + 10;
      this.num2 = Math.floor(Math.random() * 90) + 10;
    }
  
    generateQuestion() {
      const operations = ["+", "-", "*", "/"];
      this.operation = operations[Math.floor(Math.random() * 4)];
  
      this.correctAnswer = this.calculateAnswer();
      this.option = this.generateOptions();
    }
  
    calculateAnswer() {
      switch (this.operation) {
        case "+":
          return this.num1 + this.num2;
  
        case "-":
          return this.num1 - this.num2;
  
        case "*":
          return this.num1 * this.num2;
  
        case "/":
          return this.num1 / this.num2;
      }
    }
  
    generateOptions() {
      const options = [this.correctAnswer];
  
      while (options.length < 4) {
        let wrongAnswer;
        const devialon = Math.floor(Math.random() * 10) + 1;
        wrongAnswer = this.correctAnswer + (Math.random() < 0.5 ? devialon : -devialon);
  
        if (!options.includes(wrongAnswer)) {
          options.push(wrongAnswer);
        }
      }
  
      return options.sort(() => Math.random() - 0.5);
    }
  
    getQuestionText() {
      return `${this.num1} ${this.operation} ${this.num2}`;
    }
  }
  
  class Quiz {
    constructor() {
      this.score = 0;
      this.questionCount = 0;
      this.timeLimit = 20;
      this.isRunning = false;
      this.initializeElements();
      this.btnEvents();
    }
  
    initializeElements() {
      this.timerElement = document.querySelector("#timer");
      this.scoreElement = document.querySelector("#score");
      this.questionElement = document.querySelector("#question");
      this.optionsElement = document.querySelector("#options");
      this.startButton = document.querySelector("#startButton");
      this.resultElement = document.querySelector("#results");
      this.finalScoreElement = document.querySelector("#finalScore");
      this.restartButton = document.querySelector("#restartButton");
    }
  
    btnEvents() {
      this.startButton.addEventListener("click", () => this.startGame());
    }
  
    startGame() {
      this.score = 0;
      this.questionCount = 0;
      this.isRunning = true;
  
      this.startButton.classList.add("hidden");
      this.resultElement.classList.add("hidden");
  
      this.startTimer();
      this.showQuestion();
    }
  
    startTimer() {
      let timeLeft = this.timeLimit;
      this.timerElement.textContent = `Timer ${timeLeft} s`;
  
      this.timer = setInterval(() => {
        timeLeft--;
        this.timerElement.textContent = `Timer ${timeLeft} s`;
  
        if (timeLeft <= 0) {
          this.endGame();
        }
      }, 1000);
    }
  
    showQuestion() {
      const question = new Question();
  
      this.questionElement.textContent = question.getQuestionText();
      this.optionsElement.innerHTML = "";
  
      question.option.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("option-button");
        button.textContent = option;
        button.addEventListener("click", () => {
          if (option === question.correctAnswer) {
            this.score += 1;
          }
          this.questionCount++;
          this.showQuestion();
        });
        this.optionsElement.append(button);
      });
    }
  
    endGame() {
      clearInterval(this.timer);
      this.isRunning = false;
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new Quiz();
  });
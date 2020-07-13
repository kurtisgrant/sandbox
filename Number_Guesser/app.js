let minNum = 1,
  maxNum = 10,
  guesses = 3,
  guessesLeft = guesses,
  winNumber = 3;

const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const minNumTxt = document.querySelector(".min-num");
const maxNumTxt = document.querySelector(".max-num");
const game = document.querySelector("#game");
const message = document.querySelector(".message");

minNumTxt.textContent = minNum;
maxNumTxt.textContent = maxNum;

newWinNumber();

game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    console.log("started reset");
    setMessage("", "");
    newWinNumber();
    guessesLeft = guesses;
    guess = null;
    guessInput.disabled = false;
    guessInput.value = null;
    guessBtn.value = "submit";
    guessBtn.className = "submit";
  } else if (e.target.className === "submit") {
    let guess = parseInt(guessInput.value);

    console.log("guess =", guess);

    //Validate guess
    if (isNaN(guess) || guess > maxNum || guess < minNum) {
      setMessage(
        "red",
        `Please enter a number between ${minNum} and ${maxNum}`
      );
      guessInput.value = null;
    } else {
      //Check for win
      if (guess === winNumber) {
        guessInput.disabled = true;
        setMessage(
          "green",
          `Yes! Congratulations! The number was ${winNumber}!`
        );
        guessBtn.value = "Play again";
        guessBtn.className = "play-again";
      } else {
        guessesLeft -= 1;

        if (guessesLeft > 0) {
          guessInput.value = null;
          if (guessesLeft === 1) {
            setMessage(
              "orange",
              `${guess} is not correct. You have 1 guess left.`
            );
          } else {
            setMessage(
              "orange",
              `${guess} is not correct. You have ${guessesLeft} guesses left.`
            );
          }
        }
        // Loose case
        else {
          guessInput.disabled = true;
          setMessage(
            "red",
            `${guess} is incorrect. You lose. The number was ${winNumber}.`
          );
          guessBtn.value = "play again";
          guessBtn.className = "play-again";
        }
      }
    }
  }
});

game.addEventListener("mousedown", function (e) {});

function setMessage(color, messageTxt) {
  message.textContent = messageTxt;
  message.style.color = color;
  guessInput.style.borderColor = color;
}

function newWinNumber() {
  winNumber = Math.floor(Math.random() * (maxNum - minNum + minNum) + 1);
  console.log("new number =", winNumber);
}

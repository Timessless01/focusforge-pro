const startButton = document.getElementById('startTimer');
const resetButton = document.getElementById('resetTimer');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent * circumference);
  circle.style.strokeDashoffset = offset;
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  setProgress(timeLeft / (25 * 60));
}

startButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startButton.textContent = '⏸ Pause';
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft === 0) {
        clearInterval(timer);
        new Notification('Time Up!', {
          body: 'Great work! Take a short break.'
        });
      }
    }, 1000);
  } else {
    isRunning = false;
    startButton.textContent = '▶ Resume';
    clearInterval(timer);
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();
  startButton.textContent = '▶ Start';
});

// Initial display
updateDisplay();
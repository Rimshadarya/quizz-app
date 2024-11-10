var questions = [
    {
      question: "Q1: HTML Stands for?",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "CSS Stands for",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which tag is used for most large heading",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      corrAnswer: "<h1>",
    },
    {
      question: "Which tag is used to make element unique ",
      option1: "id",
      option2: "class",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Any element assigned with id, can be get in css ",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "CSS can be used with ______ methods ",
      option1: "8",
      option2: "3",
      option3: "4",
      corrAnswer: "3",
    },
    {
      question: "In JS variable types are ____________ ",
      option1: "6",
      option2: "3",
      option3: "8",
      corrAnswer: "8",
    },
    {
      question: "In array we can use key name and value ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "toFixed() is used to define length of decimal ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "push() method is used to add element in the start of array ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
  ];
  
  var button = document.getElementById("btn");
  var question = document.getElementById("ques");
  var option1 = document.getElementById("opt1");
  var option2 = document.getElementById("opt2");
  var option3 = document.getElementById("opt3");
  var index = 0;
  var score = 0;
  var sec = 59; // Initial seconds for the timer
  var min = 1;  // Initial minutes for the timer
  var timerElement = document.getElementById("timer");
  var timerInterval;
  
  // Timer function that decrements seconds and handles time out
  function timer() {
    timerElement.innerText = `${min}:${sec < 10 ? '0' + sec : sec}`; // Format time
  
    sec--; // Decrement the seconds
    if (sec < 0) {
      min--; // If seconds are less than 0, reduce minute by 1
      sec = 59; // Reset seconds to 59
  
      if (min < 0) { // If minutes go below 0, stop the timer and move to next question
        clearInterval(timerInterval); // Stop timer
        nextQuestion(); // Go to next question when time is up
      }
    }
  }
  
  // Start the timer for each question
  function startTimer() {
    sec = 59; // Reset seconds to 59 for the new question
    min = 1;  // Reset minutes to 1 minute
    clearInterval(timerInterval); // Clear any existing intervals
    timerInterval = setInterval(timer, 1000); // Start the timer at 1-second intervals
  }
  
  // Move to the next question, check answers, and update the score
  function nextQuestion() {
    var options = document.getElementsByClassName("options");
    var selectedOption = null;
  
    // Find the selected option
    for (var i = 0; i < options.length; i++) {
      if (options[i].checked) {
        selectedOption = options[i].value;
        break;
      }
    }
  
    // Check if a valid option was selected
    if (selectedOption !== null) {
      var correctAnswer = questions[index]["corrAnswer"];
      var selectedAnswer = questions[index][`option${selectedOption}`];
  
      // If the selected answer is correct, increment the score
      if (selectedAnswer === correctAnswer) {
        score++;
      }
    }
  
    // Deselect all options for the next question
    for (var i = 0; i < options.length; i++) {
      options[i].checked = false;
    }
  
    // Disable the button until an answer is selected
    button.disabled = true;
  
    // If all questions have been answered, show the score
    if (index >= questions.length) {
      clearInterval(timerInterval); // Stop the timer when quiz is complete
      Swal.fire({
        title: "Good job!",
        text: `Your score is ${(score / questions.length * 100).toFixed(2)}%`,
        icon: "success",
      });
      return;
    }
  
    // Load the next question
    question.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
    index++; // Increment the question index
  
    // Restart the timer for the new question
    startTimer();
  }
  
  // Enable the button when an option is selected
  function clicked() {
    button.disabled = false; // Enable the button when an answer is selected
  }
  
  // Start the timer when the page is loaded
  startTimer();
  
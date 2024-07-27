document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://opentdb.com/api.php?amount=10&type=boolean'; 
    const askElement = document.querySelector('.ask'); // Question
    const trueButton = document.querySelector('.answer.true');  // Answer: true
    const falseButton = document.querySelector('.answer.false'); // Answer: false
    const play = document.querySelector('.play'); // first PLAY button
    const totalScore = document.querySelector('.final'); // Score
    const scoreMessage = document.querySelector('.score-message');
    const playAgainButton = document.querySelector('.play-again');
    const mainScreen = document.querySelector('.screen.hello'); // main screen
    const questionScreen = document.querySelector('.screen.questions'); // questions screen
    const correctScreen = document.querySelector('.screen.correct'); 
    const wrongScreen = document.querySelector('.screen.wrong');
    const continueButtonC = document.querySelector('.continuec'); 
    const continueButtonW = document.querySelector('.continuew');
    
    let questions = [];   //creates an array of q's
    let currentQuestionIndex = 0;
    let score = 0;


   // event to start the game 
    play.addEventListener('click', function() { 
        mainScreen.classList.remove('show'); 
        mainScreen.classList.add('hide');
        questionScreen.classList.remove('hide');
        questionScreen.classList.add('show');
        fetchQuestions();
    });
  
   // FETCH getting 10 random true/false q's
    const fetchQuestions = async () => { 
      try {   //statement defines a code block to run (to try).
        const response = await fetch(apiURL); // variable that holds back until data from API is collected
        const data = await response.json();  // variable that holds back until the json response is returned
        questions = data.results; // updates the const 
        displayQuestion();
      } catch (error) { // if there is an error with the fetch, Error will be shown in the console 
        console.error('Error fetching questions:', error);
      }
    };

    // function updates the askElement with the current question.
    const displayQuestion = () => { 
        if (currentQuestionIndex < questions.length) {
          const currentQuestion = questions[currentQuestionIndex];
          askElement.innerHTML = currentQuestion.question;
        } else {
          showFinalScore()
        }
      };

      const handleAnswer = (userAnswer) => {  // checks the answer
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.correct_answer === 'True';

          if (userAnswer === correctAnswer) { 
           score++;
           showFeedbackScreen(correctScreen);
          } else {
            showFeedbackScreen(wrongScreen);
          }
        
          currentQuestionIndex++; // question count
      };

      const showFeedbackScreen = (screen) => {
        questionScreen.classList.remove('show')
        questionScreen.classList.add('hide')
        screen.classList.remove('hide')
        screen.classList.add('show')
      };

      const nextQuestion = () =>{
        if (currentQuestionIndex < questions.length) {
          questionScreen.classList.remove('hide');
          questionScreen.classList.add('show');
          displayQuestion();
          } else {
          showFinalScore();
          }
        };
      

      const showFinalScore = () => {
        correctScreen.classList.remove('show');
        correctScreen.classList.add('hide');
        wrongScreen.classList.remove('show');
        wrongScreen.classList.add('hide');
        totalScore.classList.remove('hide');
        totalScore.classList.add('show');
        scoreMessage.innerHTML = `🐚 That's it! You scored ${score} out of ${questions.length} 🎡`;

      };

      const playAgain = () => {
        totalScore.classList.remove('show');
        totalScore.classList.add('hide');
        mainScreen.classList.remove('hide');
        mainScreen.classList.add('show');
      };
      
      //these events are to chenge the question/wrong/answers screens

      continueButtonC.addEventListener('click', function() {
        correctScreen.classList.remove('show');
        correctScreen.classList.add('hide');
        nextQuestion();
      });
    
      continueButtonW.addEventListener('click', function() {
        wrongScreen.classList.remove('show');
        wrongScreen.classList.add('hide');
        nextQuestion();
      });

      // Events for the user answer submition 
      trueButton.addEventListener('click', () => handleAnswer(true));
      falseButton.addEventListener('click', () => handleAnswer(false));

      playAgainButton.addEventListener('click', playAgain);
    });
    

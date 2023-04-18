using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Animations;
using UnityEngine.Events;
using UnityEngine.UI;
using TMPro;

/**
LevelLife.cs

It is the life flow of each level, it is compromised of the next key points:

- Load level questions to store during the level
- Show question in UI template
- Call the input method for the player to introduces their answer (evaluation included)
- Retrieve case of the answer (correct, incorrect above, incorrect below, time out)
    - Reproduce animation of the answer (maybe add a replay button and speed up the animation)
    - Add points to the player (register in firebase)
- If wrong answer, redo the level
- If correct answer, go to next question

**/

// Question template struct
[System.Serializable]
public struct Question
{
    public string question;
    public GameObject inputGameObject;
}

// Metrics data format struct
[System.Serializable]
public struct Metrics
{

}

public class LevelLife : MonoBehaviour
{
    // List of questions in the level, they require
    // - Question text
    // - Input method
    // - Animation of the answer
    public List<Question> questionsForm;
    Question currentQuestion;
    public int current_section = 0;
    public int attempts;
    public GameObject questionUI;
    // public GameObject clockUI;
    public LvlOneDataGenerator levelGen;
    public float time = 0.0f;
    bool ticking = false;
    public bool correct;
    public UnityEvent attemptsReduced = new UnityEvent();
    public UnityEvent newQuestion = new UnityEvent();
    private int scoreToGive;

    // Start is called before the first frame update
    void Awake()
    {
        // Set first question in TextMeshPro of question UI
        NextQuestion();
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (ticking)
        {
            time += Time.deltaTime;
        }
    }

    // Method for a countdown clock with a 2 floating point second values
    void CountClock()
    {
        time += Time.deltaTime;
        // If time out, call CheckAnswer()
        if (time <= 0)
        {
            ticking = false;
            CheckAnswer();
        }
        else
        {
            // Start a countdown clock
            time += Time.deltaTime;
        }
        // format time in seconds to minutes and seconds
        string timeString = string.Format("{0:00}:{1:00}", Mathf.Floor(this.time / 60), Mathf.Floor(this.time % 60));
        // Set the clock UI text to the time string
        // clockUI.GetComponent<TextMeshProUGUI>().text = timeString;
    }
    

    // Method to check the answer of the player
    public void CheckAnswer()
    {
        if (correct)
        {
            // Show canvas for correct answer
            print("Correct answer");

            // Deactivate input
            currentQuestion.inputGameObject.SetActive(false);

            // Upload metrics to database
            UploadMetrics();

            // Go to next question
            NextQuestion();
        }
        else
        {
            // Show canvas for wrong answer
            print("Wrong answer");

            // Add continue button with event listener as follows
            if (attempts == 0)
            {
                // Show correct answer for question
                scoreToGive = 0;
                time = 300.0f;

                // Upload metrics to database
                UploadMetrics();

                // Go to next question
                NextQuestion();
            }
            else
            {
                // Reduce attempt
                attempts--;

                // Reduce scoreToGive
                scoreToGive = scoreToGive - 25;
                
                // Invoke attemptsReduced event
                attemptsReduced.Invoke();

                // Reactivate input
                currentQuestion.inputGameObject.SetActive(true);

                // Print attempts left
                print($"Attempts left: {attempts}");
            }
        }

        // // Get the case of the answer
        // int caseAnswer = questions[0].levelGen.GetComponent<LevelGen>().CheckAnswer();

        // // Reproduce animation of the answer
        // questions[0].animator.SetInteger("caseAnswer", caseAnswer);

        // // Add points to the player (register in firebase)

        // // If wrong answer, redo the level
        // if(caseAnswer == 1 || caseAnswer == 2)
        // {
        //     // Reproduce animation of the answer
        //     questions[0].animator.SetInteger("caseAnswer", caseAnswer);

        //     // Add points to the player (register in firebase)
        // }
        // // If correct answer, go to next question
        // else if(caseAnswer == 0)
        // {
        //     NextQuestion();
        // }        
    }

    public void SaveAnswer(bool answer)
    {
        correct = answer;
    }

    // Method to go to next question
    public void NextQuestion ()
    {
        // print(questionsForm.Count);
        // Check if there are more questions
        if (questionsForm.Count == 0)
        {
            // Upload metrics to database
            ticking = false;
            questionUI.SetActive(false);
            return;
        }

        // Send current stage to input manager
        // levelManager.GetComponent<LvlOneInput>().stage = 4 - questionsForm.Count;

        // Set current question
        currentQuestion = questionsForm[0];
        attempts = 3;
        time = 0.0f;
        scoreToGive = 100;
        ticking = true;

        // Invoke newQuestion event
        newQuestion.Invoke();

        // if (questionsForm.Count == 3) {
        //     currentQuestion.levelGen.GetComponent<Rigidbody>().useGravity = true;
        //     currentQuestion.levelGen.GetComponent<BoxTriggers>().enabled = true;
        //     currentQuestion.levelGen2.GetComponent<Lvl1_Astronaut2>().enabled = true;
        // }

        // Set next question in TextMeshPro of question UI
        questionUI.GetComponentInChildren<TextMeshProUGUI>().text = currentQuestion.question;

        // Get button of question UI
        Button btn = questionUI.GetComponentInChildren<Button>();

        // Set button visible
        btn.interactable = true;

        // Remove all listeners from button
        btn.onClick.RemoveAllListeners();

        // Set button of question UI to call the input method of the question
        btn.onClick.AddListener(
            ActivateInput // Substitute for currentQuestion.levelGen.GetComponent<LevelGen>().InputMethod
            );

        // Remove question from list
        questionsForm.RemoveAt(0);
    }

    // Method to upload answer metrics to database
    void UploadMetrics()
    {
        float score = 300.0f - time > 0 ? 300.0f - time : 0;
        print("Score by time: " + score);
        score += scoreToGive;
        Score.instance.UpdateScore((int)score);
        print("Score to give: " + scoreToGive);

        // Upload metrics to database
        LevelOneData levelOneData = new LevelOneData(10, (int)score, time, attempts);
        // Parse to json
        string json = JsonUtility.ToJson(levelOneData);
        // Upload to database
        LevelDataSender dataSender = new LevelDataSender("exercise_1", json);
        dataSender.SendData("level_1", string.Format("section_{0}", current_section));
        // Increment section
        current_section++;

        // print("Metrics uploaded");
    }
    void ButtonClick()
    {
        print("Button Clicked");
    }

    void ActivateInput()
    {
        currentQuestion.inputGameObject.SetActive(true);
    }
}

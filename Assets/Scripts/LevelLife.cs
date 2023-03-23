using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Animations;
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
    public GameObject levelGen;
    public GameObject levelGen2;
    public Animator animator;
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
    int current_section = 1;

    public GameObject questionUI;
    public GameObject clockUI;
    public float time = 90.0f;
    bool ticking = true;

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
            CountdownClock();
        }
    }

    // Method for a countdown clock with a 2 floating point second values
    void CountdownClock()
    {
        // If time out, call CheckAnswer()
        if (time <= 0)
        {
            ticking = false;
            CheckAnswer();
        }
        else
        {
            // Start a countdown clock
            time -= Time.deltaTime;
        }
        // format time in seconds to minutes and seconds
        string timeString = string.Format("{0:00}:{1:00}", Mathf.Floor(this.time / 60), Mathf.Floor(this.time % 60));
        // Set the clock UI text to the time string
        clockUI.GetComponent<TextMeshProUGUI>().text = timeString;
    }
    

    // Method to check the answer of the player
    public void CheckAnswer()
    {
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

    // Method to go to next question
    public void NextQuestion ()
    {
        print(questionsForm.Count);
        // Check if there are more questions
        if (questionsForm.Count == 0)
        {
            // Upload metrics to database
            ticking = false;
            questionUI.SetActive(false);
            return;
        }

        // Set current question
        currentQuestion = questionsForm[0];

        if (questionsForm.Count == 3) {
            currentQuestion.levelGen.GetComponent<Rigidbody>().useGravity = true;
            currentQuestion.levelGen.GetComponent<BoxTriggers>().enabled = true;
            currentQuestion.levelGen2.GetComponent<Lvl1_Astronaut2>().enabled = true;
        }

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
            ButtonClick // Substitute for currentQuestion.levelGen.GetComponent<LevelGen>().InputMethod
            );
        btn.onClick.AddListener(
            NextQuestion // Substitute for currentQuestion.levelGen.GetComponent<LevelGen>().InputMethod
            );
        btn.onClick.AddListener(
            UploadMetrics // Substitute for currentQuestion.levelGen.GetComponent<LevelGen>().InputMethod
            );        

        // Remove question from list
        questionsForm.RemoveAt(0);
    }

    // Method to upload answer metrics to database
    void UploadMetrics()
    {
        // Upload metrics to database
        LevelOneData levelOneData = new LevelOneData(10, 450, 180.0d);
        // Parse to json
        string json = JsonUtility.ToJson(levelOneData);
        // Upload to database
        LevelDataSender dataSender = new LevelDataSender("exercise_1", json);
        dataSender.SendData("level_1", string.Format("section_{0}", current_section));
        // Increment section
        current_section++;

        print("Metrics uploaded");
    }
    void ButtonClick()
    {
        print("Button Clicked");
    }
}
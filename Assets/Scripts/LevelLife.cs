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
public struct Question
{
    public string question;
    public GameObject levelGen;
    public Animator animator;
}

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
    public List<string> questions;

    public GameObject questionUI;

    public GameObject clockUI;
    public float time = 90.0f;
    bool ticking = true;

    // Start is called before the first frame update
    void Start()
    {
        // Set first question in TextMeshPro of question UI
        // questionUI.GetComponent<TextMeshPro>().text = questions[0];

        // Set button of question UI to call the input method of the question
        // questionUI.GetComponent<Button>().onClick.AddListener(
        //     questions[0].levelGen.GetComponent<LevelGen>().InputMethod
        //     );
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
    void NextQuestion ()
    {
        if (questions.Count == 0)
        {
            // Upload metrics to database
            StartCoroutine((IEnumerator)UploadMetrics());
        }
        // Remove question from list
        questions.RemoveAt(0);

        // Set next question in TextMeshPro of question UI
        // questionUI.GetComponent<TextMeshPro>().text = questions[0];

        // Set button of question UI to call the input method of the question
        // questionUI.GetComponent<Button>().onClick.AddListener(
        //     questions[0].levelGen.GetComponent<LevelGen>().InputMethod
        //     );
    }

    // Method to upload answer metrics to database
    IEnumerable UploadMetrics()
    {
        // Upload metrics to database

        yield return null;
    }
}

using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class LvlOneInput : MonoBehaviour
{
    public TextMeshProUGUI pedalSpeedInputText;
    public GyroscopeData gsData;
    public LvlOneDataGenerator dataGenerator;
    public HoldButton pedalHoldButton;
    public GameObject pedalButton, redoButton, submitButton, canvas, astronaut, astronautTwo, energiesCanvas, rope;
    public LevelLife lvlLife;
    public bool forceRightAnswer; // for debugging 
    float pedalSpeedInput, startingYAttitude, startingZAttitude, greatestAnswer = 20, answer;
    bool firstTouch = true;
    public int stage = -1; 
    // Start is called before the first frame update
    void Start()
    {

    }

    void OnEnable()
    {
        Redo();
        pedalSpeedInputText.color = Color.white;
        stage = 3 - lvlLife.questionsForm.Count;
        print($"Stage: {stage}");
        print($"Questions left: {lvlLife.questionsForm.Count}");

        if(stage == 1)
        {
            answer = (float)dataGenerator.v2;
        }
        else if(stage == 2)
        {
            answer = (float)dataGenerator.v1;
        }
        else if(stage == 3)
        {
            answer = (float)dataGenerator.v0;
        }
        else
        {
            answer = 0;
        }
    }

    // Update is called once per frame
    void Update()
    {
        // Check if touched
        float n = 0, pow = 0, div = 0;
        if (pedalHoldButton.holding) {
            if (firstTouch) {
                pedalSpeedInput = 0.0f;
                startingYAttitude = gsData.attitude.y;
                startingZAttitude = gsData.attitude.z;
                firstTouch = false;
            }
            else
            {
                float randomAnswer = (float)(answer + Math.Round(UnityEngine.Random.Range(-0.1f, 0.1f), 2));
                n = ((startingYAttitude - gsData.attitude.y) / 4);
                div = (float)(n / randomAnswer);
                pow = (float)Math.Pow((double)(div - 1), 3.0);
                pedalSpeedInput = (pow + 1) * randomAnswer;
            }
            if(pedalSpeedInput < 0)
            {
                pedalSpeedInputText.color = Color.red;
            }
            else
            {
                pedalSpeedInputText.color = Color.white;
            }
            pedalSpeedInputText.text = $"{pedalSpeedInput:#0.00}";
        }
        else
        {
            // qué es más rápido, asignación o evaluación de un valor booleano?
            if(!firstTouch)
            {
                pedalSpeedInputText.color = Color.yellow;
                pedalButton.SetActive(false);
                redoButton.SetActive(true);
                submitButton.SetActive(true);
                firstTouch = true;
            }
        }
    }

    public void Redo()
    {
        pedalButton.SetActive(true);
        redoButton.SetActive(false);
        submitButton.SetActive(false);
    }

    public void CheckResults()
    {
        int input = -1;
        
        if(pedalSpeedInput > (answer + 0.1f))
        {
            input = 2;
            pedalSpeedInputText.color = Color.red;
        }
        else if(pedalSpeedInput < (answer - 0.1f))
        {
            input = 1;
            pedalSpeedInputText.color = Color.red;
        }
        else
        {
            input = 0;
            pedalSpeedInputText.color = Color.green;
            
        }

        if(forceRightAnswer)
        {
            input = 0;
        }

        lvlLife.SaveAnswer(input == 0);

        if(stage == 3 && input == 0 || stage == 3 && lvlLife.attempts == 0)
        {
            rope.SetActive(true);
            astronaut.GetComponent<BoxTriggers>().input = input;
            astronaut.GetComponent<BoxTriggers>().enabled = true;
            astronautTwo.GetComponent<Lvl1_Astronaut2>().enabled = true;
            // canvas.SetActive(false);
            energiesCanvas.SetActive(true);
        }

        canvas.SetActive(false);
    }

    public void Leave()
    {

    }
}
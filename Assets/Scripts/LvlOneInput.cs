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
    public GameObject pedalButton, redoButton, submitButton, canvas, astronaut, astronautTwo;
    public bool forceRightAnswer; // for debugging 
    float pedalSpeedInput, startingYAttitude, startingZAttitude, greatestAnswer = 20;
    bool firstTouch = true;
    // Start is called before the first frame update
    void Start()
    {
        
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
                n = ((startingYAttitude - gsData.attitude.y) / 4);
                div = (float)(n / dataGenerator.meanV0);
                pow = (float)Math.Pow((double)(div - 1), 3.0);
                pedalSpeedInput = (pow + 1) * (float)dataGenerator.meanV0;
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
        if(pedalSpeedInput > (dataGenerator.v0 + 0.1f))
        {
            input = 2;
        }
        else if(pedalSpeedInput < (dataGenerator.v0 - 0.1f))
        {
            input = 1;
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

        astronaut.GetComponent<BoxTriggers>().input = input;
        astronaut.GetComponent<BoxTriggers>().enabled = true;
        astronautTwo.GetComponent<Lvl1_Astronaut2>().enabled = true;
        canvas.SetActive(false);
    }

    public void Leave()
    {

    }
}

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
    public GameObject pedalButton, redoButton, submitButton, canvas, astronaut;
    private bool pedalPressed;
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

                // Math.Pow((double)((((startingYAttitude - gsData.attitude.y) / 4) / dataGenerator.maxV0) - 1), 3.0)

                // speed += Mathf.Abs(acceleration.z / 1.5f);
                // speed += 1.0f;
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
        if(pedalSpeedInput > (dataGenerator.v0 - 0.1f) && pedalSpeedInput < (dataGenerator.v0 + 0.1f))
        {
            pedalSpeedInputText.color = Color.green;
        }
        astronaut.GetComponent<BoxTriggers>().speed = pedalSpeedInput;
        astronaut.GetComponent<BoxTriggers>().enabled = true;
    }

    public void Leave()
    {

    }
}

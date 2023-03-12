using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class GeneralInput : MonoBehaviour
{
    public TextMeshProUGUI pedalSpeedInputText, handwheelSpeedInputText;
    public GyroscopeData gsData;
    public LvlOneDataGenerator dataGenerator;
    float pedalSpeedInput, handwheelSpeedInput = 0, tempHandwheelSpeedInput = 0, startingYAttitude, startingZAttitude, greatestAnswer = 20;
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
        if (Input.touchCount > 0) {
            if (firstTouch) {
                pedalSpeedInput = 0.0f;
                startingYAttitude = gsData.attitude.y;
                startingZAttitude = gsData.attitude.z;
                firstTouch = false;
            }
            else
            {
                n = ((startingYAttitude - gsData.attitude.y) / 4);
                div = (float)(n / dataGenerator.maxV0);
                pow = (float)Math.Pow((double)(div - 1), 3.0);
                pedalSpeedInput = (pow + 1) * (float)dataGenerator.maxV0;

                tempHandwheelSpeedInput = (startingZAttitude - gsData.attitude.z) * 0.1f;
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
            pedalSpeedInputText.text = $"Pedal: {pedalSpeedInput:#0.00}";
            handwheelSpeedInputText.text = $"Handwheel: {handwheelSpeedInput + tempHandwheelSpeedInput:#0.00}";
        }
        else
        {
            // qué es más rápido, asignación o evaluación de un valor booleano?
            if(!firstTouch)
            {
                handwheelSpeedInput += tempHandwheelSpeedInput;
                if(handwheelSpeedInput > (dataGenerator.v0 - 0.1f) && handwheelSpeedInput < (dataGenerator.v0 + 0.1f))
                {
                    handwheelSpeedInputText.color = Color.green;
                }
                if(pedalSpeedInput > (dataGenerator.v0 - 0.1f) && pedalSpeedInput < (dataGenerator.v0 + 0.1f))
                {
                    pedalSpeedInputText.color = Color.green;
                }
                firstTouch = true;
            }
        }
    }

    public void ResetHandwheel()
    {
        handwheelSpeedInput = 0;
    }
}

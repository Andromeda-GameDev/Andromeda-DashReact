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
        }
        else
        {
            // qué es más rápido, asignación o evaluación de un valor booleano?
            if(!firstTouch)
            {
                if(pedalSpeedInput > (dataGenerator.v0 - 0.1f) && pedalSpeedInput < (dataGenerator.v0 + 0.1f))
                {
                    pedalSpeedInputText.color = Color.green;
                }
                firstTouch = true;
            }
        }
    }
}

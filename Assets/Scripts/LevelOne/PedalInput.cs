using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class PedalInput : MonoBehaviour
{
    public GyroscopeData gsData;
    public HoldButton pedalHoldButton;
    public TextMeshProUGUI counterIndicatorText;
    private bool firstTouch = true, wasHeld = false;
    private float startingYAttitude, currentValue = 0;
    public int calibrationMax = 3;
    private int calibrationStage = 0, changeCounter = 0;
    public GameObject[] toDeactivate;
    public GameObject[] toActivate;
    public GameObject canvas;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(pedalHoldButton.holding)
        {
            wasHeld = true;
            if(firstTouch)
            {
                firstTouch = false;
                startingYAttitude = gsData.attitude.y;
            }
            else
            {
                currentValue = startingYAttitude - gsData.attitude.y;
            }
        }
        else
        {  
            if(wasHeld)
            {
                if(calibrationMax - calibrationStage > 1)
                {
                    counterIndicatorText.text = $"Baja el pedal {calibrationMax - calibrationStage} veces más";
                }
                else
                {
                    counterIndicatorText.text = $"Baja el pedal {calibrationMax - calibrationStage} vez más";
                }

                if(calibrationStage < calibrationMax)
                {
                    calibrationStage++;
                    if(currentValue < 0)
                    {
                        changeCounter++;
                    }
                }
                else
                {
                    if(changeCounter >= ((calibrationMax+1)/2)+1)
                    {
                        print("Pedal is inverted");
                        gsData.ToggleInverse();
                    }
                    else
                    {
                        print("Pedal is not inverted");
                    }
                    foreach(GameObject go in toDeactivate)
                    {
                        go.SetActive(false);
                    }
                    foreach(GameObject go in toActivate)
                    {
                        go.SetActive(true);
                    }
                    StartCoroutine(FinishCalibration());
                }
                wasHeld = false;
                firstTouch = true;
            }
        }
    }

    IEnumerator FinishCalibration()
    {
        yield return new WaitForSeconds(4f);
        canvas.SetActive(false);
    }
}

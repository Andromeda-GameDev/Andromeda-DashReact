using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;



public class LvlOneInputExtra : MonoBehaviour
{
    public TMP_InputField inputGameObject;
    public LvlOneDataGenerator dataGenerator;
    public LevelLife lvlLife;
    private float answer;
    
    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void CheckResults()
    {
        Debug.Log("Checking results");
        Debug.Log($"Input: {inputGameObject.text}");
        if (inputGameObject.text == "")
        {
            return;
        }
        answer = float.Parse(inputGameObject.text);
        Debug.Log($"Answer: {answer}");
        Debug.Log($"{answer} <= {dataGenerator.acidTime + 0.1f}? = {answer <= dataGenerator.acidTime + 0.1f}");
        Debug.Log($"{answer} >= {dataGenerator.acidTime - 0.1f}? = {answer >= dataGenerator.acidTime - 0.1f}");
        if (answer <= dataGenerator.acidTime + 0.1f && answer >= dataGenerator.acidTime - 0.1f)
        {
            Debug.Log("Correct answer");
            lvlLife.SaveAnswer(true);
        }
        else
        {
            lvlLife.SaveAnswer(false);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;



public class LvlOneInputExtra : MonoBehaviour
{
    public TMP_InputField inputGameObject;
    public GameObject debug;
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
            debug.GetComponent<TextMeshProUGUI>().text = "Correct answer";
            lvlLife.SaveAnswer(true);
            lvlLife.CheckAnswer();
        }
        else
        {
            Debug.Log("Wrong answer");
            Debug.Log($"Answer: {answer}");
            Debug.Log($"Acid time: {dataGenerator.acidTime}");
            debug.GetComponent<TextMeshProUGUI>().text = "Wrong answer" + "\n" + $"Answer: {answer}" + "\n" + $"Acid time: {dataGenerator.acidTime}";
            lvlLife.SaveAnswer(false);
            lvlLife.CheckAnswer();
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

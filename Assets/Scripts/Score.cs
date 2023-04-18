using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using TMPro;

public class Score : MonoBehaviour
{
    public static Score instance;
    public GameObject scoreUI;
    private int score;
    private void Awake() 
    {
        instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        score = 0;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void UpdateScore(int incomingScore)
    {
        score += incomingScore;
        scoreUI.GetComponent<TextMeshProUGUI>().text = "Score: " + score.ToString();
    }
}
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class LvlOneDataGenerator : MonoBehaviour
{
    public float gFrom = 8f, gTo = 10f, m1From = 90f, m1To = 110f, m2From = 70f, m2To = 80f, surfaceFrom = 250, surfaceTo = 350, acidSpeedFrom = 1.5f, acidSpeedTo = 2.5f;
    public double h1 = 20.5, h2 = 10.5, l = 0.5;
    public double g, m1, m2, v0, maxV0, minV0, meanV0, v1, v2;
    public float surface, acidSpeed, acidTime;
    public TextMeshProUGUI gText, m1Text, m2Text, resultText, acidTimeText;
    // Start is called before the first frame update
    void Start()
    {
        g = Math.Round(UnityEngine.Random.Range(gFrom, gTo), 2);
        m1 = Math.Round(UnityEngine.Random.Range(m1From, m1To), 2);
        m2 = Math.Round(UnityEngine.Random.Range(m2From, m2To), 2);
        surface = (float)Math.Round(UnityEngine.Random.Range(surfaceFrom, surfaceTo), 2);
        acidSpeed = (float)Math.Round(UnityEngine.Random.Range(acidSpeedFrom, acidSpeedTo), 2);

        v2 = Math.Sqrt(2*g*(h2 - l));
        v1 = ((m1 + m2)/m1)*v2;
        v0 = Math.Sqrt(v1*v1 - 2*g*(h1 - l));
        acidTime = surface/acidSpeed;

        gText.text = $"g = {g}";
        m1Text.text = $"m1 = {m1}";
        m2Text.text = $"m2 = {m2}";
        resultText.text = $"Resultado = {v0}";
        acidTimeText.text = $"Tiempo = {acidTime}";
        
        double temp = Math.Sqrt(2*gTo*(h2 - l));
        temp = ((m1To + m2To)/m1To)*temp;
        maxV0 = Math.Sqrt(temp*temp - 2*gTo*(h1 - l));

        temp = Math.Sqrt(2*gFrom*(h2 - l));
        temp = ((m1To + m2From)/m1From)*temp;
        minV0 = Math.Sqrt(temp*temp - 2*gFrom*(h1 - l));

        meanV0 = (maxV0 + minV0)/2;

        Debug.Log("Result is " + v0);
    }

    public void RegenerateProblem()
    {
        g = Math.Round(UnityEngine.Random.Range(gFrom, gTo), 2);
        m1 = Math.Round(UnityEngine.Random.Range(m1From, m1To), 2);
        m2 = Math.Round(UnityEngine.Random.Range(m2From, m2To), 2);
        surface = (float)Math.Round(UnityEngine.Random.Range(surfaceFrom, surfaceTo), 2);
        acidSpeed = (float)Math.Round(UnityEngine.Random.Range(acidSpeedFrom, acidSpeedTo), 2);

        v2 = Math.Sqrt(2*g*(h2 - l));
        v1 = ((m1 + m2)/m1)*v2;
        v0 = Math.Sqrt(v1*v1 - 2*g*(h1 - l));
        acidTime = surface/acidSpeed;

        Debug.Log("Result is " + v0);
    } 

    // Update is called once per frame
    void Update()
    {
        
    }
}

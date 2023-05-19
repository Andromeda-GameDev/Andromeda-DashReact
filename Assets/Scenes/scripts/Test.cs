using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    public string test = "e^x / log10(x)";
    public double x = 2.0f;
    // Start is called before the first frame update
    void Start()
    {
        Func<double, double> function = FunctionParser.Parse(test);
        print(function(x));
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

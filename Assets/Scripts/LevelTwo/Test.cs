using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    public string test = "sin ( x ) + cos ( x )";
    public float x = 2.0f;
    public List<object> tokens = new List<object>();
    // Start is called before the first frame update
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void TestFun()
    {
        // Func<double, double> function = Parser.Parse("sin ( x ) + cos ( x )");
        // print(function(x));
        float function2 = Parser.Parse(test, x);
        print(function2);
    }
}

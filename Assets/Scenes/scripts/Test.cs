using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    public string test = "a + (b * c)";
    // Start is called before the first frame update
    void Start()
    {
        double res = FormulaParser.ParseExpression(test);
        print(res);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

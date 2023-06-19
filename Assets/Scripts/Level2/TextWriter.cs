using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class TextWriter : MonoBehaviour
{
    public TextMeshProUGUI  Ecuation;
    private string text;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void one()
    {
        text = "1";
        Ecuation.text = Ecuation.text + text;
    }

    public void two()
    {
        text = "2";
        Ecuation.text = Ecuation.text + text;
    }
    public void three()
    {
        text = "3";
        Ecuation.text = Ecuation.text + text;
    }
    public void four()
    {
        text = "4";
        Ecuation.text = Ecuation.text + text;
    }
    public void five()
    {
        text = "5";
        Ecuation.text = Ecuation.text + text;
    }
    public void six()
    {
        text = "6";
        Ecuation.text = Ecuation.text + text;
    }
    public void seven()
    {
        text = "7";
        Ecuation.text = Ecuation.text + text;
    }
    public void eight()
    {
        text = "8";
        Ecuation.text = Ecuation.text + text;
    }
    public void nine()
    {
        text = "9";
        Ecuation.text = Ecuation.text + text;
    }
    public void zero()
    {
        text = "0";
        Ecuation.text = Ecuation.text + text;
    }
    public void sin()
    {
        text = "sin(";
        Ecuation.text = Ecuation.text + text;
    }
    public void cos()
    {
        text = "cos(";
        Ecuation.text = Ecuation.text + text;
    }
    public void close()
    {
        text = ")";
        Ecuation.text = Ecuation.text + text;
    }
    public void plus()
    {
        text = "+";
        Ecuation.text = Ecuation.text + text;
    }
    public void sustraction()
    {
        text = "-";
        Ecuation.text = Ecuation.text + text;
    }
    public void mult()
    {
        text = "*";
        Ecuation.text = Ecuation.text + text;
    }
    public void divide()
    {
        text = "/";
        Ecuation.text = Ecuation.text + text;
        
    }
    public void delete()
    {
        text = " ";
        Ecuation.text = text;
    }
    public void log()
    {
        text = "log(";
        Ecuation.text = Ecuation.text + text;
    }
    public void root()
    {
        text = "√";
        Ecuation.text = Ecuation.text + text;
    }
    public void equal()
    {
        text = "=";
        Ecuation.text = Ecuation.text + text;
    }
}

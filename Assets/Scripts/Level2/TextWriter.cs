using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class TextWriter : MonoBehaviour
{
    public TextMeshProUGUI Ecuation;
    public textToImageAPI textFormulaToImage;
    private string text;

    private void Awake()
    {
        //textFormulaToImage = GetComponentInChildren<TextFormulaToImage>();
    }

    public void Write(string text)
    {
        Ecuation.text += text;
        textFormulaToImage.UpdateFormula("f(x)=" + Ecuation.text);
    }

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
        Write(text);
    }

    public void two()
    {
        text = "2";
        Write(text);
    }
    public void three()
    {
        text = "3";
        Write(text);
    }
    public void four()
    {
        text = "4";
        Write(text);
    }
    public void five()
    {
        text = "5";
        Write(text);
    }
    public void six()
    {
        text = "6";
        Write(text);
    }
    public void seven()
    {
        text = "7";
        Write(text);
    }
    public void eight()
    {
        text = "8";
        Write(text);
    }
    public void nine()
    {
        text = "9";
        Write(text);
    }
    public void zero()
    {
        text = "0";
        Write(text);
    }
    public void sin()
    {
        text = "sin(";
        Write(text);
    }
    public void cos()
    {
        text = "cos(";
        Write(text);
    }
    public void close()
    {
        text = ")";
        Write(text);
    }
    public void plus()
    {
        text = "+";
        Write(text);
    }
    public void sustraction()
    {
        text = "-";
        Write(text);
    }
    public void mult()
    {
        text = "*";
        Write(text);
    }
    public void divide()
    {
        text = "/";
        Write(text);
        
    }
    public void delete()
    {
        text = " ";
        Write(text);
    }
    public void log()
    {
        text = "log(";
        Write(text);
    }
    public void root()
    {
        text = "√";
        Write(text);
    }
    public void equal()
    {
        text = "=";
        Write(text);
    }
}
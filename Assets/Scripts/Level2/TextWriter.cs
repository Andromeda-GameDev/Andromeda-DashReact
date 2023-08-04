using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class TextWriter : MonoBehaviour
{
    public TextMeshProUGUI Ecuation;
    public TextMeshProUGUI JustString;
    public textToImageAPI textFormulaToImage;
    private string text;
    private string pureString;

    private EquivalenceEvaluator equivalenceEvaluator;

    //private string equation = "x^2*cos(45)+45/2";
    private string equation = "x*x";

    private void Awake()
    {
        //textFormulaToImage = GetComponentInChildren<TextFormulaToImage>();
        equivalenceEvaluator = new EquivalenceEvaluator();
    }

    public void Write(string text)
    {
        if(text == "^{2}")
        {
            Ecuation.text += text;
            JustString.text += "^2";
            pureString = JustString.text;
            textFormulaToImage.UpdateFormula("f(x)=" + Ecuation.text);
            print(pureString);    
        }
        else if(text == "^{")
        {
            Ecuation.text += text;
            JustString.text += "^";
            pureString = JustString.text;
            textFormulaToImage.UpdateFormula("f(x)=" + Ecuation.text);
            print(pureString);    
        }
        else if(text == "{")
        {
            Ecuation.text += text;
            pureString = JustString.text;
            textFormulaToImage.UpdateFormula("f(x)=" + Ecuation.text);
            print(pureString);    
        }
        else if(text == "}")
        {
            Ecuation.text += text;
            pureString = JustString.text;
            textFormulaToImage.UpdateFormula("f(x)=" + Ecuation.text);
            print(pureString);    
        }
        else
        {
            Ecuation.text += text;
            JustString.text += text;
            pureString = JustString.text;
            textFormulaToImage.UpdateFormula("f(x)=" + Ecuation.text);
            print(pureString);
        }
    }

    public void DeleteOnImage(int type)
    {
        if(type == 1)
        {
            Ecuation.text = " ";
            JustString.text = " ";
            pureString = " ";
            textFormulaToImage.UpdateFormula("f(x)=" + Ecuation.text);
        }
        else
        {
            string text = Ecuation.text;
            string text2 =JustString.text;
            if (!string.IsNullOrEmpty(text))
            {
                text = text.Substring(0, text.Length - 1);
                Ecuation.text = text;
            }
            if (!string.IsNullOrEmpty(text2))
            {
                text2 = text2.Substring(0, text2.Length - 1);
                JustString.text = text2;
            }
            textFormulaToImage.UpdateFormula("f(x)=" + Ecuation.text);

        }
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
    public void open()
    {
        text = "(";
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
        DeleteOnImage(1);
    }
    public void deleteLast()
    {
        DeleteOnImage(2);
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
        equivalenceEvaluator.IsEquivalent(JustString.text, equation);
    }
    public void ex()
    {
        text ="x";
        Write(text);
    }
    public void square()
    {
        text ="^{2}";
        Write(text);
    }
    public void power()
    {
        text ="^{";
        Write(text);
    }
    public void openKey()
    {
        text = "{";
        Write(text);
    }
    public void closeKey()
    {
        text = "}";
        Write(text);
    }
    public void frac()
    {
        text = @"\frac";
        Write(text);
    }
}

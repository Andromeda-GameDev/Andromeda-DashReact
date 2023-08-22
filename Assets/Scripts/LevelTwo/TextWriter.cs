using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class TextWriter : MonoBehaviour
{
    public bool skipWrite;
    public TextMeshProUGUI Ecuation;
    public TextMeshProUGUI JustString;
    public textToImageAPI textFormulaToImage;
    public LvlTwoStageHandler lvlTwoStageHandler;
    public bool hasLimits;
    public GameObject nextButton;
    public GameObject toClose;
    public GameObject toOpen;
    private string text;
    private string pureString;
    private EquivalenceEvaluator equivalenceEvaluator;

    // Variables for managing input on integration part
    public IntegrationPartActive integrationPartActive;

    //private string equation = "x^2*cos(45)+45/2";
    string equation;

    private void Awake()
    {
        //textFormulaToImage = GameObject.Find("Limits").GetComponent<IntegrationPartActive>();;
        equivalenceEvaluator = new EquivalenceEvaluator();
        if(hasLimits){
            //integrationPartActive = GameObject.Find("Limits").GetComponent<IntegrationPartActive>();
        }
    }
    public void Write(string text)
    {
        if(!skipWrite)
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
        

        // Check if the integration part is active
        if(hasLimits)
        {
            if(integrationPartActive.IsFirstButtonClicked())
            {
              Debug.Log("First active"); 
              integrationPartActive.AddCharSlText(text);
            }
            else if(integrationPartActive.IsSecondButtonClicked())
            {
              Debug.Log("Second active"); 
              integrationPartActive.AddCharIlText(text);
            }
        }
    }


    public void DeleteOnImage(int type)
    {
        Debug.Log("Deleting equation");
        if(type == 1)
        {
            Ecuation.text = "";
            JustString.text = "";
            pureString = "";
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
        Debug.Log($"Equation is now {equation}");
    }

    public void setEquation(string equation)
    {
        Debug.Log($"Equation set to {equation}");
        this.equation = equation;
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
        if(lvlTwoStageHandler.GetSubstage() != 2){
            Debug.Log(JustString.text);
            Debug.Log(equation);
            Debug.Log(JustString.text == equation);
            
            //equivalenceEvaluator.IsEquivalent(JustString.text, equation);
            if(JustString.text == equation)
            {
                delete();
                if(!lvlTwoStageHandler.NextPart())
                {
                    toOpen.SetActive(true);
                    toClose.SetActive(false);
                }
            }
        }
        else{
            if(JustString.text == lvlTwoStageHandler.GetWeight().ToString()){
                delete();
                lvlTwoStageHandler.NextSubstage();
                toOpen.SetActive(true);
                toClose.SetActive(false);
            }
        }

    }
    public void submit()
    {
        //integrationPartActive.GetIlText()
        string slText = integrationPartActive.GetSlText();
        string ilText = integrationPartActive.GetIlText();
        Debug.Log($"Given limits are {slText} and {ilText}");
        string[] limits = lvlTwoStageHandler.GetCurrentLimits();
        Debug.Log($"Limits are {limits[0]} and {limits[1]}");
        bool isSlCorrect = slText == limits[1]; //equivalenceEvaluator.IsEquivalent(slText, limits[0]);
        bool isIlCorrect = ilText == limits[0];
        if(isSlCorrect){
            // Change color to green
        }
        else{
            // Change color to red
        }
        if(isIlCorrect){
            // Change color to green
        }
        else{
            // Change color to red
        }
        if(isSlCorrect && isIlCorrect){
            // Change colors to green
            nextButton.SetActive(true);
        }
    }
    public void Next()
    {
        if(lvlTwoStageHandler.NextPart()){
            integrationPartActive.CleanButtons();
        }
        else{
            toOpen.SetActive(true);
            toClose.SetActive(false);
        }
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
    public void y()
    {
        text = "y";
        Write(text);
    }
}

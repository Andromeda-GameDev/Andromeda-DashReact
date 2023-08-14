using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class IntegrationPartActive : MonoBehaviour
{
    public Button firstButton;
    public Button secondButton;
    public Button thirdButton;
    public Button fourthButton;

    public Text slText;
    public Text ilText;
    public Text slTextTwo;
    public Text ilTextTwo;

    private bool firstButtonClicked;
    private bool secondButtonClicked;
    private bool thirdButtonClicked;
    private bool fourthButtonClicked;

    public Color newBackgroundColor;
    public Color defaultBackgroundColor;

    private void Start()
    {
        firstButton.onClick.AddListener(OnFirstButtonClick);
        secondButton.onClick.AddListener(OnSecondButtonClick);
    }

    private void OnFirstButtonClick()
    {
        firstButton.GetComponent<Image>().color = newBackgroundColor;
        secondButton.GetComponent<Image>().color = defaultBackgroundColor;
        firstButtonClicked = true;
        secondButtonClicked = false;
    }

    private void OnSecondButtonClick()
    {
        secondButton.GetComponent<Image>().color = newBackgroundColor;
        firstButton.GetComponent<Image>().color = defaultBackgroundColor;
        firstButtonClicked = false;
        secondButtonClicked = true;
    }

    public bool IsThisPartOn()
    {
      // return firstButtonClicked && secondButtonClicked;
      return true;
    }

    // You can expose these boolean values to other scripts or systems as needed
    public bool IsFirstButtonClicked()
    {
        return firstButtonClicked;
    }

    public bool IsSecondButtonClicked()
    {
        return secondButtonClicked;
    }
    public string GetSlText()
    {
        return slText.text;
    }
    public string GetIlText()
    {
        return ilText.text;
    }
    public void SetSlText(string inputString)
    {
        slText.text = inputString;
    }
    public void SetIlText(string inputString)
    {
        ilText.text = inputString;
    }
    public void AddCharSlText(string inputString)
    {
        if(slText.text == "___"){
            slText.text = "";
        }
        slText.text += inputString;
    }
    public void AddCharIlText(string inputString)
    {
        if(ilText.text == "___"){
            ilText.text = "";
        }
        ilText.text += inputString;
    }
    // public void Update()
    // {
    //   Debug.Log("fc?: " + IsSecondButtonClicked());
    // }
}



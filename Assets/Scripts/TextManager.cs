using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class TextManager : MonoBehaviour
{
    public TextMeshProUGUI resultText;
    public LvlOneDataGenerator dataGenerator;
    // Start is called before the first frame update
    void Start()
    {
        UpdateText();
    }

    public void UpdateText()
    {
        resultText.text = $"Resultado: {dataGenerator.v0}";
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

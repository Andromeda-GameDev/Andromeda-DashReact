using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class TextManager : MonoBehaviour
{
    public TextMeshProUGUI gText, m1Text, m2Text, h1Text, lText, h2Text;
    public LvlOneDataGenerator dataGenerator;
    // Start is called before the first frame update
    void Start()
    {
        UpdateText();
    }

    void OnEnable()
    {
        UpdateText();
    }

    public void UpdateText()
    {
        gText.text = $"Gravedad = {dataGenerator.g}";
        m1Text.text = $"Masa del astronauta = {dataGenerator.m1}";
        m2Text.text = $"Masa del astronauta atrapado = {dataGenerator.m2}";
        h1Text.text = $"Altura de la plataforma inicial = {dataGenerator.h1}";
        lText.text = $"Altura del astronauta atrapado = {dataGenerator.l}";
        h2Text.text = $"Altura de la plataforma final = {dataGenerator.h2}";
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

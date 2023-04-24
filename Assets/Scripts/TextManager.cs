using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class TextManager : MonoBehaviour
{
    public TextMeshProUGUI gText, m1Text, m2Text, h1Text, lText, h2Text, Qtext, Atext;
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
        gText.text = $"Gravedad = {dataGenerator.g} m/s^2";
        m1Text.text = $"Masa del astronauta = {dataGenerator.m1} kg";
        m2Text.text = $"Masa del astronauta atrapado = {dataGenerator.m2} kg";
        h1Text.text = $"Altura de la plataforma inicial = {dataGenerator.h1} m";
        lText.text = $"Altura del astronauta atrapado = {dataGenerator.l} m";
        h2Text.text = $"Altura de la plataforma final = {dataGenerator.h2} m";
        Qtext.text = $"Razón media de vaciado = {dataGenerator.acidSpeed} m/s";
        Atext.text = $"Superficie del tanque = {dataGenerator.surface} m^2";
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

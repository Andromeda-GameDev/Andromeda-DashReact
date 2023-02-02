using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class EnergyBars : MonoBehaviour
{
    public float maxHeight, minHeight;
    public GameObject player;
    public bool potential;
    int energyType;
    Slider slider;
    // Start is called before the first frame update
    void Start()
    {
        slider = GetComponent<Slider>();
        slider.value = normalize(player.transform.position.y);
    }

    // Update is called once per frame
    void Update()
    {
        if(potential){
            // normalize(m * g * player.transform.position.y);
            slider.value = normalize(player.transform.position.y);
        }
        else
        {
            // normalize(0.5 * m * v * v);
            slider.value = 1 - normalize(player.transform.position.y);
        }
    }

    float normalize(float y)
    {
        // to normalize with scaling if required
        return (y - minHeight)/(maxHeight - minHeight);
    }
}

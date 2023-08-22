using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class StarMovement : MonoBehaviour
{
    public float speed = 1f;
    public RawImage starsRawImage;
    private float screenWidth;

    // Start is called before the first frame update
    void Start()
    {
        screenWidth = Screen.width;
    }

    // Update is called once per frame
    void Update()
    {
        // Move the stars image from left to right.
        Vector3 newPos = starsRawImage.rectTransform.anchoredPosition;
        newPos.x += speed * Time.deltaTime;

        // Wrap stars' position to the left side when they go off the screen.
        if (newPos.x > screenWidth + starsRawImage.rectTransform.sizeDelta.x / 2)
        {
            newPos.x = -starsRawImage.rectTransform.sizeDelta.x / 2;
        }

        starsRawImage.rectTransform.anchoredPosition = newPos;    
    }
}

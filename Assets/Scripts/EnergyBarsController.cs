using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class EnergyBarsController : MonoBehaviour
{
    // public GameObject start, bottom, end;
    public Transform startTransform, bottomTransform, endTransform;
    public GameObject player;
    public GameObject potentialBarPrev, kineticBarPrev, potentialBarPost, kineticBarPost;
    private Slider pPrevSlider, kPrevSlider, pPostSlider, kPostSlider;
    public CanvasGroup canvasPrev, canvasPost;
    public Lvl1_Astronaut2 astronautTwo;
    private bool firstStep = true;
    float scale;
    public float startingHeight, minHeight, endHeight;
    int energyType;
    Slider slider;
    // Start is called before the first frame update
    void Start()
    {
        startingHeight = startTransform.localPosition.y;
        minHeight = bottomTransform.localPosition.y;
        endHeight = endTransform.localPosition.y;

        Debug.Log($"Starting height (local) = {startingHeight}");
        Debug.Log($"Minimum height (box) (local) = {minHeight}");
        Debug.Log($"End height (local) = {endHeight}");

        pPrevSlider = potentialBarPrev.GetComponent<Slider>();
        kPrevSlider = kineticBarPrev.GetComponent<Slider>();
        pPostSlider = potentialBarPost.GetComponent<Slider>();
        kPostSlider = kineticBarPost.GetComponent<Slider>();
    }

    // Update is called once per frame
    void Update()
    {
        //Debug.Log($"Player position (local) = {player.transform.localPosition.y}");

        if(!astronautTwo.follow)
        {
            if(!firstStep)
            {
                firstStep = true;
                canvasPrev.alpha = 1f;
                canvasPost.alpha = 0.2f;
            }
            pPrevSlider.value = Mathf.Abs(player.transform.localPosition.y - bottomTransform.localPosition.y)/(startTransform.localPosition.y - bottomTransform.localPosition.y);
            kPrevSlider.value = 1 - pPrevSlider.value;
        }
        else
        {
            if(firstStep)
            {
                firstStep = false;
                canvasPrev.alpha = 0.2f;
                canvasPost.alpha = 1f;
            }
            pPostSlider.value = Mathf.Abs(player.transform.localPosition.y - bottomTransform.localPosition.y)/(endTransform.localPosition.y - bottomTransform.localPosition.y);
            kPostSlider.value = 1 - pPostSlider.value;
            pPostSlider.value *= 0.6f;
            kPostSlider.value *= 0.6f;
        }
    }
}
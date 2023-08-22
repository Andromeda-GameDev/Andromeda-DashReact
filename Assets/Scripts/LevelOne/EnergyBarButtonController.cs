using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class EnergyBarButtonController : MonoBehaviour
{
    public GameObject canvas, canvas2, button;
    public Sprite showSprite, hideSprite;
    bool status = true;
    public void Show()
    {
        status = !status;
        canvas.SetActive(status);
        canvas2.SetActive(status);
        if(status){
            GetComponent<Image>().sprite = showSprite;
        }else{
            GetComponent<Image>().sprite = hideSprite;
        }
    }

    public void Hide()
    {
        canvas.GetComponent<CanvasGroup>().alpha = 0f;
        canvas2.GetComponent<CanvasGroup>().alpha = 0f;
    }
    
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

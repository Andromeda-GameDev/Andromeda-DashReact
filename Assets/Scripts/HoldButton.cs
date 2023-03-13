using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class HoldButton : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    public bool holding;
    public Image buttonImage;
    public Sprite pedal, pedalPressed;
    
    public void OnPointerDown(PointerEventData eventData)
    {
        holding = true;
        buttonImage.sprite = pedalPressed;
        Debug.Log("pointer down");
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        holding = false;
        buttonImage.sprite = pedal;
        Debug.Log("pointer up");
    }
}


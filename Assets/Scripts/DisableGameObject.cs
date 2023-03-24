using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DisableGameObject : MonoBehaviour
{
    public GameObject gameObject;
    
    public void disable()
    {
        gameObject.SetActive(false);
    }
}

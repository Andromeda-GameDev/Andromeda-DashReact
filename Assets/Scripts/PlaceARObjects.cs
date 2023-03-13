using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class PlaceARObjects : MonoBehaviour
{
    // Script Variables
    private ARTrackedImageManager imageManager;


    // Awake is called when the script instance is being loaded
    void Awake()
    {
        imageManager = GetComponent<ARTrackedImageManager>();
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

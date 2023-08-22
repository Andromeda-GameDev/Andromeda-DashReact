using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.XR.ARFoundation;

public class DisplacementMeasurement : MonoBehaviour
{
    private Vector3 initialPosition;
    public Text zDisplacementText;
    public float zDisplacement;

    void Start()
    {
        // Store the initial position of the camera or AR device
        initialPosition = Camera.main.transform.position;
    }

    void Update()
    {
        // Get the current camera position
        Vector3 currentCameraPosition = Camera.main.transform.position;

        // Calculate the displacement in the z-axis
        zDisplacement = currentCameraPosition.z - initialPosition.z;

        // Display the displacement in the console
        Debug.Log("Z Displacement: " + zDisplacement);
        zDisplacementText.text = "Z Displacement: " + zDisplacement;
    }
}

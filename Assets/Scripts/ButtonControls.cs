using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonControls : MonoBehaviour
{
    // Object to transform
    GameObject prefab;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (prefab == null)
        {
            prefab = GameObject.FindWithTag("Prefab");
        }
    }

    // Button Effects Rotations
    public void RotateRight()
    {
        prefab.transform.Rotate(0, 10, 0, Space.World);
        print("Rotate Right");
    }

    public void RotateLeft()
    {
        prefab.transform.Rotate(0, -10, 0, Space.World);
        print("Rotate Left");
    }

    public void RotateClockwise()
    {
        prefab.transform.Rotate(0, 0, 10, Space.World);
        print("Rotate Right");
    }

    public void RotateCounterClockwise()
    {
        prefab.transform.Rotate(0, 0, -10, Space.World);
        print("Rotate Left");
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ButtonControls : MonoBehaviour
{
    // Object to transform
    public GameObject prefab;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    // Button Effects
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
}

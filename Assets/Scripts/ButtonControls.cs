using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonControls : MonoBehaviour
{
    // Object to transform
    GameObject prefab;
    public GameObject resume;
    public GameObject pasue;

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

    // Button Effects
    public void Reset()
    {
        prefab.transform.position = new Vector3(0, 0, 0);
        prefab.transform.rotation = Quaternion.identity;
        prefab.transform.localScale = new Vector3(1, 1, 1);
        print("Reset");
    }

    public void Pause()
    {
        resume.SetActive(false);
        pasue.SetActive(true);
    }

    public void Resume()
    {
        resume.SetActive(true);
        pasue.SetActive(false);
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

    public void RotateUp()
    {
        prefab.transform.Rotate(10, 0, 0, Space.World);
        print("Rotate Right");
    }

    public void RotateDown()
    {
        prefab.transform.Rotate(-10, 0, 0, Space.World);
        print("Rotate Left");
    }

    // Button Effects Scale
    public void ScaleUp()
    {
        prefab.transform.localScale += new Vector3(0.1F, 0.1F, 0.1F) * 0.1F;
        print("Scale Up");
    }

    public void ScaleDown()
    {
        prefab.transform.localScale -= new Vector3(0.1F, 0.1F, 0.1F) * 0.1F;
        print("Scale Down");
    }

    // Button Effects Position
    public void MoveUp()
    {
        prefab.transform.position += new Vector3(0, 0.1F, 0);
        print("Move Up");
    }

    public void MoveDown()
    {
        prefab.transform.position -= new Vector3(0, 0.1F, 0);
        print("Move Down");
    }

    public void MoveLeft()
    {
        prefab.transform.position -= new Vector3(0.1F, 0, 0);
        print("Move Left");
    }

    public void MoveRight()
    {
        prefab.transform.position += new Vector3(0.1F, 0, 0);
        print("Move Right");
    }

    public void MoveForward()
    {
        prefab.transform.position += new Vector3(0, 0, 0.1F);
        print("Move Forward");
    }

    public void MoveBackward()
    {
        prefab.transform.position -= new Vector3(0, 0, 0.1F);
        print("Move Backward");
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelController : MonoBehaviour
{
    GameObject mainObject;
    public GameObject controls;
    public GameObject resume;

    public void UpScale()
    {
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.localScale += new Vector3(0.1f, 0.1f, 0.1f);
    }

    public void DownScale()
    {
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.localScale -= new Vector3(0.1f, 0.1f, 0.1f);
    }

    public void RotateLeft()
    {
        
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.Rotate(0, 10, 0);
    }

    public void RotateRight()
    {
        
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.Rotate(0, -10, 0);
    }

    public void RotateUp()
    {
        
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.Rotate(10, 0, 0);
    }

    public void RotateDown()
    {
        
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.Rotate(-10, 0, 0);
    }

    public void MoveLeft()
    {
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.position += new Vector3(-0.01f, 0, 0);
    }

    public void MoveRight()
    {
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.position += new Vector3(0.01f, 0, 0);
    }

    public void MoveUp()
    {
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.position += new Vector3(0, 0.01f, 0);
    }

    public void MoveDown()
    {
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.position += new Vector3(0, -0.01f, 0);
    }

    public void MoveForward()
    {   
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.position += new Vector3(0, 0, 0.01f);
    }

    public void MoveBackward()
    {
        mainObject = GameObject.FindGameObjectWithTag("Prefab");
        if (mainObject)
        mainObject.transform.position += new Vector3(0, 0, -0.01f);
    }

    public void Settings()
    {
        controls.SetActive(true);
        resume.SetActive(false);
    }

    public void Resume()
    {
        controls.SetActive(false);
        resume.SetActive(true);
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

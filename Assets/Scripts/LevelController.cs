using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelController : MonoBehaviour
{
    public GameObject mainObject;
    public GameObject controls;
    public GameObject resume;

    public void UpScale()
    {
        mainObject.transform.localScale += new Vector3(0.1f, 0.1f, 0.1f);
    }

    public void DownScale()
    {
        mainObject.transform.localScale -= new Vector3(0.1f, 0.1f, 0.1f);
    }

    public void RotateLeft()
    {
        mainObject.transform.Rotate(0, 10, 0);
    }

    public void RotateRight()
    {
        mainObject.transform.Rotate(0, -10, 0);
    }

    public void RotateUp()
    {
        mainObject.transform.Rotate(10, 0, 0);
    }

    public void RotateDown()
    {
        mainObject.transform.Rotate(-10, 0, 0);
    }

    public void MoveLeft()
    {
        mainObject.transform.position += new Vector3(-0.1f, 0, 0);
    }

    public void MoveRight()
    {
        mainObject.transform.position += new Vector3(0.1f, 0, 0);
    }

    public void MoveUp()
    {
        mainObject.transform.position += new Vector3(0, 0.1f, 0);
    }

    public void MoveDown()
    {
        mainObject.transform.position += new Vector3(0, -0.1f, 0);
    }

    public void MoveForward()
    {
        mainObject.transform.position += new Vector3(0, 0, 0.1f);
    }

    public void MoveBackward()
    {
        mainObject.transform.position += new Vector3(0, 0, -0.1f);
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

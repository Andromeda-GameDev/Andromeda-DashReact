using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelSelectController : MonoBehaviour
{
    void Start()
    {
        SFXManager.instance.selectSFX(0);
    }

    // Update is called once per frame
    void Update()
    {

    }

    public void ToLevelOne()
    {
        SceneManager.LoadScene("_LevelOne");
    }
    public void ToLevelTwo()
    {
        Debug.Log("Work In Progress");
    }
}

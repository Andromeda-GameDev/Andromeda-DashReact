using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelSelectController : MonoBehaviour
{
    public static LevelSelectController instance;

    private void Awake()
    {
        instance = this;
    }

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
        SceneManager.LoadScene("LevelOne");
    }
    public void ToLevelTwo()
    {
        Debug.Log("Work In Progress");
    }
}

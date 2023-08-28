using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using CW.Common;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.SceneManagement;

public class PlanetSelection : MonoBehaviour
{

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetMouseButtonDown(0))
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if(Physics.Raycast(ray, out hit))
            {
                if(hit.collider.name == "planetLevel1")
                {
                    Debug.Log("To level 1");
                    LevelSelectController.instance.ToLevelOne();
                    
                    
                }
                if(hit.collider.name == "planetLevel2")
                {
                    Debug.Log("To level 2");
                    //LevelSelectController.instance.ToLevelTwo();
                    
                    
                }
            }
        }
    }
}

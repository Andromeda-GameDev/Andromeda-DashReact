using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AcidMover : MonoBehaviour
{
    public GameObject light1;
    public GameObject light2;
    public GameObject light3;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        /*
        var currentLength = 1;   

        if(Input.GetKeyDown(KeyCode.A))
        {
            transform.localScale += new Vector3(0f, 1f, 0f);
            currentLength += 1;
 
            transform.position = transform.position + transform.forward * ((currentLength - 1) / 2);

            light1.transform.position += new Vector3(0f, 1f, 0f);
            light2.transform.position += new Vector3(0f, 1f, 0f);
            light3.transform.position += new Vector3(0f, 1f, 0f);
        }
        */
        if(Input.GetKeyDown(KeyCode.A))
        {
            transform.localScale += new Vector3(0f, 1.5f, 0f);
        }
    }
}

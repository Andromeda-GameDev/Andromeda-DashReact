using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimTest : MonoBehaviour
{
    

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        /*float h_dir = Input.GetAxis("Horizontal");
        float v_dir = Input.GetAxis("Vertical");

        RopeButtom.GetComponent<Rigidbody>().AddForce(transform.forward * v_dir, ForceMode.Acceleration);
        RopeButtom.GetComponent<Rigidbody>().AddForce(transform.forward * h_dir, ForceMode.Acceleration);*/

    }

    void OnTriggerEnter(Collider other)
    {
        if(other.tag == "Astronaut2"){
            Debug.Log(other.gameObject.name);
            other.transform.SetParent(transform);
            other.transform.localPosition = new Vector3(1f, 0.4f, -0.7f);
            
        }
    }

    void OnTriggerStay(Collider other)
    {
        if(other.tag == "Astronaut2"){
            Debug.Log("Awanta");
            
        }
    }

    void OnTriggerExit(Collider other)
    {
        if(other.tag == "Astronaut2"){
            Debug.Log("Awanta");
            
        }
    }
}

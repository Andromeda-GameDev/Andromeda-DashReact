using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimTest : MonoBehaviour
{
    public Vector3 scale;

    //UnityEditor.TransformWorldPlacementJSON:{"position":{"x":12.536023139953614,"y":1.4660239219665528,"z":-8.487700142723043e-8},"rotation":{"x":0.27059805393218996,"y":0.6532815098762512,"z":-0.27059805393218996,"w":0.6532815098762512},"scale":{"x":1.0,"y":1.0,"z":1.0}}

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
            other.transform.localPosition = new Vector3(0f, -1.044f, 0f);
            other.transform.localRotation =  Quaternion.Euler(0f, 0f, 0f);
            SetGlobalScale(other.transform, scale);
            Debug.Log(other.transform.position);
            
        }
    }

    void OnTriggerStay(Collider other)
    {
        if(other.tag == "Astronaut2"){
            other.transform.localRotation =  Quaternion.Euler(0f, 0f, 0f);
            SetGlobalScale(other.transform, scale);
            
        }
    }

    void OnTriggerExit(Collider other)
    {
        if(other.tag == "Astronaut2"){
            other.transform.localRotation =  Quaternion.Euler(0f, 0f, 0f);
            SetGlobalScale(other.transform, scale);
        }
    }

    void SetGlobalScale (Transform transform, Vector3 globalScale)
    {
        transform.localScale = Vector3.one;
        transform.localScale = new Vector3 (globalScale.x/transform.lossyScale.x, globalScale.y/transform.lossyScale.y, globalScale.z/transform.lossyScale.z);
    }
}

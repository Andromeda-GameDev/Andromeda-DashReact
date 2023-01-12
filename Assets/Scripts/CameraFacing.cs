using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFacing : MonoBehaviour
{
    Camera arCamera;
    void Awake()
    {
        arCamera = GameObject.Find("AR Camera").GetComponent<Camera>();
        Debug.Log("CameraFacing: Awake");
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void LateUpdate()
    {
        transform.LookAt(Camera.main.transform);
        transform.Rotate(0, 180, 0);
    }
}

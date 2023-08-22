using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpaceShipRotation : MonoBehaviour
{
    public GameObject satelite;
    public GameObject ship1;
    public GameObject ship2;
    public float rotationSpeed = 15f;


    // Start is called before the first frame update
    void Start()
    {

        
    }

    // Update is called once per frame
    void Update()
    {
        ship1.transform.RotateAround(satelite.transform.position, Vector3.down, rotationSpeed * Time.deltaTime);
        ship2.transform.RotateAround(satelite.transform.position, Vector3.up, rotationSpeed * Time.deltaTime);
    }

}

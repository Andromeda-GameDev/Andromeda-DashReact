using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Lvl1_Astronaut2 : MonoBehaviour
{
    // Simulations varaibles
    public GameObject astro1;
    public Vector3 offset;
    public GameObject mesh;

    // Flags
    bool moving = true;
    bool drop = false;
    public bool follow = false;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(follow)
        {
            transform.position = astro1.transform.position + offset * mesh.transform.localScale.x;
            transform.rotation = astro1.transform.rotation;
        }
    }

    void OnTriggerEnter(Collider other)
    {
        if(other.tag == "Astronaut1_W")
        {
            GetComponent<BoxCollider>().enabled = false;
            follow = true;
        }
        else
        {
            print("Cant be grabbed");
        }
    }
}

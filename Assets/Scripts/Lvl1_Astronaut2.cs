using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Lvl1_Astronaut2 : MonoBehaviour
{
    // Simulations varaibles
    public Animator anim;
    public GameObject astro1;

    // Flags
    bool moving = true;
    bool drop = false;
    bool follow = false;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(follow)
        {
            transform.position = Vector3.MoveTowards(transform.position, astro1.transform.position, 1f * Time.deltaTime);
        }
    }

    void OnTriggerEnter(Collider other)
    {
        if(other.tag == "Astronaut1_W")
        {
            //print("Can be grabbed");
            //print(other.transform.position);
            //transform.parent = other.transform;
            //transform.position = Vector3.MoveTowards(transform.position, new Vector3(24.13f, 0.47f, 0.00f), 1f);
            follow = true;
        }
        else
        {
            print("Cant be grabbed");
        }
    }
}

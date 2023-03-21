using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Lvl1_Astronaut1 : MonoBehaviour
{
    public Animator anim;

    // Start is called before the first frame update
    void Start()
    {
        anim.Play("Run");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnTriggerEnter(Collider other)
    {
        if(other.tag == "JumpTrigger"){
            anim.SetBool("Flag1", true);
        }
    }
}

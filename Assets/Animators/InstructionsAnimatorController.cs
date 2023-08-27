using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InstructionsAnimatorController : MonoBehaviour
{

    [SerializeField] Animator animatorController;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        animatorController.Play("InstrucV1");   
    }

}

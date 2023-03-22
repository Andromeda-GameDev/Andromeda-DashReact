using UnityEngine;
using System.Collections;
using UnityEngine.Animations;

public class BoxTriggers : MonoBehaviour
{
    // Script that handles trigger effects on Astronaut
    // Animations
    public Animator animator; // For animation parameters

    // Simulation Parameters
    public Rigidbody rb_astronaut; // For physics
    public float speed = 1.0f;
    public float initial_pos;
    public float distance = 1.0f;
    public float jump_force = 1.0f;

    // Flags
    bool moving = true;
    bool drop = false;
    bool dropFail = false;

    // Box Triggers
    public GameObject winBox1; // Successful jump 
    public GameObject winBox2; // Successful drop
    public GameObject failBox1; // Failed jump
    public GameObject failBox2; // Failed drop

    // Start is called before the first frame update
    void Start()
    {
        animator = gameObject.GetComponent<Animator>();
        rb_astronaut = gameObject.GetComponent<Rigidbody>();
        initial_pos = transform.localPosition.x;

        if(speed > 10)
        {
            winBox1.SetActive(true);
            failBox1.SetActive(true);
        }
        else if(speed < 10)
        {
            failBox2.SetActive(true);
        }
        else
        {
            winBox1.SetActive(true);
            winBox2.SetActive(true);
        }
    }

    void Update()
    {
        if (moving && transform.localPosition.x < initial_pos + distance)
        {
            //Speed is checked to activate the corresponding triggers
            if(speed < 10)
            {
                animator.speed = 0.5f;
                gameObject.tag = "Astronaut1_F";
            }
            else if(speed > 10)
            {
                animator.speed = 2f;
                gameObject.tag = "Astronaut1_F";
            }

            transform.localPosition += transform.forward * speed * Time.deltaTime;
            // transform.Translate(Vector3.forward * speed * Time.deltaTime);
        }
    }

    // Collision Effects
    // Animations that start on contact
    void OnCollisionEnter(Collision other)
    {
        string name = other.gameObject.name;
        
        // Define collisions
        if (name == "Floor")
        {
            moving = true; // continue moving forward (running)
            animator.SetBool("Land", true); print("Land");  // Land animation
        }
        else if (name == "Rope")
        {
            // Attach to rope
            FixedJoint fixedJoint = other.gameObject.GetComponent<FixedJoint>();
            fixedJoint.connectedBody = rb_astronaut; print("Rope Grab");
            moving = false; // Stop moving forward (running)
            other.gameObject.GetComponent<CapsuleCollider>().isTrigger = true; // Make rope a trigger
        }
    }

    void OnCollisionStay(Collision other)
    {
        string name = other.gameObject.name;
        
        // Define collisions
        if (name == "Rope")
        {
            gameObject.transform.localRotation = Quaternion.Euler(0, 90, 0);
        }
    }

    // Trigger Effects
    // Animations that start on contact
    void OnTriggerEnter(Collider other)
    {
        string name = other.name;
        
        // Define triggers
        if (name == "Jump_TB")
        {
            animator.SetTrigger("Jump"); print("Jump");
            rb_astronaut.AddRelativeForce(Vector3.up * jump_force, ForceMode.Impulse);
            // rb_astronaut.AddForce(Vector3.up * jump_force, ForceMode.Impulse);
            animator.SetBool("Land", false);
            winBox1.SetActive(false);
        }
        else if(name == "Jump_TB_Fail_Less")
        {
            print("Too slow");
            moving = false;
            animator.Play("LessSpeed"); // stop movement
            failBox1.SetActive(false);
        }
        else if (name == "Drop_TB")
        {
            drop = true; // chage drop flag
            winBox2.SetActive(false);
        }
        else if(name == "Drop_TB_Fail_Much")
        {
            dropFail = true; // confirm fail flag
            failBox2.SetActive(false);
        }
    }
    
    // Animations that last during contact
    void OnTriggerStay(Collider other)
    {
        string name = other.gameObject.name;

        // Define triggers
        if (drop)
        {
            FixedJoint fixedJoint = other.gameObject.GetComponent<FixedJoint>();
            fixedJoint.connectedBody = null; print("Rope Drop");
            drop = false; // Reset drop flag

            // Set Astronaut to face forward
            transform.rotation = Quaternion.Euler(0, 90, 0);
            rb_astronaut.freezeRotation = true;
        }
        else if(dropFail)
        {
            FixedJoint fixedJoint = other.gameObject.GetComponent<FixedJoint>();
            fixedJoint.connectedBody = null; print("Rope Drop");
            drop = false; // Reset drop flag

            //tDrop astronaut as a ragdoll
            moving = false;
            animator.Play("LessSpeed");
        }
    }

    // Animations that end out of contact
    void OnTriggerExit(Collider other)
    {
        
    }
}
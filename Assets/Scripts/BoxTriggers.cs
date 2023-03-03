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
    public float distance = 1.0f;
    public float jump_force = 1.0f;

    // Flags
    bool moving = true;
    bool drop = false;

    // Start is called before the first frame update
    void Start()
    {
        animator = gameObject.GetComponent<Animator>();
        rb_astronaut = gameObject.GetComponent<Rigidbody>();
    }

    void Update()
    {
        if (moving && transform.position.x < distance)
        {
            transform.Translate(Vector3.forward * speed * Time.deltaTime);
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
            moving = true; // ontinue moving forward (running)
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
            rb_astronaut.AddForce(Vector3.up * jump_force, ForceMode.Impulse);
            animator.SetBool("Land", false);
        }
        else if (name == "Drop_TB")
        {
            drop = true; // chage drop flag
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
    }

    // Animations that end out of contact
    void OnTriggerExit(Collider other)
    {
        
    }
}
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Gravity : MonoBehaviour
{
    public float gravityScale = 1.0f;
    private Rigidbody rb;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    void FixedUpdate()
    {
        // Calculate local gravity direction
        Vector3 localGravity = -transform.up;

        // Apply local gravity force to the Rigidbody component
        rb.AddForce(localGravity * gravityScale, ForceMode.Acceleration);
    }
}

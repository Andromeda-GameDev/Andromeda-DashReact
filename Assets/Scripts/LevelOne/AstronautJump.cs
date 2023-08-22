using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AstronautJump : MonoBehaviour
{
    public static AstronautJump instance;
    public float jumpForce = 5f;
    public Rigidbody rb;

    private void Awake() 
    {
        instance = this;
    }

    void Update() {

    }

    public void Jump()
    {
        rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
    }
}

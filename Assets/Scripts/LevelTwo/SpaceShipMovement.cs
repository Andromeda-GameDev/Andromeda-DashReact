using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpaceShipMovement : MonoBehaviour
{
    public Transform startPoint; // The starting position
    public Transform endPoint;   // The ending position
    public float moveSpeed = 2f;  // Movement speed of the ships
    int control = 0;


    void Start()
    {
        transform.LookAt(endPoint);
    }

    void Update()
    {
        MoveShip();
    }

    public void MoveShip()
    {
        float step = moveSpeed * Time.deltaTime;

        if(control == 0)
        {
            transform.position = Vector3.MoveTowards(transform.position, endPoint.position, step);
            if(transform.position == endPoint.position)
            {
                control = 1;
                transform.LookAt(startPoint);
            }
        }
        if(control == 1)
        {
            transform.position = Vector3.MoveTowards(transform.position, startPoint.position, step);
            if(transform.position == startPoint.position)
            {
                control = 0;
                transform.LookAt(endPoint);
            }
        }
    }

    

}

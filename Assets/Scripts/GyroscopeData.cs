using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using TMPro;

using Gyroscope = UnityEngine.InputSystem.Gyroscope;
public class GyroscopeData : MonoBehaviour
{
    public Vector3 angularVelocity, attitude;

    void Start()
    {
        InputSystem.EnableDevice(Gyroscope.current);
        // InputSystem.EnableDevice(Accelerometer.current);
        InputSystem.EnableDevice(AttitudeSensor.current);
        // InputSystem.EnableDevice(GravitySensor.current);
    }

    // Update is called once per frame
    void Update()
    {
        angularVelocity = Gyroscope.current.angularVelocity.ReadValue();
        attitude = AttitudeSensor.current.attitude.ReadValue().eulerAngles; // ReadValue() returns a Quaternion
    }
}

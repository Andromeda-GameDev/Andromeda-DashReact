using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using TMPro;

using Gyroscope = UnityEngine.InputSystem.Gyroscope;
public class GyroscopeData : MonoBehaviour
{
    public Vector3 angularVelocity, attitude;
    private int sign = 1;

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
        attitude = (AttitudeSensor.current.attitude.ReadValue().eulerAngles);
        attitude*= sign; // ReadValue() returns a Quaternion
    }

    public void ToggleInverse()
    {
        sign = sign * -1;
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using TMPro;

using Gyroscope = UnityEngine.InputSystem.Gyroscope;

public class ARMovementDetection : MonoBehaviour
{
    public TextMeshProUGUI gyroscopeText;
    public TextMeshProUGUI accelerometerText;
    public TextMeshProUGUI speedInputText;
    float speed = 0.0f;
    bool firstTouch = true;

    void Start()
    {
        // text = GetComponent<Text>();

        InputSystem.EnableDevice(Gyroscope.current);
        InputSystem.EnableDevice(Accelerometer.current);
        InputSystem.EnableDevice(AttitudeSensor.current);
        InputSystem.EnableDevice(GravitySensor.current);
    }

    void Update()
    {
        Vector3 angularVelocity = Gyroscope.current.angularVelocity.ReadValue();
        Vector3 acceleration = Accelerometer.current.acceleration.ReadValue();
        Vector3 attitude = AttitudeSensor.current.attitude.ReadValue().eulerAngles; // ReadValue() returns a Quaternion
        Vector3 gravity = GravitySensor.current.gravity.ReadValue();

        accelerometerText.text = $"Angular Velocity\nX={angularVelocity.x:#0.00} Y={angularVelocity.y:#0.00} Z={angularVelocity.z:#0.00}\n\n" +
                        $"Acceleration\nX={acceleration.x:#0.00} Y={acceleration.y:#0.00} Z={acceleration.z:#0.00}\n\n" +
                            $"Attitude\nX={attitude.x:#0.00} Y={attitude.y:#0.00} Z={attitude.z:#0.00}\n\n" +
                             $"Gravity\nX={gravity.x:#0.00} Y={gravity.y:#0.00} Z={gravity.z:#0.00}\n";

        // Check if touched
        if (Input.touchCount > 0) {
            if (firstTouch) {
                speed = 0.0f;
                firstTouch = false;
            }
            else
            {
                speed += Mathf.Abs(acceleration.z / 1.5f);
                // speed += 1.0f;
            }
            speedInputText.text = $"Speed: {speed:#0.00}";
        }
        else
        {
            firstTouch = true;
        }
    }
}

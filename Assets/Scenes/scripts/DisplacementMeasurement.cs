using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class DisplacementMeasurement : MonoBehaviour
{
    
    [SerializeField] ARRaycastManager arRaycastManager;
    [SerializeField] Camera arCamera;

    Vector3 initialPointPosition;
    bool measuring = false;
    float displacementZ;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
       if(Input.touchCount > 0)
       {
          Touch touch   = Input.GetTouch(0);

          if(touch.phase == TouchPhase.Began)
          {
            List<ARRaycastHit> hits = new List<ARRaycastHit>();
            if (arRaycastManager.Raycast(touch.position, hits, UnityEngine.XR.ARSubsystems.TrackableType.FeaturePoint)) 
            {
              initialPointPosition = hits[0].pose.position;
              measuring = true;
            }
          }
       }

      if(measuring)
      {
        List<ARRaycastHit> hits = new List<ARRaycastHit>();
        if (arRaycastManager.Raycast(Input.mousePosition, hits, UnityEngine.XR.ARSubsystems.TrackableType.FeaturePoint))
        {
          Vector3 currentPosition = hits[0].pose.position;
          displacementZ = currentPosition.z - initialPointPosition.z;

          Debug.Log("Displacement in Z: " + displacementZ);
        }
      }
    }
}

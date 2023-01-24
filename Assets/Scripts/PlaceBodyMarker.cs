using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

[RequireComponent(typeof(ARTrackedImageManager))]
public class PlaceBodyMarker : MonoBehaviour
{
    // Our ARTrackedImageManager for positional references
    private ARTrackedImageManager arTrackedImageManager;

    // Our prefabs for the 3D bodies that will be placed
    public GameObject[] arPrefabs;
    public GameObject light;

    // Our dictionary to keep track of the spawned bodies
    private readonly Dictionary<string, GameObject> spawnedPrefabs = new Dictionary<string, GameObject>();

    void Awake()
    {
        // Cache referemce to our Image Manager
        arTrackedImageManager = GetComponent<ARTrackedImageManager>();
    }

    void OnEnable()
    {
        // Register the appearance of our tracked images
        arTrackedImageManager.trackedImagesChanged += OnTrackedImagesChanged;
    }

    void OnDisable()
    {
        // Unregister the appearance of our tracked images
        arTrackedImageManager.trackedImagesChanged -= OnTrackedImagesChanged;
    }

    public void ResetButton()
    {
        // foreach (var curPrefab in spawnedPrefabs)
        // {
        //     Destroy(curPrefab.Value);
        // }
        // spawnedPrefabs.Clear();
        light.GetComponent<Image>().color = Color.red;
    }

    private void OnTrackedImagesChanged(ARTrackedImagesChangedEventArgs eventArgs)
    {
        // Loop through all the tracked images
        foreach (var trackedImage in eventArgs.added)
        {
            var imageName = trackedImage.referenceImage.name;
            // Loop through all our prefabs
            foreach (var curPrefab in arPrefabs)
            {
                // Check if detected image name matches the name of the prefab and it hasn't been spawned yet
                if (string.Compare(imageName, curPrefab.name, StringComparison.OrdinalIgnoreCase) == 0 && !spawnedPrefabs.ContainsKey(imageName))
                {
                    // Instantiate the prefabe and parenting it to the tracked image
                    var newPrefab = Instantiate(curPrefab, trackedImage.transform);
                    // Add the created prefab to our dictionary
                    spawnedPrefabs.Add(imageName, newPrefab);
                }
            }
        }

        foreach (var trackedImage in eventArgs.updated)
        {
            spawnedPrefabs[trackedImage.referenceImage.name].SetActive(trackedImage.trackingState == TrackingState.Tracking);
        }

        foreach (var trackedImage in eventArgs.removed)
        {
            Destroy(spawnedPrefabs[trackedImage.referenceImage.name]);
            spawnedPrefabs.Remove(trackedImage.referenceImage.name);
        }

        if (spawnedPrefabs.Count == 0)
        {
            light.GetComponent<Image>().color = Color.red;
        }
        else
        {
            light.GetComponent<Image>().color = Color.green;
        }
    }

    // Start is called before the first  frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

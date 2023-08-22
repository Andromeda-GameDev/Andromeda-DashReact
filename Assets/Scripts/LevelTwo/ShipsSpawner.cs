using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ShipsSpawner : MonoBehaviour
{
    public List<GameObject> spawns;
    private GameObject[] spawnsArray;


    // Start is called before the first frame update
    void Start()
    {
        foreach(GameObject ship in spawns)
        {
            Debug.Log("Una ship uwu");
            Debug.Log(ship.transform.position);
        } 
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

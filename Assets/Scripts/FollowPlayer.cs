using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FollowPlayer : MonoBehaviour
{
    public GameObject player;
    public GameObject prefab;
    // Start is called before the first frame update
    void Start()
    {
        transform.position = player.transform.position + new Vector3(0, 1, 1) * prefab.transform.localScale.x;
        
    }

    // Update is called once per frame
    void Update()
    {
        transform.position = player.transform.position + new Vector3(0, 1, 1) * prefab.transform.localScale.x;
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ReloadV1 : MonoBehaviour
{
    GameObject[] cubes;
    public GameObject text;
    bool toogle = false;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void GetCubes()
    {
        cubes = GameObject.FindGameObjectsWithTag("Cube");
    }

    public void Reload()
    {
        GetCubes();
        foreach (GameObject cube in cubes)
        {
            cube.transform.localScale = new Vector3(0.5f, 0.5f, 0.5f);
        }
        text.GetComponent<TMPro.TextMeshProUGUI>().text = "No. cubes: " + cubes.Length.ToString();
        text.SetActive(!toogle);
        toogle = !toogle;
    }
}

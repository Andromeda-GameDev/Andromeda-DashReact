using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpaceShipRotation : MonoBehaviour
{
    public GameObject satelite;
    public GameObject[] ships;
    public List<Transform> spawns;
    public float rotationSpeed = 10f;


    // Start is called before the first frame update
    void Start()
    {
        //Debug.Log(PickRandomElement(spawns));
        Transform pick = PickRandomElement(spawns);
        Debug.Log(pick);
        spawns.Remove(pick);
        Debug.Log(spawns);
        foreach(Transform pos in spawns){
            Debug.Log(pos.ToString());
        }
        
    }

    // Update is called once per frame
    void Update()
    {
        if(spawns.Count !=0 ){
            foreach(GameObject ship in ships){
                /*if(pick.name == "Spawn"){

                }
                else if(pick.name == "Spawn"){

                }*/
                Transform pick = PickRandomElement(spawns);
                Debug.Log("The spawn is");
                Debug.Log(pick);
                Debug.Log("Removing");
                spawns.Remove(pick);
                Debug.Log("Result");
                if(spawns.Count != 0){
                    foreach(Transform pos in spawns){
                        Debug.Log(pos.ToString());
                    }
                }
                else{
                    Debug.Log("Empty");
                }

                //ship.transform.RotateAround(satelite.transform.position, Vector3.down, rotationSpeed * Time.deltaTime);
            }
        }

        
    }

    public static Transform PickRandomElement<Transform>(List<Transform> list)
    {
        Debug.Log(list.Count);
        int index = Random.Range(0, list.Count);
        return list[index];
    }


}

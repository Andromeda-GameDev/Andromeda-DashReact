using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SFXManager : MonoBehaviour
{
    public static SFXManager instance;
    public List<AudioSource> audios; 

    private void Awake() 
    {
        instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        audios[0].Play(0);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void selectSFX(int number)
    {
        audios[number].Play(0);
    }

    
}

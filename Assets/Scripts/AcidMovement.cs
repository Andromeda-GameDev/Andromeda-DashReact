using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AcidMovement : MonoBehaviour
{

    public float speed = 0.1f;

    public Renderer ren;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        float moveThis = Time.time * speed;
        ren.material.SetTextureOffset("_MainTex", new Vector2(0, moveThis));
    }
}

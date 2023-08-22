using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class AcidMovement : MonoBehaviour
{
    public float endingYScale;
    public LevelLife levelLife;
    private float step;
    // Start is called before the first frame update
    void Start()
    {
        step = (endingYScale - 1)/levelLife.attempts;

        // Subscribe RaiseAcid to attemptsReduced event
        levelLife.attemptsReduced.AddListener(RaiseAcid);
        levelLife.newQuestion.AddListener(ResetAcid);
    }

    // Update is called once per frame
    void Update()
    {
        //ren.material.SetTextureOffset("_MainTex", new Vector2(0, moveThis));
        
    }

    void RaiseAcid()
    {
        // TODO
        // could be replaced with animation
        transform.localScale = new Vector3(transform.localScale.x, transform.localScale.y + step, transform.localScale.z);
    }

    void ResetAcid()
    {
        // TODO
        // could be replaced with animation
        transform.localScale = new Vector3(transform.localScale.x, 1, transform.localScale.z);
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/*
 * Script to handle children objects variables and status.
 * */
public class GeneralObjectController : MonoBehaviour
{
    public int startPoint_t       = -20;
    public bool rotateXY_t        = true;
    public string test_t          = "x ^ 2";
    public int numDisks_t         = 50;
    public float height_t         = 5f;
    public float cylinderHeight_t = 0.2f;

    private SolidOfRevolution       child1;
    private SolidOfRevolution       child2;
    private SolidOfRevolutionDisks  child3;

    // Start is called before the first frame update
    void Start()
    {
      Transform child1Transform = transform.Find("OuterShell");
      Transform child2Transform = transform.Find("InnerShell");
      Transform child3Transform = transform.Find("Disks");

      /*
       * Getting the Outer shell object script
       * */
      if (child1Transform != null)
      {
          child1  = child1Transform.GetComponent<SolidOfRevolution>();
          if(child1 != null)
          {
              child1.startPoint   = startPoint_t;
              child1.rotateXY     = rotateXY_t;
              child1.test         = test_t;
              child1.numDisks     = numDisks_t;
              child1.height       = height_t;
          }
      }

      /*
       * Getting the Inner shell object script
       * */
      if (child2Transform != null)
      {
          child2  = child2Transform.GetComponent<SolidOfRevolution>();
          if(child2 != null)
          {
              child2.startPoint   = startPoint_t;
              child2.rotateXY     = rotateXY_t;
              child2.test         = test_t;
              child2.numDisks     = numDisks_t;
              child2.height       = height_t;
          }
      }

      /*
       * Getting the Disks object script
       * */
      if(child3Transform != null)
      {
          child3 = child3Transform.GetComponent<SolidOfRevolutionDisks>();
          if(child3 != null)
          {
              child3.startPoint     = startPoint_t;
              child3.rotateXY       = rotateXY_t;
              child3.test           = test_t;
              child3.numDisks       = numDisks_t;
              child3.height         = height_t;
              child3.cylinderHeight = cylinderHeight_t;
          }
      }
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

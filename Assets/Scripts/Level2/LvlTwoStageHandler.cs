using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LvlTwoStageHandler : MonoBehaviour
{
    public static LvlTwoStageHandler instance;
    public int stage = 0;
    public int substage = -1;
    public TextWriter textWriter;
    public GameObject[] disks;
    public GameObject[] cylinders;

    private void Awake()
    {
        if (instance == null)
        {
            instance = this;
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void NextStage()
    {
        stage++;
        substage = -1;
    }

    public void SetStage(int stage)
    {
        this.stage = stage;
        substage = -1;
    }

    public void SetSubstage(int substage)
    {
        this.substage = substage;
        switch (stage)
        {
            case 0:
                if(substage == 1){ textWriter.setEquation("x/2"); }
                else if(substage == 2){ textWriter.setEquation("x^2/4"); }
                else{ textWriter.setEquation("xxx"); }
                break;
            case 1:
                if(substage == 1){ textWriter.setEquation("2-2*x"); }
                else if(substage == 2){ textWriter.setEquation("sqrt(4-x)"); }
                else{ textWriter.setEquation("xxx"); }
                break;
            default:
                break;
        }
    }

    public int GetStage()
    {
        return stage;
    }

    public int GetSubstage()
    {
        return substage;
    }

    public void ConfirmStage()
    {
        switch (stage)
        {
            case 0:
                if(substage == 1){ disks[0].SetActive(true); }
                else if(substage == 2){ cylinders[0].SetActive(true); }
                break;
            case 1:
                if(substage == 1){ disks[1].SetActive(true); }
                else if(substage == 2){ cylinders[1].SetActive(true); }
                break;
            default:
                break;
        }
    }
}

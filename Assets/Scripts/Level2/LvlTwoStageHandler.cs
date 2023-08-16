using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LvlTwoStageHandler : MonoBehaviour
{
    public static LvlTwoStageHandler instance;
    // 0 es cono, 1 es copa
    public int stage = 0;
    // 0 es introducir ecuacion(es), 1 limites, 2 peso y 3 impresion
    public int substage = 0;
    // 0 es discos, 1 es cilindros
    public int path = -1;
    // Only used for Stage 0-0, path 1 and stage 1
    public int part = 0;
    public int substageLimit = 3;
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
        Debug.Log($"Next Stage on stage {stage}");
        stage++;
    }

    public void SetStage(int stage)
    {
        this.stage = stage;
        substage = -1;
    }

    public int GetStage()
    {
        return stage;
    }

    public void NextSubstage()
    {
        Debug.Log($"Next Substage on substage {substage}");
        if(substage > substageLimit){
            substage = 0;
            NextStage();
        }
        else{
           substage++; 
        }
    }

    public void SetSubstage(int substage)
    {
        this.substage = substage;
    }

    public int GetSubstage()
    {
        return substage;
    }

    int[,,] parts = new int [2, 2, 2]
    {
        // stage 0
        {
            // subs 0
            {
                1,
                2
            },
            // subs 1
            {
                1,  
                1 
            },
        },
        // stage 1
        {
            // subs 0
            {
                2,
                2
            },
            // subs 1
            {
                2,
                2
            },
        }
    };

    public bool NextPart()
    {
        Debug.Log($"Next Part on part {part}");
        if(part == parts[stage, substage, path] - 1){
            part = 0;
            NextSubstage();
            return false;
        }
        else
        {
            part++;
            textWriter.setEquation(equations[stage, path, part]);
            return true;
        }
    }

    public void SetPart(int part)
    {
        this.part = part;
    }

    public int GetPart()
    {
        return part;
    }

    // stage, path, part
    string[,,] equations = new string[2, 2, 2] {
        // stage 0
        {
            // path 0 
            {
                "y/a",
                "ERROR"
            },
            // path 1
            {
                "x",
                "a-ax"
            }
        },
        // stage 1
        {
            // path 0 
            {
                "(x^2/a^2)-(a^2/2)",
                "(a^2/2)-(x^2/a^2)"
            },
            // path 1
            {
                "a*sqrt(a^2-y)",
                "a^2-a*sqrt(a^2-y)"
            }
        }
    };

    // stage, path, part, limit(0 = upper, 1 = lower)
    string[,,,] limits = new string[2, 2, 2, 2]{
        // stage 0
        {
            // path 0
            {
                {"0", "a"},
                {"ERROR", "ERROR"}
            },
            // path 1
            {
                {"0", "1"},
                {"ERROR", "ERROR"}
            }
        },
        // stage 1
        {
            // path 0
            {
                {"a^2/sqrt(2)", "0"},
                {"a^2", "a^2/sqrt(2)"}
            },
            // path 1
            {
                {"a^2", "a^2/2"},
                {"a^2/2", "0"}
            }
        }
    };

    /*
        ---PLAN MAESTRO---
        Stage 0 (cono)
            Substage 0 (ecuaciones):
                Path 0 (discos): R(y)=y/a
                Path 1 (cilindro): 
                    Part 0: r(x)=x
                    Part 1: h(x)=a-ax
            Substage 1 (limites): 
                Path 0 (discos): 0 <= y <= a <--- lo escribió copilot solito
                Path 1 (cilindro): 0 <= x <= 1
            Substage 2 (peso): (a*pi*19.32)/(3000) (para 1<=a<=3)
            Substage 3 (impresión)
        Stage 1 (copa)
            Substage 0 (ecuaciones):
                Path 0 (disco): 
                    Part 0: R_1(x)=(x^2/a^2)-(a^2/2)
                    Part 1: R_2(x)=(a^2/2)-(x^2/a^2)
                Path 1 (cilindro): 
                    Part 0: h_1(y)=a*sqrt(a^2-y)
                    Part 1: h_2(y)=a^2-a*sqrt(a^2-y)
            Substage 1 (limites): 
                Path 0 (discos):
                    Part 0: a^2/sqrt(2) <= x <= 0
                    Part 1: a^2 <= x <= a^2/sqrt(2)
                Path 1 (cilindro): 
                    Part 0: a^2 <= y <= a^2/2
                    Part 1: a^2/2 <= y <= 0
            Substage 2 (peso): (a*pi*19.32)/(3000) (para 1<=a<=3)
            Substage 3 (impresión)
    */

    public void SetPath(int path)
    {
        this.path = path;
        Debug.Log($"Set path to {path}");
        Debug.Log($"stage = {stage}, path = {path}, part = {part}");
        Debug.Log($"Setting textWriter equation to = {equations[stage, path, part]}");
        textWriter.setEquation(equations[stage, path, part]);
    }
}

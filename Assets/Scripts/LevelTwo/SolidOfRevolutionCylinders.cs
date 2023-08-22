using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SolidOfRevolutionCylinders : MonoBehaviour
{
    public float radius           = 1f;
    public int numDisks           = 20;
    public float height           = 2f;
    public float cylinderHeight   = 0.1f;
    public float solidLength      = 2f; // length of the solid
    public string test            = "sin ( x ) + cos ( x )";
    public Material selectedMaterial;
	public GameObject cylinderPrefab;

    public int startPoint         = -20;
    public bool rotateXY          = false;

    /*
     * This functions takes of changing the Current Cross section
     * plane, to generate a 3d printing like animation.
     * */
    public static string AddSpacesBetweenCharacters(string input)
    {
      string output   = string.Empty;
      for (int i = 0; i < input.Length; i++)
      {
        char c  = input[i];
        output  += c;

        if (c != ' ' && i < input.Length - 1 && input[i + 1] != ' ')
        {
          output += ' ';
        }
      }

      return output;
    }

    // Start is called before the first frame update
    void Start()
    {
        string testToParse            = AddSpacesBetweenCharacters(test);
        float xLimit = 2.236068f;
		float yLimit = Parser.Parse(testToParse, xLimit);
		// Get dx from limit
		float dx = xLimit / numDisks;
		float x = 0f;
        for (int i = startPoint; i < numDisks; i++)
        {
            GameObject cylinder       = Instantiate(cylinderPrefab);
            x = i * dx;
			
			cylinder.transform.SetParent(gameObject.transform);
			cylinder.transform.position = new Vector3(0, yLimit, 0);

            float y                   = Parser.Parse(testToParse, x);
			Debug.Log($"({x}, {y})");
			cylinder.transform.localScale = new Vector3(x*2, y-yLimit, x*2);
			
            //Material material           = new Material(Shader.Find("Standard"));
            //meshRenderer.material       = selectedMaterial;

            // Rotate cylinders to the y-axis
            // cylinder.transform.rotation = Quaternion.LookRotation(Vector3.up, Vector3.forward);
        }

        // Rotate the whole object if necessary
        if (rotateXY)
        {
            transform.Rotate(0, 0, 270f);
        }
    
    }

    // Update is called once per frame
    void Update()
    {

    }
}

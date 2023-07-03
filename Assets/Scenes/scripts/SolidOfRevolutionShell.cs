using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SolidOfRevolutionShell : MonoBehaviour
{
    public float radius = 1f;
    public int numDisks = 20;
    public float height = 2f;
    public float cylinderHeight = 0.1f;
    public float solidLength = 2f; // length of the solid
    public string test = "sin ( x ) + cos ( x )";
    public Material selectedMaterial;

    public int startPoint = -20;
    public bool rotateXY = false;

    /*
     * This function takes care of changing the Current Cross section
     * plane to generate a 3D printing-like animation.
     */
    public static string AddSpacesBetweenCharacters(string input)
    {
        string output = string.Empty;
        for (int i = 0; i < input.Length; i++)
        {
            char c = input[i];
            output += c;

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
        string testToParse = AddSpacesBetweenCharacters(test);

        for (int i = startPoint; i < numDisks; i++)
        {
            GameObject cylinder = new GameObject("Cylinder" + i);
            cylinder.transform.parent = transform;

            MeshFilter meshFilter = cylinder.AddComponent<MeshFilter>();
            MeshRenderer meshRenderer = cylinder.AddComponent<MeshRenderer>();

            Mesh mesh = new Mesh();
            meshFilter.mesh = mesh;

            List<Vector3> vertices = new List<Vector3>();
            List<int> triangles = new List<int>();

            float shellHeight = (i + 0.5f) * solidLength / numDisks;
            Debug.Log("shellHeight: " + shellHeight);
            float angle = 360f / numDisks;

            float y = Parser.Parse(testToParse, shellHeight);

            for (int j = 0; j < numDisks; j++)
            {
                float theta = j * angle;
                float x = radius * Mathf.Cos(Mathf.Deg2Rad * theta);
                float z = radius * Mathf.Sin(Mathf.Deg2Rad * theta);

                if (rotateXY)
                {
                    vertices.Add(new Vector3(y - cylinderHeight / 2f, x, z));
                    vertices.Add(new Vector3(y + cylinderHeight / 2f, x, z));
                }
                else
                {
                    vertices.Add(new Vector3(x, z, y - cylinderHeight / 2f));
                    vertices.Add(new Vector3(x, z, y + cylinderHeight / 2f));
                }

                int v1 = j * 2;
                int v2 = j * 2 + 1;
                int v3 = ((j + 1) % numDisks) * 2;
                int v4 = ((j + 1) % numDisks) * 2 + 1;

                triangles.Add(v1);
                triangles.Add(v2);
                triangles.Add(v3);

                triangles.Add(v2);
                triangles.Add(v4);
                triangles.Add(v3);

                // Add triangles for the bottom and top faces
                triangles.Add(0);
                triangles.Add(v1);
                triangles.Add(v3);

                triangles.Add(1);
                triangles.Add(v4);
                triangles.Add(v2);
            }

            mesh.vertices = vertices.ToArray();
            mesh.triangles = triangles.ToArray();

            mesh.RecalculateNormals();

            Vector2[] uvs = new Vector2[vertices.Count];

            for (int j = 0; j < vertices.Count; j++)
            {
                uvs[j] = new Vector2(vertices[j].x / radius + 0.5f, vertices[j].y / solidLength);
            }

            mesh.uv = uvs;

            Material material = new Material(Shader.Find("Standard"));
            meshRenderer.material = selectedMaterial;

            // Rotate cylinders to the y-axis
            cylinder.transform.rotation = Quaternion.LookRotation(Vector3.up, Vector3.forward);
        }

        // Rotate the whole object if necessary
        if (rotateXY)
        {
            transform.Rotate(Vector3.up, 180f);
        }
    }

    // Update is called once per frame
    void Update()
    {

    }
}


using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SolidOfRevolutionThree : MonoBehaviour
{
    public float radius = 1f;
    public int numDisks = 20;
    public float height = 2f;
    public float lineSlope = 1f;
    public float lineIntercept = 0f;
    public float cylinderHeight = 0.1f;
    public float a = 1f;

public float startHeight = -1f;
public float endHeight = 1f;

void Start()
{
    float xIntersect = Mathf.Pow(a, 2) / Mathf.Sqrt(Mathf.Pow(a, 2) * 2 - Mathf.Pow(a, 4));

    for (int i = -numDisks / 2; i < numDisks / 2; i++)
    {
        GameObject cylinder = new GameObject("Cylinder" + i);
        cylinder.transform.parent = transform;

        MeshFilter meshFilter = cylinder.AddComponent<MeshFilter>();
        MeshRenderer meshRenderer = cylinder.AddComponent<MeshRenderer>();

        Mesh mesh = new Mesh();
        meshFilter.mesh = mesh;

        List<Vector3> vertices = new List<Vector3>();
        List<int> triangles = new List<int>();

        float y = (i + 0.5f) * height / numDisks;
        float angle = 360f / numDisks;

        for (int j = 0; j < numDisks; j++)
        {
            float theta = j * angle;
            float x = radius * Mathf.Sqrt(Mathf.Abs(y - Mathf.Pow(a, 2)) + (Mathf.Pow(a, 4) / Mathf.Pow(radius, 2))) * Mathf.Cos(Mathf.Deg2Rad * theta);
            float z = radius * Mathf.Sqrt(Mathf.Abs(y - Mathf.Pow(a, 2)) + (Mathf.Pow(a, 4) / Mathf.Pow(radius, 2))) * Mathf.Sin(Mathf.Deg2Rad * theta);

            vertices.Add(new Vector3(x, y - cylinderHeight / 2f, z));
            vertices.Add(new Vector3(x, y + cylinderHeight / 2f, z));

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
        }

        mesh.vertices = vertices.ToArray();
        mesh.triangles = triangles.ToArray();

        mesh.RecalculateNormals();

        Vector2[] uvs = new Vector2[vertices.Count];

        for (int j = 0; j < vertices.Count; j++)
        {
            uvs[j] = new Vector2(vertices[j].x / radius + 0.5f, vertices[j].z / height);
        }

        mesh.uv = uvs;

        Material material = new Material(Shader.Find("Standard"));
        meshRenderer.material = material;

        // Rotate cylinders to the y-axis
        cylinder.transform.rotation = Quaternion.LookRotation(Vector3.up, Vector3.forward);
    }
}

    // Update is called once per frame
    void Update()
    {

    }
}
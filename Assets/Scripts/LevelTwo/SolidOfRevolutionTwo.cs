using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SolidOfRevolutionTwo : MonoBehaviour
{
    public float radius = 1f;
    public int numDisks = 20;
    public float height = 2f;
    public float lineSlope = 1f;
    public float lineIntercept = 0f;
    public float cylinderHeight = 0.1f;

    // Start is called before the first frame update
    void Start()
    {
        for (int i = 0; i < numDisks; i++)
        {
            GameObject cylinder = new GameObject("Cylinder" + i);
            cylinder.transform.parent = transform;
            cylinder.tag = "Partition";

            MeshFilter meshFilter = cylinder.AddComponent<MeshFilter>();
            MeshRenderer meshRenderer = cylinder.AddComponent<MeshRenderer>();
            MeshCollider meshCollider = cylinder.AddComponent<MeshCollider>();
            Partition partition = cylinder.AddComponent<Partition>();

            Mesh mesh = new Mesh();
            meshFilter.mesh = mesh;

            List<Vector3> vertices = new List<Vector3>();
            List<int> triangles = new List<int>();

            float y = (i + 0.5f) * height / numDisks;
            float angle = 360f / numDisks;
            float radii = radius * Mathf.Sqrt(y);

            for (int j = 0; j < numDisks; j++)
            {   
                float theta = j * angle;
                float x = radii * Mathf.Cos(Mathf.Deg2Rad * theta);
                float z = radii * Mathf.Sin(Mathf.Deg2Rad * theta);

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
                uvs[j] = new Vector2(vertices[j].x / radius + 0.5f, vertices[j].z / height);
            }

            mesh.uv = uvs;

            Material material = new Material(Shader.Find("Standard"));

            meshRenderer.material = material;
            meshCollider.sharedMesh = mesh;
            partition.Radius = radii;
        }
    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
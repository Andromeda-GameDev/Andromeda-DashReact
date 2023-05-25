using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SolidOfRevolution : MonoBehaviour
{
    public float radius = 1f;
    public int numDisks = 20;
    public float height = 2f;
    public float lineSlope = 1f;
    public float lineIntercept = 0f;

    void Start()
    {
        // Get the MeshFilter component attached to the GameObject, and if it doesn't exist, add it.
        MeshFilter meshFilter = GetComponent<MeshFilter>();
        if (meshFilter == null)
        {
            meshFilter = gameObject.AddComponent<MeshFilter>();
        }


        // Create a new Mesh object.
        Mesh mesh = new Mesh();
        meshFilter.mesh = mesh;

        // Create two Lists to store the vertices and triangles that will make up the mesh.
        List<Vector3> vertices = new List<Vector3>();
        List<int> triangles = new List<int>();

        // Calculate the height of each disk, and the angle between each disk.
        float diskHeight = height / numDisks;
        float angle = 360f / numDisks;

        /*
        This loop generates vertices for each disk of the cone. It iterates over each disk (i.e., each level of the cone)
        and for each disk, it iterates over each point on the disk. It calculates the x, y, and z coordinates of the current
        point on the disk using the disk height, radius, and angle. It then adds the vertex with the calculated coordinates 
        to the List of vertices. This generates the set of vertices that define the surface of the cone.
        */
        // Loop through each disk, and then through each point on the disk.
        for (int i = 0; i < numDisks + 1; i++)
        {
            // Calculate the y value of the current disk.
            float y = i * diskHeight;

            for (int j = 0; j < numDisks; j++)
            {   
                // Calculate the angle of the current point on the disk.
                float theta = j * angle;
                // Calculate the x and z coordinates of the current point on the disk.
                //float x = (y - lineIntercept) / lineSlope * Mathf.Cos(Mathf.Deg2Rad * theta);
                float x = radius * Mathf.Sqrt(y) * Mathf.Cos(Mathf.Deg2Rad * theta);
                //float z = (y - lineIntercept) / lineSlope * Mathf.Sin(Mathf.Deg2Rad * theta);
                float z = radius * Mathf.Sqrt(y) * Mathf.Sin(Mathf.Deg2Rad * theta);

                // Add the vertex to the List of vertices.
                vertices.Add(new Vector3(x, y, z));
            }
        }

        // Calculate the total number of vertices.
        int vertexCount = vertices.Count;

        /*
        This loop iterates over each quad in the mesh. It uses the indices of the vertices created 
        in the previous loop to define the corners of each quad. The four indices a, b, c, and d 
        represent the vertices at the corners of the current quad. The first triangle of the quad is 
        defined by the vertices (a, b, c), and the second triangle is defined by the vertices (c, b, d). 
        These six indices are then added to the list of triangles, defining the two triangles that make up the quad.

        Quads: In computer graphics, a quad (short for quadrilateral) is a polygon with four vertices 
        (or corners) and four sides. It is a simple shape commonly used to represent flat surfaces, such as a square 
        or a rectangle. Quads are often used in 3D modeling and rendering, where they can be subdivided into smaller 
        triangles to improve the accuracy of the model.
        */
        // Loop through each disk, and then through each point on the disk.
        for (int i = 0; i < numDisks; i++)
        {
            for (int j = 0; j < numDisks; j++)
            {
                // Calculate the index of each vertex in the current quad.
                int a = i * numDisks + j;
                int b = i * numDisks + (j + 1) % numDisks;
                int c = (i + 1) * numDisks + j;
                int d = (i + 1) * numDisks + (j + 1) % numDisks;

                 // Add the indices of the vertices to the List of triangles.
                triangles.Add(a);
                triangles.Add(b);
                triangles.Add(c);

                triangles.Add(c);
                triangles.Add(b);
                triangles.Add(d);
            }
        }

        // Set the vertices and triangles of the mesh.
        mesh.vertices = vertices.ToArray();
        mesh.triangles = triangles.ToArray();

        // Recalculate the normals of the mesh.
        mesh.RecalculateNormals();

        // Create an array of UV coordinates for each vertex in the mesh.
        Vector2[] uvs = new Vector2[vertexCount];

        // Loop through each vertex in the mesh, and calculate its UV coordinates.
        for (int i = 0; i < vertexCount; i++)
        {
            // Calculate the UV coordinates of the vertex.
            uvs[i] = new Vector2(mesh.vertices[i].x / radius + 0.5f, mesh.vertices[i].y / height);
        }

        // Set the UV coordinates of the mesh.
        mesh.uv = uvs;


    }
}
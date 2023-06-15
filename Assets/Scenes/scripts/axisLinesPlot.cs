using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class axisLinesPlot : MonoBehaviour
{
    public float lineLength = 10f;
    public float lineWidth = 0.05f;
    public Color xColor = Color.red;
    public Color yColor = Color.green;
    public Color zColor = Color.blue;

    void Start()
    {
        // Create X axis line
        GameObject xAxis = new GameObject("X Axis");
        xAxis.transform.parent = transform;
        LineRenderer xLineRenderer = xAxis.AddComponent<LineRenderer>();
        xLineRenderer.positionCount = 2;
        xLineRenderer.SetPosition(0, new Vector3(-lineLength, 0f, 0f));
        xLineRenderer.SetPosition(1, new Vector3(lineLength, 0f, 0f));
        xLineRenderer.startWidth = lineWidth;
        xLineRenderer.endWidth = lineWidth;
        xLineRenderer.material = new Material(Shader.Find("Sprites/Default"));
        xLineRenderer.material.color = xColor;

        // Create X axis ruler
        GameObject xRuler = new GameObject("X Ruler");
        xRuler.transform.parent = transform;
        for (float i = -lineLength; i <= lineLength; i++)
        {
            GameObject rulerText = new GameObject("Ruler Text");
            rulerText.transform.parent = xRuler.transform;
            TextMesh textMesh = rulerText.AddComponent<TextMesh>();
            textMesh.text = i.ToString();
            textMesh.anchor = TextAnchor.MiddleCenter;
            textMesh.alignment = TextAlignment.Center;
            textMesh.characterSize = 0.1f;
            rulerText.transform.localPosition = new Vector3(i, -0.2f, 0f);
        }

        // Create Y axis line
        GameObject yAxis = new GameObject("Y Axis");
        yAxis.transform.parent = transform;
        LineRenderer yLineRenderer = yAxis.AddComponent<LineRenderer>();
        yLineRenderer.positionCount = 2;
        yLineRenderer.SetPosition(0, new Vector3(0f, -lineLength, 0f));
        yLineRenderer.SetPosition(1, new Vector3(0f, lineLength, 0f));
        yLineRenderer.startWidth = lineWidth;
        yLineRenderer.endWidth = lineWidth;
        yLineRenderer.material = new Material(Shader.Find("Sprites/Default"));
        yLineRenderer.material.color = yColor;

        // Create Y axis ruler
        GameObject yRuler = new GameObject("Y Ruler");
        yRuler.transform.parent = transform;
        for (float i = -lineLength; i <= lineLength; i++)
        {
            GameObject rulerText = new GameObject("Ruler Text");
            rulerText.transform.parent = yRuler.transform;
            TextMesh textMesh = rulerText.AddComponent<TextMesh>();
            textMesh.text = i.ToString();
            textMesh.anchor = TextAnchor.MiddleCenter;
            textMesh.alignment = TextAlignment.Center;
            textMesh.characterSize = 0.1f;
            rulerText.transform.localPosition = new Vector3(0f, i, 0f);
        }

        // Create Z axis line
        GameObject zAxis = new GameObject("Z Axis");
        zAxis.transform.parent = transform;
        LineRenderer zLineRenderer = zAxis.AddComponent<LineRenderer>();
        zLineRenderer.positionCount = 2;
        zLineRenderer.SetPosition(0, new Vector3(0f, 0f, -lineLength));
        zLineRenderer.SetPosition(1, new Vector3(0f, 0f, lineLength));
        zLineRenderer.startWidth = lineWidth;
        zLineRenderer.endWidth = lineWidth;
        zLineRenderer.material = new Material(Shader.Find("Sprites/Default"));
        zLineRenderer.material.color = zColor;

        // Create Z axis ruler
        GameObject zRuler = new GameObject("Z Ruler");
        zRuler.transform.parent = transform;
        for (float i = -lineLength; i <= lineLength; i++)
        {
            GameObject rulerText = new GameObject("Ruler Text");
            rulerText.transform.parent = zRuler.transform;
            TextMesh textMesh = rulerText.AddComponent<TextMesh>();
            textMesh.text = i.ToString();
            textMesh.anchor = TextAnchor.MiddleCenter;
            textMesh.alignment = TextAlignment.Center;
            textMesh.characterSize = 0.1f;
            rulerText.transform.localPosition = new Vector3(0f, -0.2f, i);
        }
    }
}
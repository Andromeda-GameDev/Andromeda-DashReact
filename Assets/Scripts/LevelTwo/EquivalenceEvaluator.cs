using UnityEngine;
using AngouriMath;
using System;

public class EquivalenceEvaluator : MonoBehaviour
{
    // Start is called before the first frame update
    public TMPro.TMP_InputField equation1;
    public TMPro.TMP_InputField equation2;

    // public void IsEquivalent()
    // {
    //     try
    //     {
    //         Debug.Log($"Las ecuaciones son: {(s_IsEquivalent(equation1.text, equation2.text) ? "equivalentes" : "NO equivalentes")}.");
    //     }
    //     catch (System.Exception err)
    //     {
    //         Debug.Log($"Error: {err.Message}");
    //     }
    // }

    public bool IsEquivalent(string eq1, string eq2)
    {
        try
        {
            Debug.Log($"Las ecuaciones son: {(s_IsEquivalent(eq1, eq2) ? "equivalentes" : "NO equivalentes")}.");
            return s_IsEquivalent(eq1, eq2);
        }
        catch (System.Exception err)
        {
            Debug.Log($"Error: {err.Message}");
            return false;
        }
    }

    private static bool s_IsEquivalent(string equation1, string equation2)
    {
        // Test A
        Entity expr1 = equation1;
        Entity expr2 = equation2;


        expr1 = expr1.Simplify();
        expr2 = expr2.Simplify();

        expr1 = expr1.Expand();
        expr2 = expr2.Expand();


        Debug.Log($"Ecuación 1: {expr1.Latexise()}");
        Debug.Log($"Ecuación 2: {expr2.Latexise()}");

        string a = expr1.Latexise();
        string b = expr2.Latexise();

        char[] c = a.ToCharArray();
        char[] d = b.ToCharArray();

        Array.Sort(c);
        Array.Sort(d);

        string e = new string(c);
        string f = new string(d);

        Debug.Log($"Ecuación 1: {e}");
        Debug.Log($"Ecuación 2: {f}");


        return e == f;
    }


}
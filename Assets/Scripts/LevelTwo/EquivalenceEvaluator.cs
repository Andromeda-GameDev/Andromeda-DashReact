using UnityEngine;
using MathNet.Symbolics;
using AngouriMath;

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

    public void IsEquivalent(string eq1, string eq2)
    {
        try
        {
            Debug.Log($"Las ecuaciones son: {(s_IsEquivalent(eq1, eq2) ? "equivalentes" : "NO equivalentes")}.");
        }
        catch (System.Exception err)
        {
            Debug.Log($"Error: {err.Message}");
        }
    }

    private static bool s_IsEquivalent(string equation1, string equation2)
    {
        // Test A
        Entity expr1 = equation1;
        Entity expr2 = equation2;

        expr1 = expr1.Expand();
        expr2 = expr2.Expand();

        expr1 = expr1.Simplify();
        expr2 = expr2.Simplify();

        // Test B
        SymbolicExpression symb_expr1 = SymbolicExpression.Parse(expr1.ToString());
        SymbolicExpression symb_expr2 = SymbolicExpression.Parse(expr2.ToString());

        var simplified1 = symb_expr1.TrigonometricSimplify();
        var simplified2 = symb_expr2.TrigonometricSimplify();


        Debug.Log($"Ecuación 1: {expr1.Latexise()}");
        Debug.Log($"Ecuación 2: {expr2.Latexise()}");

        // Compare the equations with Test A and Test B
        return expr1 == expr2 || simplified1.ToString() == simplified2.ToString();
    }


}
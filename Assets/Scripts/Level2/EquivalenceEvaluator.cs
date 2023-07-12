using UnityEngine;
using MathNet.Symbolics;

public class EquivalenceEvaluator : MonoBehaviour
{
    // Start is called before the first frame update
    public TMPro.TMP_InputField equation1;
    public TMPro.TMP_InputField equation2;

    public void IsEquivalent()
    {
        try
        {
            Debug.Log($"Las ecuaciones son: {(s_IsEquivalent(equation1.text, equation2.text) ? "equivalentes" : "NO equivalentes")}.");
        }
        catch (System.Exception err)
        {
            Debug.Log($"Error: {err.Message}");
        }
    }
    private static bool s_IsEquivalent(string equation1, string equation2)
    {
        SymbolicExpression expr1 = SymbolicExpression.Parse(equation1);
        SymbolicExpression expr2 = SymbolicExpression.Parse(equation2);

        var simplified1 = expr1.TrigonometricSimplify();
        var simplified2 = expr2.TrigonometricSimplify();

        Debug.Log($"Ecuación 1: {simplified1.ToString()}");
        Debug.Log($"Ecuación 2: {simplified2.ToString()}");

        // Compare the equations.
        return simplified1.ToString() == simplified2.ToString();
    }
}
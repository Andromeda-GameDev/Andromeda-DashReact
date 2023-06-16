using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using UnityEngine;

public class Parser : MonoBehaviour
{
    public static float Parse(string function, float eval)
    {
        List<string> tokens = Tokenize(function);
        return FirstCheck(tokens, 0, tokens.Count, eval);
    }

    private static List<string> Tokenize (string function)
    {
        List<string> tokens = new List<string>();
        string[] split = function.Split(' ');
        foreach (string token in split)
        {
            tokens.Add(token);
        }
        return tokens;
    }

    private static void PrintTokens (List<string> tokens, int begin, int end)
    {
        String res = "";
        for (int i = begin; i < end; i++)
        {
            res += tokens[i];
        }
        Debug.Log(res);
    }
    // THE PARSER WILL APPLY THE FOLLOWING RULES IN ORDER:
    // 1. Parenthesis
    // 2. abs, sin, cos, tan, log, exp, sqrt
    // 3. *, /
    // 4. +, -
    // 5. x or constants

    // 1. Parenthesis
    private static float FirstCheck(List<string> tokens, int begin, int end, float eval)
    {
        // PrintTokens(tokens, begin, end);
        Stack<int> start = new Stack<int>();
        Regex regex = new Regex(@"^-?[0-9]*(\\.[0-9]+)?$");
        for (int i = begin; i < end; i++)
        {
            if (regex.IsMatch(tokens[i]))
            {
                tokens[i] = tokens[i];
            }
            else if (tokens[i] == "x")
            {
                tokens[i] = eval.ToString();
            }
            else if (tokens[i] == "(")
            {
                start.Push(i);
            }
            else if (tokens[i] == ")")
            {
                int startIndex = start.Pop();
                int endIndex = i;
                // PrintTokens(tokens, begin, tokens.Count);
                float check = FirstCheck(tokens, startIndex + 1, endIndex, eval);
                tokens.RemoveRange(startIndex, endIndex - startIndex + 1);
                tokens.Insert(startIndex, check.ToString());
                i = startIndex;
                // PrintTokens(tokens, begin, tokens.Count);
                end = tokens.Count;
            }
        }
        if (start.Count > 0)
        throw new ArgumentException("Invalid expression: parenthesis mismatch");
        PrintTokens(tokens, begin, end);

        return SecondCheck(tokens, begin, end);   
    }

    // 2. abs, sin, cos, tan, log, exp, sqrt
    private static float SecondCheck(List<string> tokens, int begin, int end)
    {
        // PrintTokens(tokens, begin, end);
        List<string> newTokens = new List<string>();
        for (int i = begin; i < end; i++)
        {
            if (tokens[i] is string)
            {
                float check = 0.0f;
                bool change = false;
                if (tokens[i] == "cos")
                {
                    check = (float)Math.Cos(Double.Parse(tokens[i+1]));
                    change = true; change = true;
                }
                else if (tokens[i] == "sin")
                {
                    check = (float)Math.Sin(Double.Parse(tokens[i+1]));
                    change = true;
                }
                else if (tokens[i] == "tan")
                {
                    check = (float)Math.Tan(Double.Parse(tokens[i+1]));
                    change = true;
                }
                else if (tokens[i] == "log")
                {
                    check = (float)Math.Log(Double.Parse(tokens[i+1]));
                    change = true;
                }
                else if (tokens[i] == "exp")
                {
                    check = (float)Math.Exp(Double.Parse(tokens[i+1]));
                    change = true;
                }
                else if (tokens[i] == "sqrt")
                {
                    check = (float)Math.Sqrt(Double.Parse(tokens[i+1]));
                    change = true;
                }
                else if (tokens[i] == "abs")
                {
                    check = (float)Math.Abs(Double.Parse(tokens[i+1]));
                    change = true;
                }
                
                if (change)
                {
                    i++;
                    newTokens.Add(check.ToString());
                }
                else
                {
                    newTokens.Add(tokens[i]);
                }
            }
            else {
                newTokens.Add(tokens[i]);
            }
        }

        return PowerCheck(newTokens, 0, newTokens.Count);
    }
    // 2.5 power
    private static float PowerCheck(List<string> tokens, int begin, int end)
    {
        // PrintTokens(tokens, begin, end);
        // Check first token
        List<string> newTokens = new List<string>();

        // Check the rest of the tokens
        for (int i = begin; i < end; i++)
        {
            if (tokens[i] == "^")
            {
                float res = (float)Math.Pow(Double.Parse(tokens[i-1]), Double.Parse(tokens[i+1]));
                newTokens.RemoveAt(newTokens.Count - 1);
                newTokens.Add(res.ToString());
                i++;
            }
            else
            {
                newTokens.Add(tokens[i]);
            }
        }

        return ThirdCheck(newTokens, 0, newTokens.Count);
    }

    // 3. *, /
    private static float ThirdCheck(List<string> tokens, int begin, int end)
    {
        // PrintTokens(tokens, begin, end);
        // Check first token
        float res = 0.0f;
        List<string> newTokens = new List<string>();

        // Check the rest of the tokens
        for (int i = begin; i < end; i++)
        {
            if (tokens[i] == "*")
            {
                i++;
                float right = float.Parse(tokens[i]);
                res = res * right;
            }
            else if (tokens[i] == "/")
            {
                i++;
                float right = float.Parse(tokens[i]);
                res = res / right;
            }
            // else if (tokens[begin] == "^")
            // {
            //     i++;
            //     Func<double, double> right = GetFunc(tokens[i]);
            //     res = (double x) => res(x) / right(x);
            // }
            else
            {
                if (tokens[i] == "-" || tokens[i] == "+" || tokens[i] == "^")
                {
                    newTokens.Add(res.ToString());
                    newTokens.Add(tokens[i]);
                    res = 0.0f;
                }
                else
                {
                    res = float.Parse(tokens[i]);
                }
            }
        }

        newTokens.Add(res.ToString());

        return FourthCheck(newTokens, 0, newTokens.Count);
    }

    // 4. + , -
    private static float FourthCheck(List<string> tokens, int begin, int end)
    {
        // PrintTokens(tokens, begin, end);
        // Check first token
        float res = 0.0f;

        for (int i = begin; i < end; i++)
        {
            if (tokens[i] == "+")
            {
                i++;
                float right = float.Parse(tokens[i]);
                res += right;
            }
            else if (tokens[i] == "-")
            {
                i++;
                float right = float.Parse(tokens[i]);
                res -= right;
            }
            else
            {
                res = float.Parse(tokens[i]);
            }
        }

        return res;
    }
}
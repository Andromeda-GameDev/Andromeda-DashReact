using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using UnityEngine;

public class Parser_V1 : MonoBehaviour
{
    public static Func<double, double> Parse(string function)
    {
        List<object> tokens = Tokenize(function);
        return FirstCheck(tokens, 0, tokens.Count);
    }

    private static List<object> Tokenize (string function)
    {
        List<object> tokens = new List<object>();
        string[] split = function.Split(' ');
        foreach (string token in split)
        {
            tokens.Add(token);
        }
        return tokens;
    }

    private static void PrintTokens (List<object> tokens, int begin, int end)
    {
        String res = "";
        for (int i = begin; i < end; i++)
        {
            if (tokens[i] is Func<double, double>)
            {
                res += " function ";
            }
            else if (tokens[i] is string)
            {
                res += tokens[i];
            }
        }
        Debug.Log(res);
    }

    // Auxiliar function to identify if object is entity, contant, or function
    private static Func<double, double> GetFunc (object token) 
    {
        Func<double, double> res = null;
        Regex regex = new Regex(@"^-?[0-9]*(\\.[0-9]+)?$");

        if (token is string)
        {
            // Check if it is identity
            if ((string)token == "x")
            {
                res = (double x) => x;
            }
            // Check if it is constant
            else if (regex.IsMatch((string)token))
            {
                double constant = Double.Parse((string)token);
                res = (double x) => constant;
            }
        }
        // Check if it is a function
        else
        {
            Func<double, double> func = token as Func<double, double>;
            res = func;
        }

        return res;
    }

    // THE PARSER WILL APPLY THE FOLLOWING RULES IN ORDER:
    // 1. Parenthesis
    // 2. abs, sin, cos, tan, log, exp, sqrt
    // 3. *, /
    // 4. +, -
    // 5. x or constants

    // 1. Parenthesis
    private static Func<double, double> FirstCheck(List<object> tokens, int begin, int end)
    {
        Stack<int> start = new Stack<int>();
        for (int i = begin; i < end; i++)
        {
            if (tokens[i] is string)
            {
                if ((string)tokens[i] == "(")
                {
                    start.Push(i);
                }
                else if ((string)tokens[i] == ")")
                {
                    int startIndex = start.Pop();
                    int endIndex = i;
                    PrintTokens(tokens, begin, tokens.Count);
                    Func<double, double> check = FirstCheck(tokens, startIndex + 1, endIndex);
                    tokens.RemoveRange(startIndex, endIndex - startIndex + 1);
                    tokens.Insert(startIndex, check);
                    i = startIndex;
                    PrintTokens(tokens, begin, tokens.Count);
                    end = tokens.Count;
                }
            }
        }
        if (start.Count > 0)
        throw new ArgumentException("Invalid expression: parenthesis mismatch");
        PrintTokens(tokens, begin, end);

        return SecondCheck(tokens, begin, end);   
    }

    // 2. abs, sin, cos, tan, log, exp, sqrt
    private static Func<double, double> SecondCheck(List<object> tokens, int begin, int end)
    {
        List<object> newTokens = new List<object>();
        for (int i = begin; i < end; i++)
        {
            if (tokens[i] is string)
            {
                Func<double, double> check = null;
                if ((string)tokens[i] == "cos")
                {
                    Func<double, double> innerFunc = tokens[i+1] as Func<double, double>;
                    check = (double x) => Math.Cos(innerFunc(x));
                    Debug.Log("cos");
                }
                else if ((string)tokens[i] == "sin")
                {
                    Func<double, double> innerFunc = tokens[i+1] as Func<double, double>;
                    check = (double x) => Math.Sin(innerFunc(x));
                    Debug.Log("sin");
                }
                else if ((string)tokens[i] == "tan")
                {
                    Func<double, double> innerFunc = tokens[i+1] as Func<double, double>;
                    check = (double x) => Math.Tan(innerFunc(x));
                    Debug.Log("tan");
                }
                else if ((string)tokens[i] == "log")
                {
                    Func<double, double> innerFunc = tokens[i+1] as Func<double, double>;
                    check = (double x) => Math.Log(innerFunc(x));
                    Debug.Log("log");
                }
                else if ((string)tokens[i] == "exp")
                {
                    Func<double, double> innerFunc = tokens[i+1] as Func<double, double>;
                    check = (double x) => Math.Exp(innerFunc(x));
                    Debug.Log("exp");
                }
                else if ((string)tokens[i] == "sqrt")
                {
                    Func<double, double> innerFunc = tokens[i+1] as Func<double, double>;
                    check = (double x) => Math.Sqrt(innerFunc(x));
                    Debug.Log("sqrt");
                }
                else if ((string)tokens[i] == "abs")
                {
                    Func<double, double> innerFunc = tokens[i+1] as Func<double, double>;
                    check = (double x) => Math.Abs(innerFunc(x));
                    Debug.Log("abs");
                }
                
                if (check == null)
                {
                    newTokens.Add(tokens[i]);
                }
                else
                {
                    i++;
                    newTokens.Add(check);
                }
            }
            else {
                newTokens.Add(tokens[i]);
            }
        }

        Debug.Log("Second check");
        PrintTokens(newTokens, 0, newTokens.Count);

        return ThirdCheck(newTokens, 0, newTokens.Count);
    }
    // 2.5 power
    private static Func<double, double> PowerCheck(List<object> tokens, int begin, int end)
    {
        // Check first token
        Func<double, double> res = null;
        List<object> newTokens = new List<object>();

        // Check the rest of the tokens
        for (int i = begin+1; i < end; i++)
        {
            if (tokens[begin] is string && (string)tokens[begin] == "^")
            {
                i++;
                Func<double, double> right = GetFunc(tokens[i]);
                res = (double x) => Math.Pow(res(x), right(x));
                newTokens.Add(res);
            }
            // else if (tokens[begin] is string && (string)tokens[begin] == "^")
            // {
            //     i++;
            //     Func<double, double> right = GetFunc(tokens[i]);
            //     res = (double x) => res(x) / right(x);
            // }
            else
            {
                newTokens.Add(tokens[i]);
            }
        }

        return ThirdCheck(newTokens, 0, newTokens.Count);
    }

    // 3. *, /
    private static Func<double, double> ThirdCheck(List<object> tokens, int begin, int end)
    {
        // Check first token
        Func<double, double> res = null;
        List<object> newTokens = new List<object>();
        List<Func<double, double>> lambdas = new List<Func<double, double>>();

        // Check the rest of the tokens
        for (int i = begin; i < end; i++)
        {
            if (tokens[i] is string && (string)tokens[i] == "*")
            {
                i++;
                Func<double, double> right = GetFunc(tokens[i]);
                Debug.Log("Check function " + res(2.0f));
                Debug.Log("Check function " + right(2.0f));
                res = (double x) => lambdas[lambdas.Count - 1](x) * right(x);
                Debug.Log("Check function " + res(2.0f));
                Debug.Log("Multiplying");
            }
            else if (tokens[i] is string && (string)tokens[i] == "/")
            {
                i++;
                Func<double, double> right = GetFunc(tokens[i]);
                Debug.Log("Check function " + res(2.0f));
                Debug.Log("Check function " + right(2.0f));
                res = (double x) => lambdas[lambdas.Count - 1](x) / right(x);
                Debug.Log("Check function " + res(2.0f));
                Debug.Log("Dividing");
            }
            // else if (tokens[begin] is string && (string)tokens[begin] == "^")
            // {
            //     i++;
            //     Func<double, double> right = GetFunc(tokens[i]);
            //     res = (double x) => res(x) / right(x);
            // }
            else
            {
                if (res != null)
                {
                    newTokens.Add(res);
                    newTokens.Add(tokens[i]);
                    res = null;
                }
                else
                {
                    res = GetFunc(tokens[i]);
                    lambdas.Add(res);
                }
            }
        }

        newTokens.Add(res);

        Debug.Log("Third Check");
        PrintTokens(newTokens, 0, newTokens.Count);

        return FourthCheck(newTokens, 0, newTokens.Count);
    }

    // 4. + , -
    private static Func<double, double> FourthCheck(List<object> tokens, int begin, int end)
    {
        // Check first token
        Func<double, double> res = null;
        List<Func<double, double>> lambdas = new List<Func<double, double>>();

        for (int i = begin; i < end; i++)
        {
            if (tokens[i] is string && (string)tokens[i] == "+")
            {
                i++;
                Func<double, double> right = GetFunc(tokens[i]);
                Debug.Log("Check function " + res(2.0f));
                Debug.Log("Check function " + right(2.0f));
                res = (double x) => lambdas[lambdas.Count - 1](x) + right(x);
                Debug.Log("Check function " + res(2.0f));
                lambdas.Add(res);
            }
            else if (tokens[i] is string && (string)tokens[i] == "-")
            {
                i++;
                Func<double, double> right = GetFunc(tokens[i]);
                Debug.Log("Check function " + res(2.0f));
                Debug.Log("Check function " + right(2.0f));
                res = (double x) => lambdas[lambdas.Count - 1](x) - right(x);
                Debug.Log("Check function " + res(2.0f));
                lambdas.Add(res);
            }
            else
            {
                res = GetFunc(tokens[i]);
                lambdas.Add(res);
            }
        }
        Debug.Log("Fourth Check");
        PrintTokens(tokens, begin, end);

        return res;
    }
}
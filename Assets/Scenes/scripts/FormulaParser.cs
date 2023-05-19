// Class name: FormulaParser
// Date created: 11/04/2017
/*
 * This class is used to parse the formula entered by the user.
 * It will be used to create a mesh based on the formula.
*/

using System;
using System.Collections.Generic;

class FunctionParser
{
    // Fundamental operations for parsing
    static Func<double, double, double> add = (x,y) => x + y;
    static Func<double, double, double> subtract = (x,y) => x - y;
    static Func<double, double, double> multiply = (x,y) => x * y;
    static Func<double, double, double> divide = (x,y) => x / y;
    static Func<double, double, double> pow = (x,n) => Math.Pow(x,n);
    static Func<double, double, double> log = (x,n) => Math.Log(x,n);
    static Func<double, double> exp = (x) => Math.Exp(x);
    
    // Trigonometric functions
    static Func<double, double> sin = (x) => Math.Sin(x);
    static Func<double, double> cos = (x) => Math.Cos(x);
    static Func<double, double> tan = (x) => Math.Tan(x);
    
    // Inverse trigonometric functions
    static Func<double, double> asin = (x) => Math.Asin(x);
    static Func<double, double> acos = (x) => Math.Acos(x);
    static Func<double, double> atan = (x) => Math.Atan(x);
    
    // Hyperbolic functions
    static Func<double, double> sinh = (x) => Math.Sinh(x);
    static Func<double, double> cosh = (x) => Math.Cosh(x);
    static Func<double, double> tanh = (x) => Math.Tanh(x);
    private static readonly Dictionary<string, Func<double, double>> functions = new Dictionary<string, Func<double, double>>
    {
        {"sin", sin},
        {"cos", cos},
        {"tan", tan},
        {"asin", asin},
        {"acos", acos},
        {"atan", atan},
        {"sinh", sinh},
        {"cosh", cosh},
        {"tanh", tanh},
        {"exp", exp},
    };

    private static readonly Dictionary<string, Func<double, double, double>> operators = new Dictionary<string, Func<double, double, double>>
    {
        {"^", pow},
        {"*", multiply},
        {"/", divide},
        {"+", add},
        {"-", subtract},
    };

    public static Func<double, double> Parse(string expression)
    {
        List<string> tokens = Tokenize(expression);
        Queue<string> outputQueue = new Queue<string>();
        Stack<string> operatorStack = new Stack<string>();

        foreach (string token in tokens)
        {
            if (double.TryParse(token, out _))
            {
                outputQueue.Enqueue(token);
            }
            else if (functions.ContainsKey(token))
            {
                operatorStack.Push(token);
            }
            else if (operators.ContainsKey(token))
            {
                while (operatorStack.Count > 0 && operators.ContainsKey(operatorStack.Peek()) &&
                       operators[token].Precedence() <= operators[operatorStack.Peek()].Precedence())
                {
                    outputQueue.Enqueue(operatorStack.Pop());
                }

                operatorStack.Push(token);
            }
            else if (token == "(")
            {
                operatorStack.Push(token);
            }
            else if (token == ")")
            {
                while (operatorStack.Count > 0 && operatorStack.Peek() != "(")
                {
                    outputQueue.Enqueue(operatorStack.Pop());
                }

                if (operatorStack.Count > 0 && operatorStack.Peek() == "(")
                {
                    operatorStack.Pop(); // Discard the opening parenthesis
                }
                else
                {
                    throw new ArgumentException("Mismatched parentheses in expression.");
                }
            }
        }

        while (operatorStack.Count > 0)
        {
            string op = operatorStack.Pop();
            if (op == "(" || op == ")")
            {
                throw new ArgumentException("Mismatched parentheses in expression.");
            }

            outputQueue.Enqueue(op);
        }

        Stack<Func<double, double>> evalStack = new Stack<Func<double, double>>();

        while (outputQueue.Count > 0)
        {
            string token = outputQueue.Dequeue();

            if (double.TryParse(token, out double constant))
            {
                evalStack.Push((x) => constant);
            }
            else if (functions.ContainsKey(token))
            {
                Func<double, double> arg = evalStack.Pop();
                evalStack.Push((x) => functions[token](arg(x)));
            }
            else if (operators.ContainsKey(token))
            {
                Func<double, double> right = evalStack.Pop();
                Func<double, double> left = evalStack.Pop();
                evalStack.Push((x) => operators[token](left(x), right(x)));
            }
        }

        if (evalStack.Count != 1)
        {
            throw new ArgumentException("Invalid expression.");
        }

        return evalStack.Pop();
    }

    private static List<string> Tokenize(string expression)
    {
        List<string> tokens = new List<string>();
        string currentToken = string.Empty;

        for (int i = 0; i < expression.Length; i++)
        {
            char c = expression[i];

            if (char.IsWhiteSpace(c))
            {
                continue;
            }
            else if (char.IsDigit(c) || c == '.')
            {
                currentToken += c;

                if (i == expression.Length - 1)
                {
                    tokens.Add(currentToken);
                }
            }
            else if (char.IsLetter(c))
            {
                if (currentToken.Length > 0 && (char.IsDigit(currentToken[0]) || currentToken[0] == '.'))
                {
                    throw new ArgumentException("Invalid function or constant name in expression.");
                }

                currentToken += c;

                if (i == expression.Length - 1)
                {
                    tokens.Add(currentToken);
                }
            }
            else if (operators.ContainsKey(c.ToString()))
            {
                if (currentToken.Length > 0)
                {
                    tokens.Add(currentToken);
                    currentToken = string.Empty;
                }

                tokens.Add(c.ToString());
            }
            else if (c == '(' || c == ')')
            {
                if (currentToken.Length > 0)
                {
                    tokens.Add(currentToken);
                    currentToken = string.Empty;
                }

                tokens.Add(c.ToString());
            }
            else
            {
                throw new ArgumentException("Invalid character in expression.");
            }
        }

        return tokens;
    }
}

public static class FunctionExtensions
{
    // Fundamental operations for parsing
    static Func<double, double, double> add = (x,y) => x + y;
    static Func<double, double, double> subtract = (x,y) => x - y;
    static Func<double, double, double> multiply = (x,y) => x * y;
    static Func<double, double, double> divide = (x,y) => x / y;
    static Func<double, double, double> pow = (x,n) => Math.Pow(x,n);
    static Func<double, double, double> log = (x,n) => Math.Log(x,n);
    static Func<double, double> exp = (x) => Math.Exp(x);
    
    // Trigonometric functions
    static Func<double, double> sin = (x) => Math.Sin(x);
    static Func<double, double> cos = (x) => Math.Cos(x);
    static Func<double, double> tan = (x) => Math.Tan(x);
    
    // Inverse trigonometric functions
    static Func<double, double> asin = (x) => Math.Asin(x);
    static Func<double, double> acos = (x) => Math.Acos(x);
    static Func<double, double> atan = (x) => Math.Atan(x);
    
    // Hyperbolic functions
    static Func<double, double> sinh = (x) => Math.Sinh(x);
    static Func<double, double> cosh = (x) => Math.Cosh(x);
    static Func<double, double> tanh = (x) => Math.Tanh(x);
    public static int Precedence(this Func<double, double, double> op)
    {
        if (op == pow)
        {
            return 3;
        }
        else if (op == multiply || op == divide)
        {
            return 2;
        }
        else if (op == add || op == subtract)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
}
// Class name: FormulaParser
// Date created: 11/04/2017
/*
 * This class is used to parse the formula entered by the user.
 * It will be used to create a mesh based on the formula.
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using UnityEngine;

public class FormulaParser
{
    private Dictionary<string, Func<Expression, Expression, BinaryExpression>> binaryOperators;
    private Dictionary<string, Func<Expression, MethodCallExpression>> unaryFunctions;

    public FormulaParser()
    {
        InitializeBinaryOperators();
        InitializeUnaryFunctions();
    }

    public Func<double, double> Parse(string formula)
    {
        var parameter = Expression.Parameter(typeof(double), "x");
        var expression = ParseExpression(formula, parameter);
        var lambda = Expression.Lambda<Func<double, double>>(expression, parameter);
        return lambda.Compile();
    }

    private Expression ParseExpression(string formula, ParameterExpression parameter)
    {
        var tokens = Tokenize(formula);
        
        Debug.Log("Tokens:");
        foreach (var token in tokens)
        {
            Debug.Log(token);
        }

        var queue = new Queue<string>(tokens);
        var expression = ParseTerm(queue, parameter);

        while (queue.Any())
        {
            var op = queue.Peek();

            if (binaryOperators.ContainsKey(op))
            {
                queue.Dequeue();
                var right = ParseTerm(queue, parameter);
                expression = binaryOperators[op](expression, right);
            }
            else
            {
                throw new Exception("Invalid formula. Unexpected operator: " + op);
            }
        }

        return expression;
    }

    private Expression ParseTerm(Queue<string> tokens, ParameterExpression parameter)
    {
        var left = ParseFactor(tokens, parameter);

        while (tokens.Any() && tokens.Peek() == "*")
        {
            tokens.Dequeue();
            var right = ParseFactor(tokens, parameter);
            left = Expression.Multiply(left, right);
        }

        return left;
    }

    private Expression ParseFactor(Queue<string> tokens, ParameterExpression parameter)
    {
        var token = tokens.Dequeue();

        if (double.TryParse(token, out double number))
        {
            return Expression.Constant(number);
        }
        else if (unaryFunctions.ContainsKey(token))
        {
            if (tokens.Count == 0 || tokens.Peek() != "(")
            {
                throw new Exception("Invalid formula. Expected opening parenthesis.");
            }

            tokens.Dequeue();
            var argument = ParseExpression(tokens, parameter);
            var function = unaryFunctions[token](argument);

            if (tokens.Count == 0 || tokens.Dequeue() != ")")
            {
                throw new Exception("Invalid formula. Expected closing parenthesis.");
            }

            return function;
        }
        else if (token == "(")
        {
            var expression = ParseExpression(tokens, parameter);

            if (tokens.Count == 0 || tokens.Dequeue() != ")")
            {
                throw new Exception("Invalid formula. Expected closing parenthesis.");
            }

            return expression;
        }
        else
        {
            throw new Exception("Invalid formula. Unexpected token: " + token);
        }
    }

    private Expression ParseExpression(Queue<string> tokens, ParameterExpression parameter)
    {
        throw new NotImplementedException();
    }


    // private Expression ParseFactor(Queue<string> tokens, ParameterExpression parameter)
    // {
    //     var token = tokens.Dequeue();

    //     if (double.TryParse(token, out double number))
    //     {
    //         return Expression.Constant(number);
    //     }
    //     else if (unaryFunctions.ContainsKey(token))
    //     {
    //         if (tokens.Dequeue() != "(")
    //         {
    //             throw new Exception("Invalid formula. Expected opening parenthesis.");
    //         }

    //         var argument = ParseExpression(tokens, parameter);
    //         var function = unaryFunctions[token](argument);

    //         if (tokens.Dequeue() != ")")
    //         {
    //             throw new Exception("Invalid formula. Expected closing parenthesis.");
    //         }

    //         return function;
    //     }
    //     else if (token == "(")
    //     {
    //         var expression = ParseExpression(tokens, parameter);

    //         if (tokens.Dequeue() != ")")
    //         {
    //             throw new Exception("Invalid formula. Expected closing parenthesis.");
    //         }

    //         return expression;
    //     }
    //     else
    //     {
    //         throw new Exception("Invalid formula. Unexpected token: " + token);
    //     }
    // }

    // private Expression ParseExpression(Queue<string> tokens, ParameterExpression parameter)
    // {
    //     throw new NotImplementedException();
    // }

    // private string[] Tokenize(string formula)
    // {
    //     var separators = new[] { "+", "-", "*", "/", "(", ")" };
    //     var tokens = formula.Split(separators, StringSplitOptions.RemoveEmptyEntries)
    //                        .Select(token => token.Trim())
    //                        .ToArray();
    //     var operators = separators.Where(op => !string.IsNullOrWhiteSpace(op))
    //                               .Select(op => op.Trim())
    //                               .ToArray();
    //     var mergedTokens = new List<string>();

    //     foreach (var token in tokens)
    //     {
    //         if (mergedTokens.Any() && !operators.Contains(mergedTokens.Last()))
    //         {
    //             mergedTokens[mergedTokens.Count - 1] += token;
    //         }
    //         else
    //         {
    //             mergedTokens.Add(token);
    //         }
    //     }

    //     return mergedTokens.ToArray();
    // }

    private void InitializeBinaryOperators()
    {
        binaryOperators = new Dictionary<string, Func<Expression, Expression, BinaryExpression>>
        {
            { "+", Expression.Add },
            { "-", Expression.Subtract },
            { "*", Expression.Multiply },
            { "/", Expression.Divide },
            { "^", Expression.Power }
        };
    }

    private void InitializeUnaryFunctions()
    {
        unaryFunctions = new Dictionary<string, Func<Expression, MethodCallExpression>>
        {
            { "sin", arg => Expression.Call(typeof(Math), "Sin", null, arg) },
            { "cos", arg => Expression.Call(typeof(Math), "Cos", null, arg) },
            { "tan", arg => Expression.Call(typeof(Math), "Tan", null, arg) },
            { "exp", arg => Expression.Call(typeof(Math), "Exp", null, arg) },
            { "log", arg => Expression.Call(typeof(Math), "Log", null, arg) }
        };
    }

    private string[] Tokenize(string formula)
    {
        var separators = new[] { " " };
        var tokens = formula.Split(separators, StringSplitOptions.RemoveEmptyEntries)
                        .Select(token => token.Trim())
                        .ToArray();
        return tokens;
        // var operators = separators.Where(op => !string.IsNullOrWhiteSpace(op))
        //                         .Select(op => op.Trim())
        //                         .ToArray();
        // var mergedTokens = new List<string>();

        // foreach (var token in tokens)
        // {
        //     if (mergedTokens.Any() && !operators.Contains(mergedTokens.Last()))
        //     {
        //         mergedTokens[mergedTokens.Count - 1] += token;
        //     }
        //     else
        //     {
        //         mergedTokens.Add(token);
        //     }
        // }

        // var spacedTokens = new List<string>();
        // foreach (var token in mergedTokens)
        // {
        //     var subTokens = SeparateFunctions(token);
        //     spacedTokens.AddRange(subTokens);
        // }

        // return spacedTokens.ToArray();
    }

    private List<string> SeparateFunctions(string token)
    {
        var functions = new[] { "sin", "cos", "tan", "exp", "log" };
        var separatedTokens = new List<string>();

        var currentToken = string.Empty;
        var i = 0;

        while (i < token.Length)
        {
            if (i < token.Length - 2 && functions.Contains(token.Substring(i, 3)))
            {
                if (!string.IsNullOrWhiteSpace(currentToken))
                {
                    separatedTokens.Add(currentToken.Trim());
                    currentToken = string.Empty;
                }
                separatedTokens.Add(token.Substring(i, 3));
                i += 3;
            }
            else
            {
                currentToken += token[i];
                i++;
            }
        }

        if (!string.IsNullOrWhiteSpace(currentToken))
        {
            separatedTokens.Add(currentToken.Trim());
        }

        return separatedTokens;
    }

}
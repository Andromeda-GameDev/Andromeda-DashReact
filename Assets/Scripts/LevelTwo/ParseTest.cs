using System;
using System.Text.RegularExpressions;

public class ParseTest
{
    private static readonly Regex regex = new Regex(@"^(?<term>[^()]+)|(?<function>\w+)(\((?<formula>.*?)\))$");

    public double Parse(string formula)
    {
        // Create a parse tree for the formula.
        Match match = regex.Match(formula);
        ParseTree tree = new ParseTree(match);

        // Evaluate the parse tree.
        return tree.Evaluate();
    }
}

public class ParseTree
{
    private readonly string formula;
    private readonly ParseTree left;
    private readonly ParseTree right;
    private readonly string function;

    public ParseTree(Match match)
    {
        formula = match.Value;

        if (match.Groups["term"].Success)
        {
            left = null;
            right = null;
            function = null;
        }
        else
        {
            left = new ParseTree(match.Groups["formula"].Value);
            right = new ParseTree(match.Groups["formula"].Value);
            function = match.Groups["function"].Value;
        }
    }

    public ParseTree(string value)
    {
        Value = value;
    }

    public string Value { get; }

    public double Evaluate()
    {
        if (left == null)
        {
            // The parse tree is a variable.
            return double.Parse(formula);
        }
        else if (function == null)
        {
            // The parse tree is a constant.
            return double.Parse(formula);
        }
        else
        {
            // The parse tree is a function call.
            switch (function)
            {
                case "sin":
                    return Math.Sin(left.Evaluate());
                case "cos":
                    return Math.Cos(left.Evaluate());
                case "tan":
                    return Math.Tan(left.Evaluate());
                default:
                    throw new ArgumentException("Invalid function name: " + function);
            }
        }
    }
}

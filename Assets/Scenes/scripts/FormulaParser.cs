// Class name: FormulaParser
// Date created: 11/04/2017
/*
 * This class is used to parse the formula entered by the user.
 * It will be used to create a mesh based on the formula.
*/

using System;

public class FormulaParser {
    // Fundamental operations for parsing
    static Func<double, double, double> add = (x,y) => x + y;
    static Func<double, double, double> subtract = (x,y) => x - y;
    static Func<double, double, double> multiply = (x,y) => x * y;
    static Func<double, double, double> divide = (x,y) => x / y;
    static Func<double, double, double> pow = (x,n) => Math.Pow(x,n);
    static Func<double, double, double> log = (x,n) => Math.Log(x,n);

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

    // Parser
    public static double ParseExpression(string expression)
    {
        // Remove whitespace from the expression
        expression = expression.Replace(" ", "");

        // Evaluate the expression recursively
        return Evaluate(expression);
    }

    private static double Evaluate(string expression)
    {
        // Base case: if the expression is a number, parse and return it
        if (double.TryParse(expression, out double number))
            return number;

        // Look for the operators in the expression and split it into left and right operands
        int operatorIndex = FindLowestPrecedenceOperator(expression);
        string leftOperand = expression.Substring(0, operatorIndex);
        string rightOperand = expression.Substring(operatorIndex + 1);

        // Parse and evaluate the operands
        double leftValue = Evaluate(leftOperand);
        double rightValue = Evaluate(rightOperand);

        // Apply the operator and return the result
        char @operator = expression[operatorIndex];
        return ApplyOperator(@operator, leftValue, rightValue);
    }

    private static int FindLowestPrecedenceOperator(string expression)
    {
        int lowestPrecedence = int.MaxValue;
        int operatorIndex = -1;
        int parenthesesCount = 0;

        for (int i = 0; i < expression.Length; i++)
        {
            char currentChar = expression[i];

            if (currentChar == '(')
                parenthesesCount++;
            else if (currentChar == ')')
                parenthesesCount--;
            else if (parenthesesCount == 0)
            {
                int precedence = GetOperatorPrecedence(currentChar);
                if (precedence <= lowestPrecedence)
                {
                    lowestPrecedence = precedence;
                    operatorIndex = i;
                }
            }
        }

        if (parenthesesCount != 0)
            throw new ArgumentException("Invalid expression: unbalanced parentheses.");

        return operatorIndex;
    }

    private static int GetOperatorPrecedence(char @operator)
    {
        switch (@operator)
        {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
            default:
                return 4;
        }
    }

    private static double ApplyOperator(char @operator, double leftValue, double rightValue)
    {
        switch (@operator)
        {
            case '+':
                return add(leftValue, rightValue);
            case '-':
                return subtract(leftValue, rightValue);
            case '*':
                return multiply(leftValue, rightValue);
            case '/':
                return divide(leftValue, rightValue);
            case '^':
                return pow(leftValue, rightValue);
            default:
                throw new ArgumentException("Invalid operator.");
        }
    }


}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CalculatorApp.Repositories
{
    public class CalculatorRepository
    {
        public double Add(double operand1, double operand2)
        {
            return operand1 + operand2;
        }

        public double Subtract(double operand1, double operand2)
        {
            return operand1 - operand2;
        }

        public double Multiply(double operand1, double operand2)
        {
            return operand1 * operand2;
        }
        public double Divide(double operand1, double operand2)
        {
            if (operand2 == 0)
            {
                throw new DivideByZeroException("Division by zero is not allowed.");
            }

            return operand1 / operand2;
        }
        public double EvaluateExpression(string expression)
        {
            // Remove any whitespace from the expression
            expression = expression.Replace(" ", "");

            // Split the expression into parts using the operator as the delimiter
            char[] operators = { '+', '-', '*', '/' };
            int operatorIndex = expression.LastIndexOfAny(operators);

            // Handle the case of negative numbers
            bool isNegative = false;
            if (operatorIndex == 0 && expression[0] == '-')
            {
                isNegative = true;
                expression = expression.Substring(1);
                operatorIndex = expression.LastIndexOfAny(operators);
            }
            if (operatorIndex == -1)
            {
                // No operator found, parse the whole expression as a single number
                double number;
                if (double.TryParse(expression, out number))
                {
                    return isNegative ? -number : number;
                }
                else
                {
                    throw new ArgumentException("Invalid expression format.");
                }
            }
            else
            {
                // Extract the operands and operator from the expression
                string operand1String = expression.Substring(0, operatorIndex);
                string operand2String = expression.Substring(operatorIndex + 1);
                char @operator = expression[operatorIndex];

                // Parse the operands
                double operand1, operand2;
                if (!double.TryParse(operand1String, out operand1) || !double.TryParse(operand2String, out operand2))
                {
                    throw new ArgumentException("Invalid expression format.");
                }
                // Perform the calculation based on the operator
                double result;
                switch (@operator)
                {
                    case '+':
                        result = Add(operand1, operand2);
                        break;
                    case '-':
                        result = Subtract(operand1, operand2);
                        break;
                    case '*':
                        result = Multiply(operand1, operand2);
                        break;
                    case '/':
                        result = Divide(operand1, operand2);
                        break;
                    default:
                        throw new ArgumentException("Invalid operator.");
                }

                return isNegative ? -result : result;
            }
        }
    }
}
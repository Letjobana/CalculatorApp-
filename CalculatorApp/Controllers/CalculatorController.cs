using CalculatorApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CalculatorApp.Controllers
{
    public class CalculatorController : Controller
    {
        private CalculatorRepository calculator;

        public CalculatorController()
        {
            calculator = new CalculatorRepository();
        }

        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Calculate(string expression)
        {
            try
            {
                double result = calculator.EvaluateExpression(expression);
                return Json(new { success = true, result = result });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message });
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RuleEngine.Models;

namespace RulesEngine.WebApp.Controllers
{
    public class RulesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create([FromBody] RuleViewModel viewModel)
        {
            return Ok();
        }

        [HttpPost]
        public string Test([FromBody] TestRuleViewModel viewModel)
        {
            var rule = viewModel.Rule.CreateRule();
            var context = viewModel.Context.CreateContext();

            return JsonConvert.SerializeObject(new { result = rule.Evaluate(context) });
        }
    }
}
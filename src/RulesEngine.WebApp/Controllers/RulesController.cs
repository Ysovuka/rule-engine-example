using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
            var rule = viewModel.CreateRule();

            return Ok();
        }
    }
}
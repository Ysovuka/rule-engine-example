import * as ko from "knockout"

import * as RuleEngine from "./rules-engine/RuleEngine";
import * as RuleEngineKnockout from "./rules-engine/knockout/RuleEngine";

let viewModel: RuleEngineKnockout.RuleViewModel = new RuleEngineKnockout.RuleViewModel();
let ruleContextViewModel: RuleEngineKnockout.RuleContextViewModel = new RuleEngineKnockout.RuleContextViewModel();

$(document).ready(() => {
    $('#clearRule').click(function () {
        viewModel.Name("");
        viewModel.Elements.removeAll();
    });

    $('#testRule').click(function () {
        $('#createRuleModal').modal('toggle');
        $('#testRuleModal').modal('toggle');

        let count: number = viewModel.Elements().length;
        let vars: Array<string> = new Array<string>();
        for (let i: number = 0; i < count; i++) {
            let e: RuleEngineKnockout.RuleElementViewModel = viewModel.Elements()[i];
            let contextVarCount: number = ruleContextViewModel.Elements().length;
            let contains: boolean = false;
            for (let j: number = 0; j < contextVarCount; j++) {
                if (ruleContextViewModel.Elements()[j].Name() == e.Name() || e.Name() == "") {
                    contains = true;
                    break;
                }
            }

            if (contains) continue;

            let element: RuleEngineKnockout.RuleElementViewModel = new RuleEngineKnockout.RuleElementViewModel();
            element.Name(e.Name());

            ruleContextViewModel.Elements.push(element);
        }
    })

    $('#backRule').click(function () {
        $('#testRuleModal').modal('toggle');
        $('#createRuleModal').modal('toggle');
    })

    $('#testRuleContext').click(function () {
        $('#saveRule').prop('disabled', true);
        $('#testResultAlert').hide();

        let rule: RuleEngine.Rule = viewModel.CreateRule();
        let ruleContext: RuleEngine.RuleContext = ruleContextViewModel.CreateContext();
        ruleContext.Name = rule.Name + "Context";

        let result: string = "";
        try {
            result = <string>rule.Evaluate(ruleContext).Value;
        }
        catch (e) {
            result = e;
        }
        $('#testResult').text(result);

        $('#testResultAlert').removeClass('hide');
        $('#testResultAlert').show();

        $('#saveRule').removeClass('disabled');
        $('#saveRule').prop('disabled', false);

    });

    $('#saveRule').click(() => {
        let ruleViewModel: { name: string, elements: Array<{ name: string, value: string, condition: string, type: string, operator: string }> } = {
            name: "",
            elements: new Array<{ name: string, value: string, condition: string, type: string, operator: string }>()
        };
        ruleViewModel.name = viewModel.Name();

        let count: number = viewModel.Elements().length;
        for (let i: number = 0; i < count; i++) {
            let element: { name: string, value: string, type: string, condition: string, operator: string }
                = {
                    name: viewModel.Elements()[i].Name(),
                    value: viewModel.Elements()[i].Value(),
                    type: viewModel.Elements()[i].Type(),
                    condition: viewModel.Elements()[i].Condition(),
                    operator: viewModel.Elements()[i].Operator(),
                };
            ruleViewModel.elements.push(element);
        }

        let data: string = JSON.stringify(ruleViewModel);

        $.ajax({
            url: 'Rules/Create',
            method: 'POST',
            contentType: 'application/json',
            data: data,

            success: function (json) {
                $('#testRuleModal').modal('toggle');
            },
        })
    });
});

ko.applyBindings(viewModel, $('#createRuleModal')[0]);
ko.applyBindings(ruleContextViewModel, $('#testRuleModal')[0]);
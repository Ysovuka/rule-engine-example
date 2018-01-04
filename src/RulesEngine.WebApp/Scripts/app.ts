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
        $('#alertArea').empty();
        $('#alertArea').html('<div id="testResultAlert" class="alert alert-info" role="alert">\
            <label> Test Results: <span id="testResult"> </span></label> | \
            <label> Server-side Result: <span id="serverResult" > </span></label>\
            <button type="button" class="close" data- dismiss="alert" aria- label="Close">\
               <span aria- hidden="true" >&times;</span>\
            </button>\
        </div>');

        $('#saveRule').prop('disabled', true);

        let data: string = JSON.stringify(
            {
                rule: viewModel.CreateDataTransferObject(),
                context: ruleContextViewModel.CreateDataTransferObject(),
            });

        $.ajax({
            url: 'Rules/Test',
            method: 'POST',
            contentType: 'application/json',
            data: data,

            success: function (json) {
                $('#serverResult').text(JSON.parse(json).result.Value);
            },
        })

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

        $('#saveRule').removeClass('disabled');
        $('#saveRule').prop('disabled', false);

    });

    $('#saveRule').click(() => {
        let data: string = JSON.stringify(viewModel.CreateDataTransferObject());

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
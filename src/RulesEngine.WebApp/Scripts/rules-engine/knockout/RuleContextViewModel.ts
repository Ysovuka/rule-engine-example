import { RuleElementViewModel } from "./RuleElementViewModel"
import { RuleContext } from "../RuleContext"

import * as ko from "knockout"

export class RuleContextViewModel {
    constructor() {
        this.Name = ko.observable("Test");
        this.Elements = ko.observableArray<RuleElementViewModel>();
    }
    public Name: KnockoutObservable<string>;
    public Elements: KnockoutObservableArray<RuleElementViewModel>;

    public CreateContext(): RuleContext {
        let context: RuleContext = new RuleContext(this.Name());

        let count: number = this.Elements().length;
        for (let i: number = 0; i < count; i++) {
            let e: RuleElementViewModel = this.Elements()[i];
            context.AddVariable(e.Name(), e.Value());
        }

        return context;
    }

    public AddElement(): void {
        this.Elements.push(new RuleElementViewModel());
    }

    public RemoveElement(data: RuleElementViewModel): void {
        this.Elements.remove(data);
    }

    public CreateDataTransferObject(): { name: string, elements: Array<{ name: string, value: string, type: string, condition: string, operator: string }> } {
        let e: { name: string, elements: Array<{ name: string, value: string, type: string, condition: string, operator: string }> } =
            {
                name: this.Name(),
                elements: new Array<{ name: string, value: string, type: string, condition: string, operator: string }>()
            };

        let count: number = this.Elements().length;
        for (let i: number = 0; i < count; i++) {
            e.elements.push(this.Elements()[i].CreateDataTransferObject());
        }

        return e;
    }
}
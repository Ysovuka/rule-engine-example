// https://www.stevefenton.co.uk/2013/04/obtaining-a-class-name-at-runtime-in-typescript/
export class Describer {
    static Describe(inputClass: any) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(inputClass.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
}
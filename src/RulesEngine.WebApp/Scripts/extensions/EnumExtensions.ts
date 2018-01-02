import { KeyValuePair } from "../key-value-pair/KeyValuePair"

export class EnumExtensions {
    public static GetNamesAndValues<TEnum>(e: TEnum): Array<KeyValuePair<string, string>> {
        let results: Array<KeyValuePair<string, string>> = new Array<KeyValuePair<string, string>>();
        for (var item in e) {
            if (e.hasOwnProperty(item)) {
                results.push(new KeyValuePair<string, string>(item, e[item.valueOf()]));
            }
        }

        return results;
    }
}
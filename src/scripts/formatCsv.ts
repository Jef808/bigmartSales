// Takes a raw string containing csv data (the first line
// of which being the column headers) and formats it
// into an object { header: string[], body: string[][] }.
export function formatCsvData(csvString: string, nbRows?: number) {

    if (csvString.length === 0) {
        return { header: [] as string[], body: [] as string[][] };
    }

    const _result = csvString.split("\n").slice(0, (nbRows || Infinity));
    const header = formatCsvHeader(_result[0]);
    const body = _result.slice(1).map((row) => formatCsvRow(row));

    return { header, body };
}

// Split along commas and replace "_"'s with " "'s.
function formatCsvHeader(csvHeader: string) {
    return csvHeader.split(",").map((h) => h.trim().split("_").join(" "));
}

// Split along commas and parse into an integer, float
// or string according to the record type.
function formatCsvRow(row: string) {
    return row.split(",").map((rec, idx) => {
        switch (idx) {
            case 1:
            case 3:
            case 5:
            case 11:
                return parseFloat(rec);
            case 7:
                return parseInt(rec);
            case 0:
            case 2:
            case 4:
            case 6:
            case 8:
            case 9:
            case 10:
                return (rec.length > 0 ? rec : "N/A");
            default:
                throw new Error(`formatCsv:Too many records in row ${idx}`);
        }
    });
}

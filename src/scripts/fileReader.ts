export function readFile(filename: string) {

    console.log("fileReaderStore:Fetching:", filename);
    return fetch(filename)
        .then((response) => response.text())
        .then((body) => {
            console.log(`fileReaderStore:Ok, fetched ${body.length} UTF-8 encoded characters, for ${body?.match(/\n/g).length} lines.`);
            return body;
        });
}

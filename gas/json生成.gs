function doGet(e) {
  const callback = e.parameter.callback || "callback";

  const cache = CacheService.getScriptCache();
  const cachedData = cache.get('news_json_data');

  let jsonResponse;

  if (cachedData !== null) {
    jsonResponse = cachedData;
  } else {
    const ss = SpreadsheetApp.openById("1Hscu23BU8e5c1SEmuOqHBL_bPQ3tRKcqHYYPznI3I0M");
    const sheet = ss.getSheetByName("活動報告ニュースCMS");

    const lastRow = sheet.getLastRow();
    const data = sheet.getRange(2, 1, lastRow - 1, 12).getValues();

    const items = [];

    data.forEach(row => {
      if (row[10] !== "公開") return;

      items.push({
        id: row[11],
        title: row[2],
        date: Utilities.formatDate(row[3], "Asia/Tokyo", "yyyy-MM-dd"),
        category: row[4],
        summary: row[5],
        body: "<p>" + row[6] + "</p>",
        image: row[7],
        url: `news.html?id=${row[11]}`
      });
    });

    jsonResponse = JSON.stringify(items);
    cache.put('news_json_data', jsonResponse, 21600);
  }

  const output = `${callback}(${jsonResponse});`;

  return ContentService.createTextOutput(output)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

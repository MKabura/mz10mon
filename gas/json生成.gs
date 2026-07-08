function myFunction() {
  // 1. キャッシュの確認
  const cache = CacheService.getScriptCache();
  const cachedData = cache.get('news_json_data'); // キャッシュのキー名
  
  if (cachedData !== null) {
    // 【キャッシュがある場合】従来の処理をすべてスキップしてそのまま返す（爆速）
    return ContentService.createTextOutput(cachedData)
                         .setMimeType(ContentService.MimeType.JSON);
  }
  
  // ==========================================
  // 【キャッシュがない場合】👇ここから従来の処理
  // ==========================================
  
  const ss = SpreadsheetApp.openById("1Hscu23BU8e5c1SEmuOqHBL_bPQ3tRKcqHYYPznI3I0M");
  const sheet = ss.getSheetByName("活動報告ニュースCMS");

  // 必要な範囲だけ取得（A〜L列）
  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(2, 1, lastRow - 1, 12).getValues();

  const items = [];
  
  // 従来のJSON生成ロジック（そのまま使用）
  data.forEach(row => {
    if (row[10] !== "公開") return;
    items.push({
      id: row[11],
      title: row[2],
      date: Utilities.formatDate(row[3], "Asia/Tokyo", "yyyy-MM-dd"),
      category: row[4],
      summary: row[5],
      body: "<p>" + row[6] + "</p>",
      // image: convertDriveUrl(row[7]),
      url: `news.html?id=${row[11]}`,
    });
  });
  
  // 従来通りJSON文字列に変換
  const jsonResponse = JSON.stringify(items);
  
  // ==========================================
  // 👆ここまで従来の処理
  // ==========================================
  
  // 2. 次回アクセスのために、生成したJSONをキャッシュに保存
  //（第3引数は有効期限：秒単位。ここでは21600秒＝6時間。最大6時間まで設定可能）
  cache.put('news_json_data', jsonResponse, 21600);
  
  // 3. データを返す
  return ContentService.createTextOutput(jsonResponse)
                       .setMimeType(ContentService.MimeType.JSON);
}

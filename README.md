# DCTW - Unofficial Browser Extension
> 一個非官方的 DCTW 瀏覽器擴充功能，方便瀏覽台灣 Discord 社群的機器人、伺服器和模板。
>
> An unofficial browser extension for browsing DCTW (Taiwan Discord Community) bots, servers, and templates.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](manifest.json)

[English](#english) | [繁體中文](#繁體中文)

---

## 繁體中文

### 📖 專案簡介

DCTW - Unofficial Browser Extension 是一個為 DCTW（台灣 Discord 社群）設計的瀏覽器擴充功能。此擴充功能讓您可以輕鬆瀏覽和搜尋：

- 🤖 Discord 機器人
- 🖥️ Discord 伺服器
- 📋 Discord 伺服器模板

**免責聲明：** 本擴充功能並非由台酷拉 x Taicoolah 或 DCTW 官方開發或認可。

### ✨ 功能特色

- 🔍 **智慧搜尋** - 快速搜尋機器人、伺服器和模板
- 🏷️ **標籤分類** - 依標籤篩選內容（音樂、娛樂、管理、工具等）
- 📊 **詳細資訊** - 查看完整的描述、統計數據和連結
- 🎨 **現代化界面** - 乾淨、直覺的使用者介面
- 🌐 **即時數據** - 透過 API 獲取最新資訊
- 💾 **本地快取** - 減少載入時間，提升使用體驗

### 🚀 安裝方式

#### Chrome / Edge / Brave

1. 下載或克隆此儲存庫
   ```bash
   git clone https://github.com/AvianJay/DCTW---Unofficial-Browser-Extension.git
   ```

2. 開啟瀏覽器的擴充功能管理頁面
   - Chrome: 前往 `chrome://extensions/`
   - Edge: 前往 `edge://extensions/`
   - Brave: 前往 `brave://extensions/`

3. 啟用「開發人員模式」

4. 點擊「載入未封裝項目」

5. 選擇下載的專案資料夾

6. 擴充功能圖示將出現在瀏覽器工具列

### 📝 使用說明

1. **點擊擴充功能圖示** - 在瀏覽器工具列中點擊 DCTW 圖示
2. **選擇分類** - 在「機器人」、「伺服器」或「模板」之間切換
3. **搜尋內容** - 使用搜尋框快速找到您需要的項目
4. **查看詳情** - 點擊任何項目以查看完整資訊
5. **訪問資源** - 使用提供的連結前往 Discord 或相關網站

### 🛠️ 技術架構

- **Manifest Version**: 3
- **前端框架**: 原生 JavaScript (Vanilla JS)
- **樣式設計**: CSS3
- **Markdown 渲染**: [marked.js](https://github.com/markedjs/marked)
- **圖標**: Font Awesome 6.4.0
- **API 提供**: [NyankoHost](https://nyanko.host)

### 🖼️ 使用截圖

<img width="365" height="504" alt="image" src="https://github.com/user-attachments/assets/02772448-2775-4d65-ae2f-1d2a31aa528f" />
<img width="365" height="504" alt="image" src="https://github.com/user-attachments/assets/8ff455c0-bef1-4cf4-8ea6-ab4e8c6106e3" />
<img width="365" height="504" alt="image" src="https://github.com/user-attachments/assets/8fc32fdc-091a-41c5-b101-32679e0bcd60" />
<img width="365" height="504" alt="image" src="https://github.com/user-attachments/assets/efbcc5c7-6f2a-40e5-ab1d-7209f8eddfe1" />

### 📂 專案結構

```
DCTW---Unofficial-Browser-Extension/
├── manifest.json          # 擴充功能配置檔
├── popup.html            # 主要彈出視窗 HTML
├── popup.js              # 主要邏輯和 API 互動
├── style.css             # 樣式表
├── debug.html            # 除錯頁面
├── debug.js              # 除錯腳本
├── marked.min.js         # Markdown 解析器
├── icon.png              # 擴充功能圖示
├── info-logo.png         # 資訊頁面 Logo
└── README.md             # 本說明文件
```

### 🙏 感謝

特別感謝 **雲端貓居 NyankoHost** 提供 API 讓此擴充功能能夠獲取資料。

- 網站：[https://nyanko.host](https://nyanko.host)
- API 端點：`https://dctw.nyanko.host`

### 📜 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

### 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

1. Fork 本專案
2. 建立您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

### 📧 聯絡方式

如有任何問題或建議，請透過 GitHub Issues 聯絡我們。

---

## English

### 📖 About

DCTW - Unofficial Browser Extension is a browser extension designed for DCTW (Taiwan Discord Community). This extension allows you to easily browse and search for:

- 🤖 Discord Bots
- 🖥️ Discord Servers
- 📋 Discord Server Templates

**Disclaimer:** This extension is not endorsed by or affiliated with 台酷拉 x Taicoolah or DCTW in any way.

### ✨ Features

- 🔍 **Smart Search** - Quickly search for bots, servers, and templates
- 🏷️ **Tag Categories** - Filter content by tags (music, entertainment, moderation, utilities, etc.)
- 📊 **Detailed Information** - View complete descriptions, statistics, and links
- 🎨 **Modern Interface** - Clean and intuitive user interface
- 🌐 **Real-time Data** - Fetch the latest information via API
- 💾 **Local Caching** - Reduced loading times for better user experience

### 🚀 Installation

#### Chrome / Edge / Brave

1. Download or clone this repository
   ```bash
   git clone https://github.com/AvianJay/DCTW---Unofficial-Browser-Extension.git
   ```

2. Open your browser's extension management page
   - Chrome: Navigate to `chrome://extensions/`
   - Edge: Navigate to `edge://extensions/`
   - Brave: Navigate to `brave://extensions/`

3. Enable "Developer mode"

4. Click "Load unpacked"

5. Select the downloaded project folder

6. The extension icon will appear in your browser toolbar

### 📝 Usage

1. **Click the extension icon** - Click the DCTW icon in your browser toolbar
2. **Select a category** - Switch between "Bots", "Servers", or "Templates"
3. **Search content** - Use the search box to quickly find what you need
4. **View details** - Click any item to see complete information
5. **Access resources** - Use the provided links to visit Discord or related websites

### 🛠️ Technology Stack

- **Manifest Version**: 3
- **Frontend**: Vanilla JavaScript
- **Styling**: CSS3
- **Markdown Rendering**: [marked.js](https://github.com/markedjs/marked)
- **Icons**: Font Awesome 6.4.0
- **API Provider**: [NyankoHost](https://nyanko.host)

### 📂 Project Structure

```
DCTW---Unofficial-Browser-Extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup HTML
├── popup.js              # Main logic and API interactions
├── style.css             # Stylesheet
├── debug.html            # Debug page
├── debug.js              # Debug script
├── marked.min.js         # Markdown parser
├── icon.png              # Extension icon
├── info-logo.png         # Info page logo
└── README.md             # This file
```

### 🙏 Credits

Special thanks to **雲端貓居 NyankoHost** for providing the API that enables this extension to fetch data.

- Website: [https://nyanko.host](https://nyanko.host)
- API Endpoint: `https://dctw.nyanko.host`

### 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📧 Contact

For any questions or suggestions, please contact us through GitHub Issues.

---

**Made with ❤️ for the DCTW Community**

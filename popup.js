document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const listView = document.getElementById('list-view');
  const loadingView = document.getElementById('loading');
  const errorView = document.getElementById('error');
  const emptyView = document.getElementById('empty');
  const infoView = document.getElementById('info-view');
  const detailView = document.getElementById('detail-view');
  const optionsBtn = document.getElementById('options-btn');
  const retryBtn = document.getElementById('retry-btn');
  const searchInput = document.getElementById('search-input');

  // Debug elements
  const infoLogoImg = document.getElementById('info-logo-img');
  const debugAuthContainer = document.getElementById('debug-auth-container');
  const debugPasswordInput = document.getElementById('debug-password');

  // Default config
  let currentTab = 'bots';
  let currentData = []; // Store currently fetched data for filtering
  const config = {
    apiBaseUrl: 'https://dctw.nyanko.host',
    apiKey: 'dctw_live_967cf393ede41831_TSsx1WOeIW4XlTbgP5xq21wE1Bsl6jvDOiFYKH7fVNf'
  };

  const DEFAULT_ICON = 'https://dctw.xyz/default-icon.png';

  // Logging Utility
  const Logger = {
    log: function (msg, level = 'info') {
      const entry = {
        timestamp: Date.now(),
        level: level,
        message: msg
      };
      chrome.storage.local.get(['logs'], (result) => {
        const logs = result.logs || [];
        logs.push(entry);
        // Keep last 200 logs
        if (logs.length > 200) logs.shift();
        chrome.storage.local.set({ logs: logs });
      });
      // Also log to real console
      if (level === 'error') console.error(msg);
      else console.log(msg);
    },
    error: function (msg) { this.log(msg, 'error'); },
    info: function (msg) { this.log(msg, 'info'); }
  };

  // Monkey patch console? Maybe safer to just use Logger explicitly where important.
  // For now I'll just use Logger.info/error in key places.
  // But since "detailed logs" are asked, I'll log API calls.

  // Tag Translation Map
  const TAG_MAP = {
    'music': '音樂',
    'entertainment': '娛樂',
    'fun': '娛樂',
    'moderation': '管理',
    'management': '管理',
    'utility': '工具',
    'utilities': '工具',
    'tool': '工具',
    'tools': '工具',
    'minigames': '小遊戲',
    'mini-games': '小遊戲',
    'customizable': '可自訂',
    'automation': '自動化',
    'roleplay': '角色扮演',
    'rp': '角色扮演',
    'nsfw': 'NSFW',
    'game': '遊戲',
    'games': '遊戲',
    'gaming': '遊戲',
    'community': '社群',
    'anime': '動漫',
    'art': '藝術',
    'design': '藝術',
    'programing': '程式',
    'coding': '程式',
    'development': '程式',
    'chat': '交流',
    'social': '交流',
    'hangout': '交流',
    'communication': '交流',
    'drama': '對戲',
    'action': '對戲',
    'politics': '政治',
    // Templates
    'gaming community': '遊戲社群模板',
    'support community': '支援社群模板',
    'fun community': '趣味社群模板',
    'large community': '大型社群模板'
  };

  // Initialize
  init();

  function init() {
    Logger.info('Popup initialized');
    // Load initial data
    loadData(currentTab);

    // Event Listeners
    optionsBtn.addEventListener('click', () => {
      // Toggle info view
      if (infoView.classList.contains('hidden')) {
        hideAll();
        infoView.classList.remove('hidden');
      } else {
        // If clicking info while in info, go back to list
        renderList(filterData(currentData, searchInput.value), currentTab);
      }
    });

    retryBtn.addEventListener('click', () => {
      loadData(currentTab);
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Switch tab UI
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.tab;

        // Clear search
        searchInput.value = '';

        // Load data
        loadData(currentTab);
      });
    });

    // Search Listener
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      const filtered = filterData(currentData, query);
      renderList(filtered, currentTab);
    });

    // Easter Egg Logic
    let logoClicks = 0;
    let logoClickTimer = null;

    if (infoLogoImg) {
      infoLogoImg.addEventListener('click', () => {
        logoClicks++;
        Logger.info(`Logo clicked: ${logoClicks}`);

        if (logoClickTimer) clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => {
          logoClicks = 0;
        }, 2000); // Reset if not clicked 5 times within 2 secs

        if (logoClicks >= 5) {
          Logger.info('Easter egg triggered');
          debugAuthContainer.classList.remove('hidden');
          debugPasswordInput.focus();
          logoClicks = 0;
          clearTimeout(logoClickTimer);
        }
      });
    }

    if (debugPasswordInput) {
      debugPasswordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const pass = debugPasswordInput.value;
          if (pass === 'dctw114514') {
            Logger.info('Debug password correct, opening debug page');
            chrome.tabs.create({ url: 'debug.html' });
            debugAuthContainer.classList.add('hidden');
            debugPasswordInput.value = '';
          } else {
            Logger.error('Invalid debug password attempt');
            debugPasswordInput.style.borderColor = 'red';
            setTimeout(() => debugPasswordInput.style.borderColor = '#444', 1000);
          }
        }
      });
    }
  }

  function hideAll() {
    loadingView.classList.add('hidden');
    errorView.classList.add('hidden');
    emptyView.classList.add('hidden');
    listView.classList.add('hidden');
    if (infoView) infoView.classList.add('hidden');
    if (detailView) detailView.classList.add('hidden');
  }

  function filterData(data, query) {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(item => {
      return (item.name && item.name.toLowerCase().includes(q)) ||
        (item.id && item.id.includes(q));
    });
  }

  async function loadData(type) {
    // showLoading handles hiding everything else including infoView
    showLoading();
    currentData = []; // Reset current data
    Logger.info(`Loading data for: ${type}`);

    try {
      const baseUrl = config.apiBaseUrl.replace(/\/$/, '');
      const url = `${baseUrl}/api/v1/${type}`;

      const headers = {
        'Content-Type': 'application/json'
      };

      if (config.apiKey) {
        // Log redacted key
        const redactedKey = config.apiKey.substring(0, 10) + '...';
        Logger.info(`Using API Key: ${redactedKey}`);
        headers['Authorization'] = `Bearer ${config.apiKey}`;
      }

      const msg = {
        method: 'GET',
        url: url,
        headers: { ...headers, Authorization: 'Bearer [REDACTED]' }
      };
      Logger.info(`Request Details: ${JSON.stringify(msg)}`);

      const response = await fetch(url, { headers });

      if (!response.ok) {
        Logger.error(`API Error: ${response.status} ${response.statusText}`);
        throw new Error(`API 錯誤: ${response.status}`);
      }

      const jsonData = await response.json();
      Logger.info(`Data loaded successfully. Items: ${Array.isArray(jsonData.data) ? jsonData.data.length : (Array.isArray(jsonData) ? jsonData.length : 0)}`);

      // Handling response structure based on openapi.json
      if (jsonData.data && Array.isArray(jsonData.data)) {
        currentData = jsonData.data;
      } else if (Array.isArray(jsonData)) {
        // Fallback if direct array
        currentData = jsonData;
      } else {
        Logger.error("Unexpected data format", jsonData);
        currentData = [];
      }

      renderList(currentData, type);

    } catch (err) {
      Logger.error(`Load failed: ${err.message}`);
      showError(err.message || '無法取得資料');
    }
  }

  function renderList(items, type) {
    hideAll(); // Ensure info view is hidden

    listView.innerHTML = '';

    if (items.length === 0) {
      emptyView.classList.remove('hidden');
      // listView remains hidden
      return;
    }

    // listView active
    listView.classList.remove('hidden');

    items.forEach(item => {
      const card = createCard(item, type);

      // Add click listener for detail view
      card.addEventListener('click', () => {
        showDetail(item, type);
      });

      listView.appendChild(card);
    });
  }

  function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'card';

    let imageUrl = DEFAULT_ICON;
    if (type === 'bots' && item.avatar_url) imageUrl = item.avatar_url;
    else if (type === 'servers' && item.icon_url) imageUrl = item.icon_url;
    if (type === 'templates') imageUrl = null;

    // Img Logic
    const imgContainer = document.createElement('div');
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = item.name;
      img.className = `card-img ${type === 'servers' ? 'server-icon' : ''}`;
      img.addEventListener('error', function () { this.src = DEFAULT_ICON; });
      imgContainer.appendChild(img);
    } else {
      imgContainer.innerHTML = `<div class="card-img" style="display:flex;align-items:center;justify-content:center;"><i class="fas fa-file-code"></i></div>`;
    }

    // Badges
    let badgesHtml = '';
    if (item.nsfw) badgesHtml += `<span class="badge" style="background:#ED4245">NSFW</span>`;
    if (item.is_partnered) badgesHtml += `<span class="badge" style="background:#5865F2">合作夥伴</span>`;

    // Stats logic needed for rendering... reused for detail too?
    const statsHtml = getStatsHtml(item, type);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'card-content';
    contentDiv.innerHTML = `
        <div class="card-title">
          <div class="card-name" title="${item.name}">${item.name}</div>
          <div class="card-badges">${badgesHtml}</div>
        </div>
        <div class="card-desc">${item.description || '沒有描述。'}</div>
        <div class="card-stats">
          ${statsHtml}
        </div>
      `;

    if (imgContainer.firstChild) card.appendChild(imgContainer.firstChild);
    else card.appendChild(imgContainer);

    card.appendChild(contentDiv);

    return card;
  }

  function getStatsHtml(item, type) {
    if (type === 'bots') {
      return `
              <div class="stat" title="投票數"><i class="fas fa-chevron-up"></i> ${item.votes || 0}</div>
              <div class="stat" title="伺服器數"><i class="fas fa-server"></i> ${item.servers || 0}</div>
            `;
    } else if (type === 'servers') {
      return `
              <div class="stat" title="投票數"><i class="fas fa-chevron-up"></i> ${item.votes || 0}</div>
              <div class="stat" title="成員數"><i class="fas fa-users"></i> ${item.members || 0}</div>
            `;
    } else if (type === 'templates') {
      return `
              <div class="stat" title="投票數"><i class="fas fa-chevron-up"></i> ${item.votes || 0}</div>
            `;
    }
    return '';
  }

  function showDetail(item, type) {
    Logger.info(`Showing detail for item: ${item.name} (${item.id})`);
    hideAll();
    detailView.classList.remove('hidden');

    // Scroll to top
    const main = document.getElementById('content-container');
    main.scrollTop = 0;

    // Banner
    let bannerUrl = item.banner_url || '';

    let imageUrl = DEFAULT_ICON;
    if (type === 'bots' && item.avatar_url) imageUrl = item.avatar_url;
    else if (type === 'servers' && item.icon_url) imageUrl = item.icon_url;
    if (type === 'templates') imageUrl = null;

    // Tags - Localized
    let tagsHtml = '';
    if (item.tags && Array.isArray(item.tags)) {
      tagsHtml = item.tags.map(tag => {
        const lowerTag = tag.toLowerCase();
        const translated = TAG_MAP[lowerTag] || tag;
        return `<span class="tag">${translated}</span>`;
      }).join('');
    }

    // Stats
    const statsHtml = getStatsHtml(item, type);

    // URLs And Buttons
    // 1. Action Button (Invite/Use)
    let actionUrl = '';
    let actionText = '';
    if (type === 'bots') {
      actionUrl = item.invite_url;
      actionText = '邀請機器人';
    } else if (type === 'servers') {
      actionUrl = item.invite_url;
      actionText = '加入伺服器';
    } else if (type === 'templates') {
      actionUrl = item.share_url;
      actionText = '使用此模板';
    }

    // 2. DCTW View Button
    const dctwUrl = `https://dctw.xyz/${type}/${item.id}`;

    // Description Parsing
    // Handle <br> as newline. 
    let rawDesc = item.introduce || item.description || '沒有詳細介紹。';

    // Simple Markdown/HTML cleanup for viewing as text with line breaks
    // Replace <br> tags with newline characters
    let cleanDesc = rawDesc.replace(/<br\s*\/?>/gi, '\n');

    // Build HTML
    detailView.innerHTML = '';

    // Navigation (Back)
    const nav = document.createElement('div');
    nav.className = 'detail-nav';
    nav.innerHTML = `<i class="fas fa-arrow-left"></i> 返回列表`;
    nav.addEventListener('click', () => {
      // Go back to list
      // However, user might have been searching. 
      // We should re-render current filtered status?
      // Simplest: render current filter.
      renderList(filterData(currentData, searchInput.value), currentTab);
      // listView will be unhidden by renderList
    });
    detailView.appendChild(nav);

    // Banner Image
    if (bannerUrl) {
      const bannerImg = document.createElement('img');
      bannerImg.src = bannerUrl;
      bannerImg.className = 'detail-banner';
      bannerImg.addEventListener('error', function () { this.style.display = 'none'; });
      detailView.appendChild(bannerImg);
    }

    // Header (Icon + Title)
    const header = document.createElement('div');
    header.className = 'detail-header';

    // Icon
    const iconImg = document.createElement('img');
    iconImg.src = imageUrl || 'icon.png'; // Fallback
    if (!imageUrl) iconImg.src = 'icon.png';

    iconImg.className = `detail-icon ${type === 'servers' ? 'server-icon' : ''}`;
    iconImg.addEventListener('error', function () { this.src = DEFAULT_ICON; });
    header.appendChild(iconImg);

    // Title Info
    const info = document.createElement('div');
    info.className = 'detail-info';
    info.innerHTML = `
            <div class="detail-title">
                <h2>${item.name}</h2>
            </div>
            <div class="card-stats" style="font-size: 14px;">${statsHtml}</div>
        `;
    header.appendChild(info);
    detailView.appendChild(header);

    // Tags
    if (tagsHtml) {
      const tagsDiv = document.createElement('div');
      tagsDiv.className = 'tags-container';
      tagsDiv.innerHTML = tagsHtml;
      detailView.appendChild(tagsDiv);
    }

    // Action Buttons Container
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    // Primary Action
    if (actionUrl) {
      const actionBtn = document.createElement('a');
      actionBtn.className = 'primary-btn action-btn';
      actionBtn.href = actionUrl;
      actionBtn.target = '_blank';
      actionBtn.textContent = actionText;
      btnContainer.appendChild(actionBtn);
    }

    // DCTW View Action
    const dctwBtn = document.createElement('a');
    dctwBtn.className = 'secondary-btn action-btn';
    dctwBtn.href = dctwUrl;
    dctwBtn.target = '_blank';
    dctwBtn.textContent = '前往 DCTW 查看';
    btnContainer.appendChild(dctwBtn);

    detailView.appendChild(btnContainer);

    // Description
    const descDiv = document.createElement('div');
    descDiv.className = 'detail-desc markdown-body'; // Add markdown-body class for styling

    // Use marked.parse to render Markdown
    try {
      descDiv.innerHTML = marked.parse(rawDesc, { breaks: true });
    } catch (e) {
      Logger.error(`Markdown error: ${e}`);
      descDiv.textContent = rawDesc;
    }

    // Handle links in markdown to open in new tab
    const links = descDiv.querySelectorAll('a');
    links.forEach(link => link.target = '_blank');

    detailView.appendChild(descDiv);
  }

  function showLoading() {
    hideAll();
    loadingView.classList.remove('hidden');
  }

  function showError(msg) {
    hideAll();
    errorView.classList.remove('hidden');
    document.getElementById('error-message').textContent = msg;
  }
});

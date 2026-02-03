document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('log-container');
    const refreshBtn = document.getElementById('refresh-btn');
    const clearBtn = document.getElementById('clear-btn');

    // Initial load
    refreshLogs();

    // specific listener
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.logs) {
            refreshLogs();
        }
    });

    refreshBtn.addEventListener('click', refreshLogs);
    clearBtn.addEventListener('click', () => {
        chrome.storage.local.set({ logs: [] }); // Listener will trigger refresh
    });

    function refreshLogs() {
        chrome.storage.local.get(['logs'], (result) => {
            const logs = result.logs || [];

            // Auto-scroll logic: check if already at bottom before clearing? 
            // Actually, usually debug consoles auto-scroll to bottom.
            // But here we show newest first (reverse), so we stay at top?
            // "Inside runs a log input box" user said "popup a input box".
            // Wait, for the debug page, user just said "shows detailed logs".

            if (logs.length === 0) {
                logContainer.innerHTML = '<div>No logs found.</div>';
                return;
            }

            logContainer.innerHTML = '';
            // Show newest first
            logs.slice().reverse().forEach(log => {
                const entry = document.createElement('div');
                entry.className = 'log-entry';

                const time = document.createElement('span');
                time.className = 'log-time';
                time.textContent = `[${new Date(log.timestamp).toLocaleTimeString()}]`;

                const level = document.createElement('span');
                level.className = `log-level level-${log.level || 'info'}`;
                level.textContent = (log.level || 'INFO').toUpperCase();

                const message = document.createElement('span');
                message.textContent = typeof log.message === 'object' ? JSON.stringify(log.message, null, 2) : log.message;

                entry.appendChild(time);
                entry.appendChild(level);
                entry.appendChild(message);
                logContainer.appendChild(entry);
            });
        });
    }
});

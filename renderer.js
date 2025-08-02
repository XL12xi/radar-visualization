// 等待 DOM 加载完成
window.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');

  // 使用 preload.js 中暴露的 API
  window.electronAPI.onTcpData((data) => {
    const p = document.createElement('p');
    p.textContent = `📨 收到数据：${data}`;
    output.appendChild(p);
  });
});

import React from 'react';
import MapView from '../components/MapView';

export default function Data() {
  // 右侧滚动数据区参数
  // 右侧栏宽高与左侧对齐
  const panelWidth = '25%'; // 与左上/左下宽度一致
  const panelHeight = '50%'; // 与左上/左下高度一致
  const rightPanelBoxHeight = '28%'; // 警示灯区域高度（与左上高度比例协调）
  const rightPanelBottomBoxHeight = `calc(${panelHeight} - ${rightPanelBoxHeight})`;
  // 顶部导航栏高度需与App.jsx一致
  const navHeight = 48;
  // 警戒状态，future: 可通过 props/state 控制高亮
  // 可选值：'red' | 'yellow' | 'green' | null
  const alertStatus = null; // 默认全部暗淡
  React.useEffect(() => {
    // 禁止body和html横向滚动
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);
  return (
    <div style={{
      width: '100%',
      maxWidth: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 地图铺满背景 */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <MapView />
      </div>
      {/* 左上角信息面板，紧贴左侧和导航栏底部 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '25%', 
          height: '50%',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          overflow: 'hidden',
          zIndex: 1000,
        }}
      >
        {/* 左半部分：上下两个盒子 */}
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #eee' }}>
          {/* 上：模型图 */}
          <div style={{ flex: 1, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#888' }}>模型图区域</span>
          </div>
          {/* 下：雷达图 */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#888' }}>雷达图区域</span>
          </div>
        </div>
        {/* 右半部分：数据区 */}
        <div style={{ width: '50%', padding: 16, overflow: 'auto' }}>
          <h4 style={{ margin: 0, marginBottom: 8 }}>相关数据</h4>
          <div style={{ color: '#666' }}>
            {/* 这里放数据内容 */}
            <p>数据1: ...</p>
            <p>数据2: ...</p>
          </div>
        </div>
      </div>
      {/* 左下角大盒子，与左上角宽度一致，高度为剩余高度 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '24.1%',
          height: '50%',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-end',
          padding: '16px 8px',
          zIndex: 1000,
        }}
      >
        {/* 频段列表标题和8个静态盒子 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#1976d2',
            marginBottom: 8,
            letterSpacing: 2,
            textAlign: 'center',
          }}>
            频段列表
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  background: '#f5f7fa',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: 18,
                  color: '#1976d2',
                  margin: '1px 0',
                  paddingLeft: 12,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}
              >
                数据{idx + 1}：静态展示
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 右上角警戒状态盒子 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '14%',
          height: '15.6%',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '18px 12px 12px 12px',
          zIndex: 1000,
        }}
      >
        <div style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#d32f2f',
          marginBottom: 16,
          letterSpacing: 2,
          textAlign: 'center',
          width: '100%',
        }}>
          警戒状态
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: 24,
        }}>
          {/* 红灯 */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#d32f2f',
            boxShadow: alertStatus === 'red' ? '0 0 16px 4px #d32f2f99' : '0 0 8px 1px #d32f2f33',
            opacity: alertStatus === 'red' ? 1 : 0.3,
            filter: alertStatus === 'red' ? 'none' : 'grayscale(0.7) brightness(0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #fff',
            transition: 'all 0.3s',
          }} />
          {/* 黄灯 */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#fbc02d',
            boxShadow: alertStatus === 'yellow' ? '0 0 16px 4px #fbc02d99' : '0 0 8px 1px #fbc02d33',
            opacity: alertStatus === 'yellow' ? 1 : 0.3,
            filter: alertStatus === 'yellow' ? 'none' : 'grayscale(0.7) brightness(0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #fff',
            transition: 'all 0.3s',
          }} />
          {/* 绿灯 */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#388e3c',
            boxShadow: alertStatus === 'green' ? '0 0 16px 4px #388e3c99' : '0 0 8px 1px #388e3c33',
            opacity: alertStatus === 'green' ? 1 : 0.3,
            filter: alertStatus === 'green' ? 'none' : 'grayscale(0.7) brightness(0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #fff',
            transition: 'all 0.3s',
          }} />
        </div>
      </div>
      {/* 右侧滚动数据区 */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          width: '14.5%',
          height: '84.8%',
          top: '18%',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '12px 8px',
          zIndex: 1000,
          overflow: 'hidden',
        }}
      >
        <div style={{
          width: '100%',
          fontSize: 18,
          fontWeight: 700,
          color: '#1976d2',
          marginBottom: 8,
          textAlign: 'center',
          letterSpacing: 2,
        }}>
          实时数据
        </div>
        {/* 平滑无缝滚动内容区 */}
        <div
          style={{
            flex: 1,
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              animation: 'right-scroll-loop 32s linear infinite',
            }}
          >
            {/* 20个盒子，前10个+后10个（循环） */}
            {Array.from({ length: 20 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  height: 38,
                  background: '#f5f7fa',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: 17,
                  color: '#1976d2',
                  margin: '4px 0',
                  paddingLeft: 10,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}
              >
                数据{(idx % 10) + 1}：滚动展示
              </div>
            ))}
          </div>
        </div>
        {/* 平滑无缝滚动动画样式 */}
        <style>{`
          @keyframes right-scroll-loop {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `}</style>
      </div>
    </div>
  );
}
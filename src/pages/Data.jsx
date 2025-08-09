import React from 'react';
import MapView from '../components/MapView';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function Data() {
  //唯一高亮
  const [selectedId, setSelectedId] = React.useState(null);
  // 左下角频段高亮索引
  const [activeLeftBand, setActiveLeftBand] = React.useState(null);
  // 右侧实时数据区高亮索引
  const [activeRightBand, setActiveRightBand] = React.useState(null);
  // 模型筛选
  const [modelFilter, setModelFilter] = React.useState('all');
  // 右侧实时数据区模拟10个频段，前9个与模型一一对应
  const rightPanelBands = [
    { id: 'F001', label: '飞机频段1', modelType: 'plane', modelIdx: 0 },
    { id: 'F002', label: '飞机频段2', modelType: 'plane', modelIdx: 1 },
    { id: 'F003', label: '飞机频段3', modelType: 'plane', modelIdx: 2 },
    { id: 'S001', label: '船频段1', modelType: 'ship', modelIdx: 0 },
    { id: 'S002', label: '船频段2', modelType: 'ship', modelIdx: 1 },
    { id: 'S003', label: '船频段3', modelType: 'ship', modelIdx: 2 },
    { id: 'D001', label: '无人机频段1', modelType: 'drone', modelIdx: 0 },
    { id: 'D002', label: '无人机频段2', modelType: 'drone', modelIdx: 1 },
    { id: 'D003', label: '无人机频段3', modelType: 'drone', modelIdx: 2 },
    { id: 'X999', label: '其他频段', modelType: null, modelIdx: null },
  ];
  // const navHeight = 48;
  // 频段列表（左下角）
  const bandList = {
    all: [
      { id: 'F001', label: '飞机频段1' },
      { id: 'F002', label: '飞机频段2' },
      { id: 'F003', label: '飞机频段3' },
      { id: 'S001', label: '船频段1' },
      { id: 'S002', label: '船频段2' },
      { id: 'S003', label: '船频段3' },
      { id: 'D001', label: '无人机频段1' },
      { id: 'D002', label: '无人机频段2' },
      { id: 'D003', label: '无人机频段3' },
    ],
    plane: [
      { id: 'F001', label: '飞机频段1' },
      { id: 'F002', label: '飞机频段2' },
      { id: 'F003', label: '飞机频段3' },
    ],
    ship: [
      { id: 'S001', label: '船频段1' },
      { id: 'S002', label: '船频段2' },
      { id: 'S003', label: '船频段3' },
    ],
    drone: [
      { id: 'D001', label: '无人机频段1' },
      { id: 'D002', label: '无人机频段2' },
      { id: 'D003', label: '无人机频段3' },
    ],
  };
  // ...existing code...

  // 飞机模型数据
  const planes = [
    {
      id: 'A001',
      type: '客机',
      flight: 'CA123',
      status: 'red',
      pos: [22.55, 114.1],
    },
    {
      id: 'B002',
      type: '货机',
      flight: 'MU456',
      status: 'yellow',
      pos: [22.6, 114.2],
    },
    {
      id: 'C003',
      type: '公务机',
      flight: 'ZH789',
      status: 'green',
      pos: [22.58, 114.12],
    },
  ];

  // 船模型数据（海面区域示例：深圳湾/大鹏湾/伶仃洋）
  const ships = [
    {
      id: 'S001',
      type: '货船',
      shipNo: 'SZ1001',
      status: 'red',
      pos: [22.45, 113.95], // 深圳湾
    },
    {
      id: 'S002',
      type: '渔船',
      shipNo: 'SZ2002',
      status: 'yellow',
      pos: [22.38, 114.32], // 大鹏湾
    },
    {
      id: 'S003',
      type: '客轮',
      shipNo: 'SZ3003',
      status: 'green',
      pos: [22.22, 113.82], // 伶仃洋
    },
  ];

  // 无人机模型数据
  const drones = [
    {
      id: 'D001',
      type: '四旋翼',
      droneNo: 'UAV001',
      status: 'red',
      pos: [22.48, 114.05],
    },
    {
      id: 'D002',
      type: '固定翼',
      droneNo: 'UAV002',
      status: 'yellow',
      pos: [22.52, 114.18],
    },
    {
      id: 'D003',
      type: '垂直起降',
      droneNo: 'UAV003',
      status: 'green',
      pos: [22.54, 114.08],
    },
  ];
  // 选中飞机
  const [selectedPlane, setSelectedPlane] = React.useState(null);

  // 预警状态
  const alertStatus = selectedPlane ? selectedPlane.status : null;

  // 禁止body和html横向滚动
  React.useEffect(() => {
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
      {/* 地图铺满背景，含飞机模型 */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <MapView>
          {/* 飞机模型Marker */}
          {(modelFilter === 'all' || modelFilter === 'plane') && planes.map((plane, idx) => {
            let highlight = selectedId === plane.id;
            return (
              <Marker
              key={plane.id}
              position={plane.pos}
              icon={L.divIcon({
                className: '',
                html: `<div style="width:32px;height:32px;border-radius:50%;background:${plane.status==='red'?'#d32f2f':'#fbc02d'}33;border:2px solid ${plane.status==='red'?'#d32f2f':plane.status==='yellow'?'#fbc02d':'#388e3c'};display:flex;align-items:center;justify-content:center;${highlight ? 'box-shadow:0 0 0 4px #1976d2aa;' : ''}">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <polygon points="10,2 12,14 10,12 8,14" fill="${plane.status==='red'?'#d32f2f':plane.status==='yellow'?'#fbc02d':'#388e3c'}"/>
                  </svg>
                </div>`
              })}
              eventHandlers={{
                click: () => {
                  setSelectedPlane(plane); 
                  setSelectedId(plane.id); // 设置唯一高亮ID

                  const bandIdx = bandList[modelFilter].findIndex(
                    b => b.id.startsWith('F') && b.id.slice(1) === plane.id.slice(1)
                  );
                  if (bandIdx !== -1) setActiveLeftBand(bandIdx);
                }
              }}
            >
              <Popup>
                <div>飞机ID: {plane.id}<br/>类型: {plane.type}<br/>航班: {plane.flight}</div>
              </Popup>
            </Marker>
            );
          })}
          {/* 船模型Marker */}
          {(modelFilter === 'all' || modelFilter === 'ship') && ships.map((ship, idx) => {
            let highlight = selectedId === ship.id;
            return (
              <Marker
                key={ship.id}
                position={ship.pos}
                icon={L.divIcon({
                  className: '',
                  html: `<div style="width:32px;height:32px;border-radius:50%;background:${ship.status==='red'?'#d32f2f':'#fbc02d'}33;border:2px solid ${ship.status==='red'?'#d32f2f':ship.status==='yellow'?'#fbc02d':'#388e3c'};display:flex;align-items:center;justify-content:center;${highlight ? 'box-shadow:0 0 0 4px #1976d2aa;' : ''}">
                    <svg width="22" height="18" viewBox="0 0 22 18">
                      <rect x="6" y="8" width="10" height="5" rx="2" fill="${ship.status==='red'?'#d32f2f':ship.status==='yellow'?'#fbc02d':'#388e3c'}"/>
                      <polygon points="11,2 13,8 9,8" fill="${ship.status==='red'?'#d32f2f':ship.status==='yellow'?'#fbc02d':'#388e3c'}"/>
                    </svg>
                  </div>`
                })}
                eventHandlers={{
                  click: () => {
                    setSelectedPlane({
                      id: ship.id,
                      type: ship.type,
                      flight: ship.shipNo,
                      status: ship.status,
                      isShip: true
                    });
                    setSelectedId(ship.id); // 设置唯一高亮ID
                    const bandIdx = bandList[modelFilter].findIndex(b => b.id === ship.id);
                    if (bandIdx !== -1) setActiveLeftBand(bandIdx);
                  }
                }}
              >
                <Popup>
                  <div>船ID: {ship.id}<br/>类型: {ship.type}<br/>船号: {ship.shipNo}</div>
                </Popup>
              </Marker>
            );
          })}
          {/* 无人机模型Marker */}
          {(modelFilter === 'all' || modelFilter === 'drone') && drones.map((drone, idx) => {
            let highlight = selectedId === drone.id;
            return (
              <Marker
                key={drone.id}
                position={drone.pos}
                icon={L.divIcon({
                  className: '',
                  html: `<div style="width:32px;height:32px;border-radius:50%;background:${drone.status==='red'?'#d32f2f':'#fbc02d'}33;border:2px solid ${drone.status==='red'?'#d32f2f':drone.status==='yellow'?'#fbc02d':'#388e3c'};display:flex;align-items:center;justify-content:center;${highlight ? 'box-shadow:0 0 0 4px #1976d2aa;' : ''}">
                    <svg width="22" height="22" viewBox="0 0 22 22">
                      <circle cx="11" cy="11" r="8" fill="${drone.status==='red'?'#d32f2f':drone.status==='yellow'?'#fbc02d':'#388e3c'}"/>
                      <rect x="10" y="2" width="2" height="6" fill="${drone.status==='red'?'#d32f2f':drone.status==='yellow'?'#fbc02d':'#388e3c'}"/>
                      <rect x="10" y="14" width="2" height="6" fill="${drone.status==='red'?'#d32f2f':drone.status==='yellow'?'#fbc02d':'#388e3c'}"/>
                      <rect x="2" y="10" width="6" height="2" fill="${drone.status==='red'?'#d32f2f':drone.status==='yellow'?'#fbc02d':'#388e3c'}"/>
                      <rect x="14" y="10" width="6" height="2" fill="${drone.status==='red'?'#d32f2f':drone.status==='yellow'?'#fbc02d':'#388e3c'}"/>
                    </svg>
                  </div>`
                })}
                eventHandlers={{
                  click: () => {
                    setSelectedPlane({
                      id: drone.id,
                      type: drone.type,
                      flight: drone.droneNo,
                      status: drone.status,
                      isDrone: true
                    });
                    setSelectedId(drone.id); // 设置唯一高亮ID
                    const bandIdx = bandList[modelFilter].findIndex(b => b.id === drone.id);
                    if (bandIdx !== -1) setActiveLeftBand(bandIdx);
                  }
                }}
              >
                <Popup>
                  <div>无人机ID: {drone.id}<br/>类型: {drone.type}<br/>编号: {drone.droneNo}</div>
                </Popup>
              </Marker>
            );
          })}
        </MapView>
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
            {/* 可根据选中模型显示SVG，否则显示占位 */}
            {selectedPlane ? (
              selectedPlane.isShip ? (
                <svg width="60" height="50" viewBox="0 0 22 18">
                  <rect x="6" y="8" width="10" height="5" rx="2" fill={selectedPlane.status === 'red' ? '#d32f2f' : selectedPlane.status === 'yellow' ? '#fbc02d' : '#388e3c'} />
                  <polygon points="11,2 13,8 9,8" fill={selectedPlane.status === 'red' ? '#d32f2f' : selectedPlane.status === 'yellow' ? '#fbc02d' : '#388e3c'} />
                </svg>
              ) : selectedPlane.isDrone ? (
                <svg width="60" height="60" viewBox="0 0 22 22">
                  <circle cx="11" cy="11" r="8" fill={selectedPlane.status === 'red' ? '#d32f2f' : selectedPlane.status === 'yellow' ? '#fbc02d' : '#388e3c'} />
                  <rect x="10" y="2" width="2" height="6" fill={selectedPlane.status === 'red' ? '#d32f2f' : selectedPlane.status === 'yellow' ? '#fbc02d' : '#388e3c'} />
                  <rect x="10" y="14" width="2" height="6" fill={selectedPlane.status === 'red' ? '#d32f2f' : selectedPlane.status === 'yellow' ? '#fbc02d' : '#388e3c'} />
                  <rect x="2" y="10" width="6" height="2" fill={selectedPlane.status === 'red' ? '#d32f2f' : selectedPlane.status === 'yellow' ? '#fbc02d' : '#388e3c'} />
                  <rect x="14" y="10" width="6" height="2" fill={selectedPlane.status === 'red' ? '#d32f2f' : selectedPlane.status === 'yellow' ? '#fbc02d' : '#388e3c'} />
                </svg>
              ) : (
                <svg width="60" height="60" viewBox="0 0 20 20">
                  <polygon points="10,2 12,14 10,12 8,14" fill={selectedPlane.status === 'red' ? '#d32f2f' : selectedPlane.status === 'yellow' ? '#fbc02d' : '#388e3c'} />
                </svg>
              )
            ) : (
              <span style={{ color: '#888' }}>模型图区域</span>
            )}
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
            {selectedPlane ? (
              selectedPlane.isShip ? (
                <>
                  <p>船ID: {selectedPlane.id}</p>
                  <p>类型: {selectedPlane.type}</p>
                  <p>船号: {selectedPlane.flight}</p>
                </>
              ) : selectedPlane.isDrone ? (
                <>
                  <p>无人机ID: {selectedPlane.id}</p>
                  <p>类型: {selectedPlane.type}</p>
                  <p>编号: {selectedPlane.flight}</p>
                </>
              ) : (
                <>
                  <p>飞机ID: {selectedPlane.id}</p>
                  <p>类型: {selectedPlane.type}</p>
                  <p>航班: {selectedPlane.flight}</p>
                </>
              )
            ) : (
              <>
                <p>数据1: ...</p>
                <p>数据2: ...</p>
              </>
            )}
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
        {/* 频段列表标题和8个盒子，内容随筛选变化 */}
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
            {bandList[modelFilter].map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveLeftBand(idx);
                  setActiveRightBand(null);
                  // 联动地图模型高亮和左上面板
                  let found = null;
                  if (item.id.startsWith('F')) {
                    found = planes.findIndex(p => p.id.slice(1) === item.id.slice(1));
                    if (found !== -1) {
                      setSelectedPlane(planes[found]);
                      setSelectedId(planes[found].id); // 这里设置为模型id
                    }
                  } else if (item.id.startsWith('S')) {
                    found = ships.findIndex(s => s.id === item.id);
                    if (found !== -1) {
                      setSelectedPlane({
                        id: ships[found].id,
                        type: ships[found].type,
                        flight: ships[found].shipNo,
                        status: ships[found].status,
                        isShip: true
                      });
                      setSelectedId(ships[found].id); // 这里设置为模型id
                    }
                  } else if (item.id.startsWith('D')) {
                    found = drones.findIndex(d => d.id === item.id);
                    if (found !== -1) {
                      setSelectedPlane({
                        id: drones[found].id,
                        type: drones[found].type,
                        flight: drones[found].droneNo,
                        status: drones[found].status,
                        isDrone: true
                      });
                      setSelectedId(drones[found].id); // 这里设置为模型id
                    }
                  }
                }}
                style={{
                  flex: 1,
                  background: activeLeftBand === idx ? '#e3f2fd' : '#f5f7fa',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: 18,
                  color: '#1976d2',
                  margin: '1px 0',
                  paddingLeft: 12,
                  boxShadow: activeLeftBand === idx ? '0 2px 8px #1976d233' : '0 1px 4px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  fontWeight: activeLeftBand === idx ? 700 : 500,
                  border: activeLeftBand === idx ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  transition: 'all 0.2s',
                  userSelect: 'none',
                }}
              >
                {item.id}：{item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 右侧按钮栏 */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          right: '15.5%',
          width: 48,
          height: '62%',
          background: '#f5f7fa',
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 1100,
          padding: '12px 0',
        }}
      >
        {[
          { key: 'all', label: '全部' },
          { key: 'plane', label: '飞机' },
          { key: 'ship', label: '船' },
          { key: 'drone', label: '无人机' },
        ].map(btn => (
          <button
            key={btn.key}
            onClick={() => setModelFilter(btn.key)}
            style={{
              width: 36,
              height: 36,
              margin: '8px 0',
              borderRadius: '50%',
              border: modelFilter === btn.key ? '2px solid #1976d2' : '1px solid #bbb',
              background: modelFilter === btn.key ? '#e3f2fd' : '#fff',
              color: modelFilter === btn.key ? '#1976d2' : '#333',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: modelFilter === btn.key ? '0 2px 8px #1976d233' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {btn.label}
          </button>
        ))}
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
        {/* 平滑无缝滚动内容区，10个频段可点击 */}
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
            {rightPanelBands.map((band, idx) => (
              <div
                key={band.id}
                onClick={() => {
                  setActiveRightBand(idx);
                  setActiveLeftBand(null);
                  // 联动地图模型高亮和左上面板
                  if (band.modelType === 'plane') {
                    setSelectedPlane(planes[band.modelIdx]);
                    setSelectedId(planes[band.modelIdx].id); // 这里设置为模型id
                  }
                  else if (band.modelType === 'ship') {
                    setSelectedPlane({
                      id: ships[band.modelIdx].id,
                      type: ships[band.modelIdx].type,
                      flight: ships[band.modelIdx].shipNo,
                      status: ships[band.modelIdx].status,
                      isShip: true
                    });
                    setSelectedId(ships[band.modelIdx].id); // 这里设置为模型id
                  }
                  else if (band.modelType === 'drone') {
                    setSelectedPlane({
                      id: drones[band.modelIdx].id,
                      type: drones[band.modelIdx].type,
                      flight: drones[band.modelIdx].droneNo,
                      status: drones[band.modelIdx].status,
                      isDrone: true
                    });
                    setSelectedId(drones[band.modelIdx].id); // 这里设置为模型id
                  }
                }}
                style={{
                  height: 38,
                  background: activeRightBand === idx ? '#e3f2fd' : '#f5f7fa',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: 17,
                  color: '#1976d2',
                  margin: '4px 0',
                  paddingLeft: 10,
                  boxShadow: activeRightBand === idx ? '0 2px 8px #1976d233' : '0 1px 4px rgba(0,0,0,0.04)',
                  cursor: band.modelType ? 'pointer' : 'default',
                  fontWeight: activeRightBand === idx ? 700 : 500,
                  border: activeRightBand === idx ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  transition: 'all 0.2s',
                  userSelect: 'none',
                  opacity: band.modelType ? 1 : 0.5
                }}
              >
                {band.id}：{band.label}
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
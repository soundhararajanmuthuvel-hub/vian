import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Structural Sign-off Confirmed',
      desc: 'Drawing alignment Sheet A-204 (Rev. 3) in effect for Grid C3-C7.',
      time: '15m ago',
      icon: 'architecture',
      unread: true
    },
    {
      id: '2',
      title: 'Geofence Verification Passed',
      desc: 'Manoj V. session verified within ±2.4m RTK-GPS bounding radius.',
      time: '45m ago',
      icon: 'verified',
      unread: true
    },
    {
      id: '3',
      title: 'Material Delivery Arrival',
      desc: 'Batch #03 (UltraTech OPC-53) cleared at Gate 2 Bay Access.',
      time: '2h ago',
      icon: 'local_shipping',
      unread: false
    },
    {
      id: '4',
      title: 'Client Portal Inspection Approved',
      desc: 'Dr. Meera Reddy approved travertine marble dry-lay at Aranya Villa.',
      time: 'Yesterday',
      icon: 'task_alt',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#070a0c]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-[#dde3ed] flex flex-col">
        <div className="p-4 bg-[#f8f9ff] border-b border-[#dde3ed] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a19] text-[20px]">notifications</span>
            <h3 className="font-headline-sm text-base text-[#070a0c] font-medium">Jobsite Notifications</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#e9eef8] hover:bg-[#dde3ed] flex items-center justify-center text-[#161c23]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3 divide-y divide-[#dde3ed] max-h-96 overflow-y-auto">
          {notifications.map((n) => (
            <div key={n.id} className="py-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#eef4fe] text-[#775a19] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-body-md text-xs font-semibold text-[#070a0c] truncate">{n.title}</h4>
                  <span className="font-code-data text-[10px] text-[#75777a]">{n.time}</span>
                </div>
                <p className="font-body-sm text-xs text-[#44474a] mt-0.5">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#f8f9ff] border-t border-[#dde3ed] text-center">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-[#070a0c] text-white rounded-lg text-xs font-semibold hover:bg-[#1e2124]"
          >
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
};

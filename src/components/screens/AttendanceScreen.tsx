import React, { useState, useEffect } from 'react';
import { CrewMember } from '../../types';

interface AttendanceScreenProps {
  crew: CrewMember[];
  onUpdateCrewStatus: (id: string, status: 'present' | 'halfday' | 'absent') => void;
  onMarkAllPresent: () => void;
  onShowToast: (msg: string) => void;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({
  crew,
  onUpdateCrewStatus,
  onMarkAllPresent,
  onShowToast
}) => {
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [isPunchedOut, setIsPunchedOut] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [punchDuration, setPunchDuration] = useState('04h 18m');

  // Elapsed time simulator
  useEffect(() => {
    let minutes = 258; // 4h 18m
    const interval = setInterval(() => {
      if (!isPunchedOut && !isOnBreak) {
        minutes += 1;
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        setPunchDuration(`${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [isPunchedOut, isOnBreak]);

  // Recalculate summary stats based on current crew state
  const totalCrewHeadcount = crew.reduce((acc, member) => acc + (member.workerCount || 1), 0);
  
  const presentHeadcount = crew.reduce((acc, member) => {
    const count = member.workerCount || 1;
    if (member.status === 'present') return acc + count;
    if (member.status === 'halfday') return acc + Math.round(count / 2);
    return acc;
  }, 0);

  const absentHeadcount = totalCrewHeadcount - presentHeadcount;

  const handleToggleBreak = () => {
    if (isPunchedOut) return;
    setIsOnBreak(!isOnBreak);
    onShowToast(!isOnBreak ? 'Break started. Timer paused for Manoj V.' : 'Break ended. Active session resumed.');
  };

  const handlePunchOut = () => {
    if (isPunchedOut) return;
    if (window.confirm('Confirm Punch Out for Manoj V. at OMR Site?')) {
      setIsPunchedOut(true);
      onShowToast('Session closed. Clock-out logged at OMR Site Office.');
    }
  };

  const handleSaveAttendance = () => {
    if (isLocked) return;
    setIsLocked(true);
    onShowToast('Attendance signed with digital cert 0x9F4C...B2 and locked.');
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Header Info */}
      <div className="px-gutter-mobile pt-space-md pb-space-sm flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-[#44474a]">
              Field Verification Protocol
            </span>
          </div>
          <span className="font-code-data text-code-data text-[#44474a] bg-[#e3e8f3] px-2 py-0.5 rounded">
            REV-4.1
          </span>
        </div>
        <h1 className="font-headline-xl-mobile text-headline-xl-mobile font-semibold tracking-tight text-[#070a0c]">
          Daily Attendance
        </h1>
        <p className="font-body-sm text-body-sm text-[#44474a] flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-[#775a19]">calendar_today</span>
          Thursday, Oct 24, 2024
        </p>
      </div>

      {/* Active Site Session Card */}
      <div className="px-gutter-mobile mb-space-md">
        <div className="bg-[#ffffff] rounded-xl p-space-md shadow-sm relative overflow-hidden border border-[#dde3ed]">
          <div className="flex items-start justify-between gap-space-sm mb-3">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-12 h-12 rounded-lg bg-[#e3e8f3] flex items-center justify-center shrink-0 text-[#070a0c]">
                <span className="material-symbols-outlined text-[26px]">badge</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-caps text-label-caps text-[#775a19] font-semibold uppercase tracking-wider">
                  Active Site Session
                </span>
                <h2 className="font-headline-sm text-headline-sm text-[#070a0c] font-medium truncate">
                  Manoj V.
                </h2>
                <span className="font-body-sm text-body-sm text-[#44474a] truncate">
                  Lead Site Supervisor
                </span>
              </div>
            </div>
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full shrink-0 ${
              isPunchedOut 
                ? 'bg-[#dde3ed] text-[#44474a]' 
                : isOnBreak
                ? 'bg-[#ffdea5] text-[#5d4201]'
                : 'bg-[#c9ebcd] text-[#04210e]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isPunchedOut ? 'bg-[#75777a]' : isOnBreak ? 'bg-[#775a19]' : 'bg-[#04210e] animate-pulse'
              }`}></span>
              <span className="font-label-sm text-label-sm font-medium">
                {isPunchedOut ? 'Punched Out' : isOnBreak ? 'On Break' : 'On Site'}
              </span>
            </div>
          </div>

          <div className="bg-[#eef4fe] rounded-lg p-2.5 mb-space-md flex flex-col gap-1.5 border border-[#dde3ed]">
            <div className="flex items-center justify-between text-[#161c23]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#775a19]">schedule</span>
                <span className="font-body-sm text-body-sm font-medium">Punched In at 08:32 AM</span>
              </div>
              <span className="font-code-data text-code-data text-[#44474a]" id="punchTimer">
                {isPunchedOut ? '04h 18m (Logged)' : punchDuration}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#44474a]">
              <span className="material-symbols-outlined text-[16px] text-[#070a0c]">near_me</span>
              <span className="font-code-data text-code-data truncate">OMR Site Office (12.9716° N, 80.2458° E)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleToggleBreak}
              disabled={isPunchedOut}
              className={`h-11 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 font-label-md text-label-md ${
                isOnBreak 
                  ? 'bg-[#ffdea5] text-[#261900] font-semibold' 
                  : 'bg-[#e3e8f3] text-[#161c23] hover:bg-[#dde3ed]'
              } ${isPunchedOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="material-symbols-outlined text-[18px]">coffee</span>
              <span>{isOnBreak ? 'End Break' : 'Log Break'}</span>
            </button>
            <button 
              onClick={handlePunchOut}
              disabled={isPunchedOut}
              className={`h-11 px-3 rounded-lg text-white transition-colors flex items-center justify-center gap-1.5 font-label-md text-label-md shadow-sm ${
                isPunchedOut 
                  ? 'bg-[#75777a] cursor-not-allowed opacity-70' 
                  : 'bg-[#1e2124] hover:bg-[#070a0c]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#fed488]">
                {isPunchedOut ? 'check_circle' : 'logout'}
              </span>
              <span>{isPunchedOut ? 'Punched Out' : 'Punch Out'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Assigned Project Workspace Summary Strip */}
      <div className="px-gutter-mobile mb-space-md">
        <div className="bg-[#ffffff] rounded-xl p-space-md shadow-sm flex flex-col gap-space-md border border-[#dde3ed]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-label-caps text-label-caps uppercase text-[#44474a] tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#775a19]">domain</span>
                Assigned Project Workspace
              </label>
              <span className="font-code-data text-code-data text-[#775a19] font-medium">PRJ-2024-OMR</span>
            </div>
            <div className="flex items-center justify-between bg-[#eef4fe] px-3 py-2.5 rounded-lg text-[#070a0c] border border-[#dde3ed]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[20px] text-[#775a19] shrink-0">apartment</span>
                <span className="font-body-md text-body-md font-medium truncate">The Courtyard Residence, OMR</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#44474a]">unfold_more</span>
            </div>
          </div>

          {/* Dynamic Counters */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#eef4fe] p-2.5 rounded-lg flex flex-col items-center justify-center border border-[#dde3ed]">
              <span className="font-label-caps text-label-caps uppercase text-[#44474a] tracking-wider">Total Crew</span>
              <span className="font-headline-sm text-headline-sm font-semibold text-[#070a0c] mt-0.5" id="summaryTotal">
                {totalCrewHeadcount}
              </span>
            </div>
            <div className="bg-[#eef4fe] p-2.5 rounded-lg flex flex-col items-center justify-center border border-[#dde3ed]">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#44474a] tracking-wider">Present</span>
              </div>
              <span className="font-headline-sm text-headline-sm font-semibold text-[#070a0c] mt-0.5" id="summaryPresent">
                {presentHeadcount}
              </span>
            </div>
            <div className="bg-[#eef4fe] p-2.5 rounded-lg flex flex-col items-center justify-center border border-[#dde3ed]">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#44474a] tracking-wider">Absent</span>
              </div>
              <span className="font-headline-sm text-headline-sm font-semibold text-[#ba1a1a] mt-0.5" id="summaryAbsent">
                {absentHeadcount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Staff & Site Crew Section */}
      <div className="px-gutter-mobile mb-space-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-headline-sm font-medium text-[#070a0c]">Staff & Site Crew</span>
            <span className="font-label-sm text-label-sm bg-[#e3e8f3] text-[#161c23] px-2 py-0.5 rounded-full font-medium">
              {crew.length} Units
            </span>
          </div>
          <button 
            onClick={() => {
              if (isLocked) return;
              onMarkAllPresent();
              onShowToast('All 6 crew units marked Present.');
            }}
            disabled={isLocked}
            className={`font-label-sm text-label-sm text-[#775a19] hover:text-[#5d4201] transition-colors font-medium flex items-center gap-0.5 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="material-symbols-outlined text-[16px]">done_all</span>
            Quick Mark All
          </button>
        </div>

        {/* Crew Roster Cards */}
        <div className="flex flex-col gap-2.5" id="crewRoster">
          {crew.map((member) => {
            const isSubcontractor = member.isSubcontractor;
            return (
              <div 
                key={member.id}
                className="bg-[#ffffff] rounded-xl p-space-sm shadow-sm flex flex-col gap-2.5 border border-[#dde3ed]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#e3e8f3] flex items-center justify-center text-[#070a0c] font-semibold text-label-md shrink-0">
                      {isSubcontractor ? (
                        <span className="material-symbols-outlined text-[18px]">carpenter</span>
                      ) : member.workerCount ? (
                        <span className="material-symbols-outlined text-[18px]">engineering</span>
                      ) : (
                        member.initials
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-body-md text-body-md font-medium text-[#070a0c] truncate">
                          {member.name}
                        </span>
                        {member.workerCount && (
                          <span className="font-label-caps text-label-caps bg-[#e3e8f3] px-1.5 py-0.2 rounded text-[#161c23]">
                            {member.workerCount} Workers
                          </span>
                        )}
                      </div>
                      <span className="font-label-sm text-label-sm text-[#44474a] truncate">
                        {member.role} • {member.time}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator Pill */}
                  <span className={`font-label-caps text-label-caps px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                    member.status === 'present'
                      ? 'bg-[#c9ebcd] text-[#04210e]'
                      : member.status === 'halfday'
                      ? 'bg-[#ffdea5] text-[#261900]'
                      : 'bg-[#ffdad6] text-[#93000a]'
                  }`}>
                    {member.status === 'present' 
                      ? 'Present' 
                      : member.status === 'halfday' 
                      ? (isSubcontractor ? '2 Pres / 2 Abs' : 'Half-Day') 
                      : 'Absent'}
                  </span>
                </div>

                {/* 3 Status Toggle Buttons */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#eef4fe] rounded-lg border border-[#dde3ed]">
                  <button 
                    type="button"
                    disabled={isLocked}
                    onClick={() => onUpdateCrewStatus(member.id, 'present')}
                    className={`h-9 rounded text-label-sm font-medium flex items-center justify-center gap-1 transition-all ${
                      member.status === 'present'
                        ? 'bg-[#1e2124] text-white shadow-sm'
                        : 'text-[#44474a] hover:text-[#070a0c]'
                    } ${isLocked ? 'cursor-not-allowed' : ''}`}
                  >
                    <span className="material-symbols-outlined text-[15px]">check</span> Pres.
                  </button>

                  <button 
                    type="button"
                    disabled={isLocked}
                    onClick={() => onUpdateCrewStatus(member.id, 'halfday')}
                    className={`h-9 rounded text-label-sm font-medium flex items-center justify-center gap-1 transition-all ${
                      member.status === 'halfday'
                        ? 'bg-[#1e2124] text-white shadow-sm'
                        : 'text-[#44474a] hover:text-[#070a0c]'
                    } ${isLocked ? 'cursor-not-allowed' : ''}`}
                  >
                    <span className="material-symbols-outlined text-[15px]">timelapse</span> 
                    {isSubcontractor ? 'Split' : 'Half'}
                  </button>

                  <button 
                    type="button"
                    disabled={isLocked}
                    onClick={() => onUpdateCrewStatus(member.id, 'absent')}
                    className={`h-9 rounded text-label-sm font-medium flex items-center justify-center gap-1 transition-all ${
                      member.status === 'absent'
                        ? 'bg-[#1e2124] text-white shadow-sm'
                        : 'text-[#44474a] hover:text-[#070a0c]'
                    } ${isLocked ? 'cursor-not-allowed' : ''}`}
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span> Abs.
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GPS Geofence Verified Card */}
      <div className="px-gutter-mobile mb-space-md">
        <div className="bg-[#ffffff] rounded-xl p-space-md shadow-sm flex flex-col gap-3 border border-[#dde3ed]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#c9ebcd] flex items-center justify-center text-[#04210e]">
                <span className="material-symbols-outlined text-[16px]">verified</span>
              </div>
              <span className="font-label-md text-label-md font-medium text-[#070a0c]">GPS Geofence Verified</span>
            </div>
            <span className="font-code-data text-code-data text-[#775a19]">Accurate ±3m</span>
          </div>
          <p className="font-body-sm text-body-sm text-[#44474a]">
            Site logs locked to current coordinates. Timestamp and telemetry will be signed by Manoj V. (Digital Cert: <span className="font-code-data text-code-data text-[#070a0c]">0x9F4C...B2</span>).
          </p>
          <button 
            onClick={handleSaveAttendance}
            disabled={isLocked}
            className={`w-full h-12 rounded-lg transition-all flex items-center justify-center gap-2 font-label-md text-label-md font-medium shadow-sm active:scale-[0.99] ${
              isLocked 
                ? 'bg-[#dde3ed] text-[#44474a] cursor-not-allowed' 
                : 'bg-[#775a19] text-white hover:bg-[#5d4201]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isLocked ? 'lock' : 'task_alt'}
            </span>
            <span>{isLocked ? 'Attendance Submitted (Locked)' : 'Save Daily Attendance'}</span>
          </button>

          {isLocked && (
            <div className="p-3 rounded-lg bg-[#c9ebcd] text-[#04210e] flex items-center gap-2 font-body-sm text-body-sm transition-all border border-[#aecfb2]">
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Attendance roster confirmed & locked for Thursday, Oct 24.</span>
            </div>
          )}
        </div>
      </div>

      {/* Attendance History (Recent) */}
      <div className="px-gutter-mobile mb-space-xl">
        <div className="bg-[#ffffff] rounded-xl p-space-md shadow-sm flex flex-col gap-3 border border-[#dde3ed]">
          <div className="flex items-center justify-between pb-2 border-b border-[#dde3ed]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#775a19]">history</span>
              <h3 className="font-label-md text-label-md font-medium text-[#070a0c]">Attendance History (Recent)</h3>
            </div>
            <span className="font-label-sm text-label-sm text-[#44474a]">Oct 2024</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eef4fe] border border-[#dde3ed]">
              <div className="flex items-center gap-2.5">
                <span className="font-code-data text-code-data font-semibold text-[#070a0c]">23 OCT</span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-[#070a0c] font-medium">Wednesday Log</span>
                  <span className="font-label-sm text-label-sm text-[#44474a]">14 Crew Total • Verified</span>
                </div>
              </div>
              <span className="font-code-data text-code-data text-[#775a19]">100% On-Time</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eef4fe] border border-[#dde3ed]">
              <div className="flex items-center gap-2.5">
                <span className="font-code-data text-code-data font-semibold text-[#070a0c]">22 OCT</span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-[#070a0c] font-medium">Tuesday Log</span>
                  <span className="font-label-sm text-label-sm text-[#44474a]">13 Present • 1 Leave</span>
                </div>
              </div>
              <span className="font-code-data text-code-data text-[#44474a]">Archived</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eef4fe] border border-[#dde3ed]">
              <div className="flex items-center gap-2.5">
                <span className="font-code-data text-code-data font-semibold text-[#070a0c]">21 OCT</span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-[#070a0c] font-medium">Monday Log</span>
                  <span className="font-label-sm text-label-sm text-[#44474a]">14 Crew Total • Verified</span>
                </div>
              </div>
              <span className="font-code-data text-code-data text-[#775a19]">100% On-Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

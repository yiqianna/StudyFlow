import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar } from "lucide-react";
import { Link } from "react-router";

// ── Data ────────────────────────────────────────────────────────────────────

interface CourseEvent {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  room: string;
  professor: string;
  color: string;
  bg: string;
  border: string;
  /** days of week: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat */
  days: number[];
  /** fractional hour in 24h, e.g. 10.5 = 10:30am */
  startHour: number;
  endHour: number;
}

const courses: CourseEvent[] = [
  {
    id: "info360",
    courseId: "info360",
    courseCode: "INFO 360",
    courseName: "Design Methods",
    room: "DEN 207",
    professor: "Prof. Kim",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    days: [2, 4], // Tue, Thu
    startHour: 10.5,
    endHour: 11.833,
  },
  {
    id: "math125",
    courseId: "math125",
    courseCode: "MATH 125",
    courseName: "Calculus I",
    room: "SAV 131",
    professor: "Prof. Chen",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    days: [1, 3, 5], // Mon, Wed, Fri
    startHour: 9,
    endHour: 10,
  },
  {
    id: "cse123",
    courseId: "cse123",
    courseCode: "CSE 123",
    courseName: "Data Structures",
    room: "EEB 045",
    professor: "Prof. Rao",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    days: [1, 3], // Mon, Wed
    startHour: 14.5,
    endHour: 15.833,
  },
  {
    id: "info360-lab",
    courseId: "info360",
    courseCode: "INFO 360 Lab",
    courseName: "Design Lab",
    room: "MGH 430",
    professor: "TA Session",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    days: [5], // Fri
    startHour: 13,
    endHour: 14,
  },
];

// ── Constants ────────────────────────────────────────────────────────────────

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABELS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];
const HOUR_START = 8; // 8 AM
const HOUR_END = 18;  // 6 PM
const HOURS = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i);
const PX_PER_HOUR = 72;

function formatHour(h: number) {
  const ampm = h >= 12 ? "PM" : "AM";
  const hr12 = h % 12 === 0 ? 12 : h % 12;
  return `${hr12}${ampm}`;
}

/** Convert fractional-hour (e.g. 10.5 = 10:30, 11.833 = 11:50) to "10:30am" */
function formatTime(h: number) {
  const totalMins = Math.round(h * 60);
  const hour24 = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  const ampm = hour24 >= 12 ? "pm" : "am";
  const hr12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return mins === 0
    ? `${hr12}${ampm}`
    : `${hr12}:${String(mins).padStart(2, "0")}${ampm}`;
}

function formatRange(start: number, end: number) {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

// Sunday-based week (S M T W T F S) matching JS getDay() 0=Sun
function getWeekDates(refDate: Date): Date[] {
  const d = new Date(refDate);
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - d.getDay()); // back to Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(sunday);
    dd.setDate(sunday.getDate() + i);
    return dd;
  });
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isToday(d: Date) {
  return isSameDay(d, new Date());
}

// ── Component ────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const today = new Date();
  const [refDate, setRefDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedEvent, setSelectedEvent] = useState<CourseEvent | null>(null);

  const weekDates = getWeekDates(refDate);

  // JS day index for selected date (0=Sun)
  const selectedDow = selectedDate.getDay();

  // Events that occur on selected day
  const dayEvents = courses.filter((c) => c.days.includes(selectedDow));

  const prevWeek = () => {
    const d = new Date(refDate);
    d.setDate(d.getDate() - 7);
    setRefDate(d);
  };

  const nextWeek = () => {
    const d = new Date(refDate);
    d.setDate(d.getDate() + 7);
    setRefDate(d);
  };

  const monthLabel = weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="flex flex-col" style={{ background: "transparent", minHeight: "100%" }}>
      {/* ── Header ── */}
      <header
        className="shrink-0 px-4 pt-5 pb-3"
        style={{ background: "transparent" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className="text-[22px] text-[#0f172a]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Schedule
            </h1>
            <p className="text-[11px] text-[#94a3b8] font-medium mt-0.5">{monthLabel}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevWeek}
              aria-label="Previous week"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              style={{ border: "1.5px solid #e2e8f0" }}
            >
              <ChevronLeft size={15} className="text-[#64748b]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => { setRefDate(today); setSelectedDate(today); }}
              className="rounded-full px-3 py-1 text-[11px] font-bold transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              style={{ background: "#0d9488", color: "#ffffff" }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={nextWeek}
              aria-label="Next week"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              style={{ border: "1.5px solid #e2e8f0" }}
            >
              <ChevronRight size={15} className="text-[#64748b]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Week strip ── */}
        <div
          className="flex rounded-[18px] p-2 gap-1"
          style={{ background: "#ffffff", border: "1.5px solid #e2e8f0" }}
        >
          {weekDates.map((date, i) => {
            const dow = date.getDay(); // 0=Sun
            const todayFlag = isToday(date);
            const selectedFlag = isSameDay(date, selectedDate);
            const hasEvents = courses.some((c) => c.days.includes(dow));

            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedDate(new Date(date))}
                className="flex flex-1 flex-col items-center gap-1 rounded-[13px] py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
                style={{
                  background: selectedFlag ? "#0d9488" : todayFlag ? "#f0fdfa" : "transparent",
                }}
                aria-label={`${DAY_LABELS[i]} ${date.getDate()}`}
                aria-pressed={selectedFlag}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wide"
                  style={{
                    color: selectedFlag ? "rgba(255,255,255,0.75)" : "#94a3b8",
                  }}
                >
                  {DAY_LABELS_SHORT[i]}
                </span>
                <span
                  className="text-[15px] font-bold"
                  style={{
                    color: selectedFlag ? "#ffffff" : todayFlag ? "#0d9488" : "#0f172a",
                  }}
                >
                  {date.getDate()}
                </span>
                {/* Dot indicator for days with classes */}
                <div
                  className="h-1 w-1 rounded-full"
                  style={{
                    background: hasEvents
                      ? selectedFlag ? "rgba(255,255,255,0.6)" : "#0d9488"
                      : "transparent",
                  }}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </header>

      {/* ── Day view ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">

        {/* No classes message */}
        {dayEvents.length === 0 && (
          <div
            className="mt-6 flex flex-col items-center justify-center rounded-[22px] py-12 px-6 text-center"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.6)" }}
          >
            <span className="text-4xl mb-3" aria-hidden="true">🏖️</span>
            <p className="text-[15px] font-bold text-[#0f172a]">No classes today</p>
            <p className="text-[12px] text-[#94a3b8] mt-1">Enjoy your free day!</p>
          </div>
        )}

        {/* Time grid */}
        {dayEvents.length > 0 && (
          <div className="mt-2 relative">
            {/* Hour rows */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="flex items-start gap-3"
                style={{ height: PX_PER_HOUR }}
              >
                {/* Hour label */}
                <div className="w-10 shrink-0 pt-0">
                  <span
                    className="text-[10px] font-semibold leading-none"
                    style={{ color: "#94a3b8" }}
                  >
                    {formatHour(hour)}
                  </span>
                </div>
                {/* Horizontal line */}
                <div
                  className="flex-1"
                  style={{ borderTop: "1.5px solid #c7d0e8" }}
                />
              </div>
            ))}

            {/* Current time indicator */}
            {isSameDay(selectedDate, today) && (() => {
              const now = new Date();
              const nowHour = now.getHours() + now.getMinutes() / 60;
              if (nowHour >= HOUR_START && nowHour < HOUR_END) {
                const top = (nowHour - HOUR_START) * PX_PER_HOUR;
                return (
                  <div
                    className="absolute right-0 flex items-center pointer-events-none"
                    style={{ top, left: 52 }}
                    aria-hidden="true"
                  >
                    <div
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ background: "#f43f5e" }}
                    />
                    <div
                      className="flex-1 border-t-2"
                      style={{ borderColor: "#f43f5e", opacity: 0.7 }}
                    />
                  </div>
                );
              }
              return null;
            })()}

            {/* Event blocks — absolutely positioned over the grid */}
            <div className="absolute inset-0" style={{ left: 52 }} aria-label="Course events">
              {dayEvents.map((ev) => {
                const top = (ev.startHour - HOUR_START) * PX_PER_HOUR;
                const height = (ev.endHour - ev.startHour) * PX_PER_HOUR;
                const isSelected = selectedEvent?.id === ev.id;

                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setSelectedEvent(isSelected ? null : ev)}
                    className="absolute left-0 right-0 rounded-[14px] px-3 py-2 text-left transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      top,
                      height: height - 4,
                      background: ev.bg,
                      border: `2px solid ${isSelected ? ev.color : ev.border}`,
                      boxShadow: isSelected
                        ? `0 4px 20px ${ev.color}30`
                        : "0 2px 8px rgba(0,0,0,0.05)",
                      "--tw-ring-color": ev.color,
                    } as React.CSSProperties}
                    aria-label={`${ev.courseCode}: ${formatRange(ev.startHour, ev.endHour)}`}
                    aria-expanded={isSelected}
                  >
                    <p
                      className="text-[12px] font-bold leading-tight truncate"
                      style={{ color: ev.color }}
                    >
                      {ev.courseCode}
                    </p>
                    {height >= 48 && (
                      <p
                        className="text-[10px] font-medium mt-0.5 truncate"
                        style={{ color: `${ev.color}99` }}
                      >
                        {formatRange(ev.startHour, ev.endHour)}
                      </p>
                    )}
                    {height >= 68 && (
                      <p
                        className="text-[10px] mt-0.5 truncate"
                        style={{ color: `${ev.color}80` }}
                      >
                        {ev.room}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Event detail card (tap-to-expand) ── */}
        {selectedEvent && (
          <div
            className="mt-4 rounded-[22px] overflow-hidden"
            style={{
              background: "#ffffff",
              border: `2px solid ${selectedEvent.border}`,
              boxShadow: `0 8px 28px ${selectedEvent.color}18`,
            }}
          >
            {/* Colored header strip */}
            <div
              className="px-5 py-4"
              style={{ background: selectedEvent.bg }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-[11px] font-bold tracking-widest uppercase"
                    style={{ color: `${selectedEvent.color}99` }}
                  >
                    {selectedEvent.courseName}
                  </p>
                  <p
                    className="text-[22px] font-bold mt-0.5"
                    style={{ color: selectedEvent.color, fontFamily: "var(--font-display)" }}
                  >
                    {selectedEvent.courseCode}
                  </p>
                </div>
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[16px]"
                  style={{ background: selectedEvent.color }}
                >
                  <Calendar size={20} className="text-white" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="px-5 py-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-[10px]"
                  style={{ background: selectedEvent.bg }}
                >
                  <Clock size={13} style={{ color: selectedEvent.color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a]">
                    {formatRange(selectedEvent.startHour, selectedEvent.endHour)}
                  </p>
                  <p className="text-[11px] text-[#94a3b8]">
                    {selectedEvent.days
                      .map((d) => DAY_LABELS[d])
                      .join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-[10px]"
                  style={{ background: selectedEvent.bg }}
                >
                  <MapPin size={13} style={{ color: selectedEvent.color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a]">{selectedEvent.room}</p>
                  <p className="text-[11px] text-[#94a3b8]">{selectedEvent.professor}</p>
                </div>
              </div>

              {/* Recurring days */}
              <div className="flex gap-1.5 mt-1">
                {["S","M","T","W","T","F","S"].map((d, i) => {
                  const active = selectedEvent.days.includes(i);
                  return (
                    <div
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                      style={
                        active
                          ? { background: selectedEvent.color, color: "#ffffff" }
                          : { background: "rgba(255,255,255,0.5)", color: "#94a3b8" }
                      }
                      aria-label={`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][i]}: ${active ? "class day" : "no class"}`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>

              {/* Go to tasks CTA */}
              <Link
                to={`/tasks/${selectedEvent.courseId}`}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-[14px] py-3 text-[13px] font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background: selectedEvent.color,
                  boxShadow: `0 4px 16px ${selectedEvent.color}35`,
                  "--tw-ring-color": selectedEvent.color,
                } as React.CSSProperties}
              >
                View Tasks for {selectedEvent.courseCode}
                <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}

        {/* ── Weekly summary ── */}
        <div
          className="mt-4 rounded-[20px] p-4"
          style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.6)" }}
        >
          <p className="text-[12px] font-bold text-[#64748b] uppercase tracking-widest mb-3">
            This Week
          </p>
          <div className="flex flex-col gap-2">
            {courses.map((ev) => (
              <div key={ev.id} className="flex items-center gap-3">
                <div
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: ev.color }}
                  aria-hidden="true"
                />
                <span className="text-[12px] font-bold text-[#0f172a] w-24 shrink-0">
                  {ev.courseCode}
                </span>
                <div className="flex gap-1 flex-wrap">
                  {ev.days.map((d) => (
                    <span
                      key={d}
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{ background: ev.bg, color: ev.color }}
                    >
                      {DAY_LABELS[d]}
                    </span>
                  ))}
                </div>
                <span className="ml-auto text-[10px] text-[#94a3b8] font-medium shrink-0">
                  {formatRange(ev.startHour, ev.endHour)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

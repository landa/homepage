"use client";

import {
  CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, TimeScale, Title,
  Tooltip
} from "chart.js";
import "chartjs-adapter-date-fns";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Line } from "react-chartjs-2";
import { BiCalendarCheck, BiTrendingDown, BiWalk } from "react-icons/bi";
import { BsCheckCircle, BsPencil } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { GiBiceps, GiSmallFire } from "react-icons/gi";
import { GrAddCircle } from "react-icons/gr";
import { MdNoFood } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

function dateToString(date) {
  return date.toISOString().split("T")[0];
}

function generateTrailingDates(end, count) {
  let dates = [];
  for (let ii = 0; ii < count; ++ii) {
    let date = new Date(end.getTime() - 1000 * 60 * 60 * 24 * ii);
    dates.push(date);
  }
  return dates;
}

function AddDataModal(props) {
  const { dialogOpen, setDialogOpen, profile, id, selectedDate } = props;
  const [weight, setWeight] = useState("");
  const [fasted, setFasted] = useState(false);
  const [cardio, setCardio] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [blundered, setBlundered] = useState(false);
  const [date, setDate] = useState(dateToString(selectedDate ?? new Date()));
  const ref = useRef();

  const clearInput = () => {
    setDate(dateToString(new Date()));
    setWeight("");
    setFasted(false);
    setCardio(false);
    setLifted(false);
    setBlundered(false);
  };

  useEffect(() => {
    const hasEntries = Boolean(profile && profile.entries);
    const hasDateEntry = hasEntries && Object.prototype.hasOwnProperty.call(profile.entries, date);
    if (!hasDateEntry) {
      setWeight("");
      setFasted(false);
      setCardio(false);
      setLifted(false);
      setBlundered(false);
    } else {
      setWeight(profile.entries[date]?.weight ?? "");
      setFasted(Boolean(profile.entries[date]?.fasted));
      setCardio(Boolean(profile.entries[date]?.cardio));
      setLifted(Boolean(profile.entries[date]?.lifted));
      setBlundered(Boolean(profile.entries[date]?.blundered));
    }
  }, [dialogOpen, profile, date]);

  return (
    dialogOpen && typeof document !== "undefined" && createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white text-black rounded-lg shadow-lg w-[360px] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">Add data for {profile.name || "Profile"}</div>
            <button className="pointer" onClick={() => setDialogOpen(false)}>
              <CgClose />
            </button>
          </div>
          <div className="flex items-center mb-3 justify-between">
            <div style={{ width: "60px" }} className="me-3">Date</div>
            <input
              type="date"
              value={date}
              className="flex-grow border border-gray-300 rounded px-2 py-1 text-[16px]"
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className="flex items-center mb-3 justify-between">
            <label style={{ width: "60px" }} className="me-3">Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              ref={ref}
              className="flex-grow border border-gray-300 rounded px-2 py-1 text-[16px]"
              style={{ backgroundColor: !weight ? "#fff0f0" : undefined }}
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input id="fasted" type="checkbox" checked={fasted} onChange={(e) => setFasted(e.target.checked)} />
            <label htmlFor="fasted">Fasted</label>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input id="cardio" type="checkbox" checked={cardio} onChange={(e) => setCardio(e.target.checked)} />
            <label htmlFor="cardio">Cardio</label>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input id="lifted" type="checkbox" checked={lifted} onChange={(e) => setLifted(e.target.checked)} />
            <label htmlFor="lifted">Lifted</label>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input id="blundered" type="checkbox" checked={blundered} onChange={(e) => setBlundered(e.target.checked)} />
            <label htmlFor="blundered">Blundered</label>
          </div>
          <div className="flex justify-between">
            <button
              className="px-3 py-1 rounded bg-black text-white"
              onClick={() => {
                if (!weight) {
                  ref.current.focus();
                  return;
                }
                const entry = {};
                entry[`entries.${date}`] = {
                  weight: weight,
                  fasted: fasted,
                  cardio: cardio,
                  lifted: lifted,
                  blundered: blundered,
                };
                updateDoc(doc(db, "profiles", id), entry)
                  .then(setDialogOpen(false))
                  .catch(console.error);
              }}
            >
              Save
            </button>
            <button
              className="px-3 py-1 rounded bg-red-600 text-white"
              onClick={() => {
                let entry = {};
                entry[`entries.${date}`] = null;
                updateDoc(doc(db, "profiles", id), entry)
                  .then(setDialogOpen(false))
                  .catch(console.error);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
}

export default function Profile(props) {
  const [profile, setProfile] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [date, setDate] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "profiles", props.id), (snapshot) => {
      setProfile(snapshot.exists() ? (snapshot.data() || {}) : {});
    });
    return () => unsubscribe();
  }, [props.id]);

  let dates = Object.entries(profile?.entries ?? {})
    .map(([date, value]) => (value != null ? [date, new Date(date)] : null))
    .filter((x) => x != null);
  dates.sort((a, b) => b[1].getTime() - a[1].getTime()); // reverse

  const firstDate = dates.length > 0 ? dates[dates.length - 1][1] : null;
  const firstWeight = dates.length > 0 ? profile?.entries[dates[dates.length - 1][0]]?.weight : null;
  const lastWeight = dates.length > 0 ? profile?.entries[dates[0][0]]?.weight : null;
  const lastDate = dates.length > 0 ? dates[0][1] : null;
  const hasTarget = Boolean(profile?.target?.date) && profile?.target?.weight != null;
  const hasEntries = dates.length > 0;
  const weightToLose = hasEntries && hasTarget ? lastWeight - profile.target.weight : null;
  const weightDown = hasEntries ? firstWeight - lastWeight : null;
  let daysLeft = null;
  if (hasTarget && lastDate) {
    daysLeft = new Date(profile.target.date).getTime() - new Date(lastDate).getTime();
    daysLeft /= 1000 * 60 * 60 * 24;
  }
  let daysElapsed = null;
  if (firstDate && lastDate) {
    daysElapsed = new Date(lastDate).getTime() - new Date(firstDate).getTime();
    daysElapsed /= 1000 * 60 * 60 * 24;
    daysElapsed = Math.floor(daysElapsed);
  }

  const trailingDates = lastDate ? generateTrailingDates(lastDate, 3).map(dateToString) : null;
  const trailingWeek = lastDate ? generateTrailingDates(lastDate, 7).map(dateToString) : null;
  const onRecordingStreak = trailingDates ? trailingDates.every((x) => x in (profile.entries || {})) : false;
  const averageWeight = onRecordingStreak
    ? trailingDates.map((x) => Number(profile.entries[x].weight)).reduce((acc, x) => acc + x, 0) / trailingDates.length
    : null;
  const onWeightStreak = onRecordingStreak && averageWeight != null && lastWeight != null ? lastWeight < averageWeight : false;
  const onFastingStreak = onRecordingStreak ? trailingDates.every((x) => profile.entries[x].fasted) : false;
  const onCardioStreak = trailingWeek ? trailingWeek.filter((x) => x in (profile.entries || {}) && profile.entries[x].cardio).length >= 3 : false;
  const onLiftingStreak = trailingWeek ? trailingWeek.filter((x) => x in (profile.entries || {}) && profile.entries[x].lifted).length >= 3 : false;
  let minWeight = null;
  
  if (profile?.entries && lastDate) {
    for (const date of generateTrailingDates(lastDate, (Object.keys(profile.entries) ?? []).length)) {
      if (!(dateToString(date) in profile.entries)) {
        continue;
      }
      const weight = profile.entries[dateToString(date)].weight;
      if (minWeight === null || weight < minWeight) {
        minWeight = weight;
      }
    }
  }

  const isLow = minWeight != null && lastWeight != null ? minWeight === lastWeight : false;

  if (profile.active === false) {
    return null;
  }

  return (
      <div>
        <AddDataModal
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          profile={profile}
          id={props.id}
          selectedDate={date}
          key={`${props.id}_${date}`}
        />
        <div className="inline-block mt-3 border border-gray-200 rounded-lg overflow-hidden bg-white text-black">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
            <div className="flex items-center">
              <div style={{ fontWeight: "500", marginRight: "0.5em" }}>{profile.name || "Profile"}</div>
              <div className="me-2">{weightToLose != null && "—"}</div>
              {weightToLose != null && daysElapsed != null && (
                <span>
                  {Math.abs(Number(weightDown).toFixed(1))} lbs {weightDown >= 0 ? "lost" : "gained"} in{" "}
                  {daysElapsed} day{daysElapsed !== 1 && "s"}
                </span>
              )}
            </div>
            <GrAddCircle className="pointer" onClick={() => { setDate(new Date()); setDialogOpen(true); }} />
          </div>
          <div className="p-0 bg-gray-50">
              {hasEntries && (
              <Line
                height={80}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      type: "time",
                      time: {
                        unit: "day",
                        tooltipFormat: "yyyy-MM-dd",
                      },
                      ticks: {
                        display: false,
                      },
                      grid: {
                        display: true,
                        color: "#eee",
                        drawBorder: true,
                        drawTicks: true,
                      },
                    },
                    y: {
                      ticks: {
                        display: false,
                      },
                      grid: {
                        display: true,
                        color: "#eee",
                        drawBorder: true,
                        drawTicks: true,
                      },
                    },
                  },
                  animation: false,
                  plugins: {
                    legend: null,
                  },
                }}
                data={{
                  labels: hasEntries ? [
                    ...dates.map((x) => new Date(`${x[0]}T10:00:00`)),
                    ...(hasTarget ? [new Date(`${profile.target.date}T10:00:00`)] : []),
                  ] : [],
                  datasets: [
                    hasEntries ? {
                      data: dates.map((x) => Number(profile.entries[x[0]].weight)),
                      borderColor: "black",
                      backgroundColor: "#aaac",
                      fill: true,
                    } : { data: [] },
                    hasEntries && hasTarget ? {
                      data: [...dates.map((x) => null), profile.target.weight],
                    } : { data: [] },
                  ],
                }}
              />)}
            </div>
            {hasEntries && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="px-3 py-2">
                        <div style={{ paddingBottom: "3px", fontWeight: "500" }} className="flex items-center justify-center">
                          <div>Date</div>
                          {onRecordingStreak && <BiCalendarCheck />}
                        </div>
                      </th>
                      <th className="px-3 py-2">
                        <div style={{ paddingBottom: "3px", fontWeight: "500" }} className="flex items-center justify-center">
                          <div>Weight</div>
                          {isLow ? <GiSmallFire style={{color: "#822"}} /> : onWeightStreak && <BiTrendingDown />}
                        </div>
                      </th>
                      <th className="px-3 py-2">
                        <div style={{ paddingBottom: "3px", fontWeight: "500" }} className="flex items-center justify-center">
                          <div>Fasted</div>
                          {onFastingStreak && <MdNoFood />}
                        </div>
                      </th>
                      <th className="px-3 py-2">
                        <div style={{ paddingBottom: "3px", fontWeight: "500" }} className="flex items-center justify-center">
                          <div>Cardio</div>
                          {onCardioStreak && <BiWalk />}
                        </div>
                      </th>
                      <th className="px-3 py-2">
                        <div style={{ paddingBottom: "3px", fontWeight: "500" }} className="flex items-center justify-center">
                          <div>Lifted</div>
                          {onLiftingStreak && <GiBiceps />}
                        </div>
                      </th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasTarget && (
                      <tr style={{ backgroundColor: "#fafafa" }}>
                        <td className="px-3 py-2">{profile.target.date}</td>
                        <td className="px-3 py-2">{profile.target.weight}</td>
                        <td className="px-3 py-2" colSpan={4}>
                          {weightToLose != null ? Math.abs(Number(weightToLose).toFixed(1)) : ""} lbs and {daysLeft != null ? Math.floor(daysLeft) : ""} days left
                        </td>
                      </tr>
                    )}
                    {dates.map(([label, date]) => {
                      const entry = profile.entries[dateToString(date)];
                      if (!entry) {
                        return null;
                      }
                      return (
                        <tr key={label}>
                          <td className={`px-3 py-2 ${entry.blundered ? "failure" : ""}`}>{label}</td>
                          <td className="px-3 py-2">{entry.weight}</td>
                          <td className={`px-3 py-2 ${entry.fasted ? "success" : "missing"}`}>
                            {entry.fasted ? <BsCheckCircle /> : <CgClose />}
                          </td>
                          <td className={`px-3 py-2 ${entry.cardio ? "success" : "missing"}`}>
                            {entry.cardio ? <BsCheckCircle /> : <CgClose />}
                          </td>
                          <td className={`px-3 py-2 ${entry.lifted ? "success" : "missing"}`}>
                            {entry.lifted ? <BsCheckCircle /> : <CgClose />}
                          </td>
                          <td className="px-3 py-2">
                            <BsPencil
                              className="pointer"
                              onClick={() => {
                                setDate(date);
                                setDialogOpen(true);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
  );
}

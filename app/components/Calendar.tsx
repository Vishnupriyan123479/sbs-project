"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
const QR = QRCode as any;
export default function Calendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const [wifiData, setWifiData] = useState(
  "WIFI:T:WPA;S:OPPO A53s 5g;P:1234567890;;"
);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">

        <div className="flex justify-between items-center">

          <button
            onClick={prevMonth}
            className="text-3xl hover:scale-125 transition"
          >
            ❮
          </button>

          <div className="flex gap-2">

            <select
              value={month}
              onChange={(e) => {
                const newDate = new Date(
                  year,
                  Number(e.target.value),
                  selectedDate.getDate()
                );

                setCurrentDate(newDate);
                setSelectedDate(newDate);
              }}
              className="bg-white text-black rounded-lg px-3 py-2"
            >
              {months.map((m, index) => (
                <option key={index} value={index}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => {
                const newDate = new Date(
                  Number(e.target.value),
                  month,
                  selectedDate.getDate()
                );

                setCurrentDate(newDate);
                setSelectedDate(newDate);
              }}
              className="bg-white text-black rounded-lg px-3 py-2"
            >
              {Array.from({ length: 31 }, (_, i) => 2010 + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

          </div>

          <button
            onClick={nextMonth}
            className="text-3xl hover:scale-125 transition"
          >
            ❯
          </button>

        </div>

      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center font-bold text-gray-600 mt-6 px-4">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 p-4">

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i}></div>
        ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = index + 1;

          const isToday =
            today.getDate() === date &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          const isSelected =
            selectedDate.getDate() === date &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          return (
            <div
              key={date}
              onClick={() => {
                const newDate = new Date(year, month, date);

                setSelectedDate(newDate);
                setCurrentDate(newDate);

                setWifiData(
                  "WIFI:T:WPA;S:OPPO A53s 5g;P:1234567890;;"
                );
              }}
              className={`h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300
                ${
                  isToday
                    ? "bg-blue-600 text-white font-bold"
                    : isSelected
                    ? "bg-green-500 text-white font-bold"
                    : "text-black hover:bg-gray-200"
                }`}
            >
              {date}
            </div>
          );
        })}

      </div>

      {/* Selected Date */}

      <div className="text-center pb-6 text-black">

        <h2 className="text-lg font-bold text-black mb-2">
          Selected Date
        </h2>

        <input
          type="date"
          value={formatDate(selectedDate)}
          onChange={(e) => {
            const [y, m, d] = e.target.value
              .split("-")
              .map(Number);

            const newDate = new Date(y, m - 1, d);

            setSelectedDate(newDate);
            setCurrentDate(newDate);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />

      </div>

      {/* Wi-Fi QR Code */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Wi-Fi QR Code
        </h2>

        <div className="flex justify-center">

          <QR
            value={wifiData}
            size={180}
          />

        </div>

        <div className="text-center mt-4 text-black">

          <p className="font-semibold">
            Wi-Fi Name : oppo a53s 5g
          </p>

          <p className="font-semibold">
            Password : 1234567890
          </p>

          <p className="text-green-600 mt-3">
            📱 Scan to Connect
          </p>

        </div>

      </div>

    </div>
  );
}

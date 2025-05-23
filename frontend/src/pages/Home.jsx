import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Link } from 'react-router-dom';

export default function Home() {
  const events = [
    { title: 'Pickup for Order #1', date: '2025-05-03' },
    { title: 'Install for Order #2', date: '2025-05-10' },
    { title: 'Drop-off for Order #3', date: '2025-05-15' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Streamline Your Work Orders
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">
          Quickly create, schedule, and track every job—all in one place.
        </p>
        <Link
          to="/workorders"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Create Orders</h3>
            <p>Easy form to add new jobs.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Schedule Events</h3>
            <p>Pickups, installs, drop-offs.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Status</h3>
            <p>Always know what’s in progress.</p>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-12 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Upcoming Events</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
          />
        </div>
      </section>
    </main>
  );
}

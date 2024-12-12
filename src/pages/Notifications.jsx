// import React, { useState, useEffect } from 'react';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);

//   const checkForUpdates = () => {
//     const storedReadingMangas = JSON.parse(localStorage.getItem('leyendo')) || [];
//     const updatedMangas = storedReadingMangas.filter(manga => {
//       const lastUpdated = new Date(manga.updatedAtSince);
//       const now = new Date();
//       const timeDifference = now - lastUpdated;
//       const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//       return timeDifference < oneDay; // Check if updated within the last 24 hours
//     });

//     setNotifications(updatedMangas);
//   };

//   useEffect(() => {
//     checkForUpdates(); // Initial check
//     const interval = setInterval(checkForUpdates, 10 * 60 * 1000); // Check every 10 minutes

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, []);

//   return (
//     <div className="notifications">
//       {notifications.length > 0 ? (
//         notifications.map((manga) => (
//           <div key={manga.id} className="notification">
//             <img src={manga.coverUrl} alt={manga.title} className="notification__cover" />
//             <div className="notification__details">
//               <h3 className="notification__title">{manga.title}</h3>
//               <p className="notification__message">Nuevo capítulo disponible</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No hay nuevas actualizaciones</p>
//       )}
//     </div>
//   );
// };

// export default Notifications;

// No puede llevarse a cabo ya que llego al limite de la api y acaba bloqueado

const Notifications = () => {
  return (
    <section className="notifications">
      <p>No hay nuevas actualizaciones</p>
    </section>
  );
}

export default Notifications;
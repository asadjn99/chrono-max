
    let currentTimezone = "Asia/Karachi";
    let currentCode = "PK";
    // let isDarkMode = true;
    let isDigitalView = true;
    let pinnedZones = JSON.parse(localStorage.getItem('pinnedZones') || '[]');

    const countries = [
      { zone: "Africa/Cairo", code: "EG", region: "Africa" },
      { zone: "Africa/Johannesburg", code: "ZA", region: "Africa" },
      { zone: "Africa/Lagos", code: "NG", region: "Africa" },
      { zone: "Africa/Nairobi", code: "KE", region: "Africa" },
      { zone: "Africa/Algiers", code: "DZ", region: "Africa" },
      { zone: "Africa/Casablanca", code: "MA", region: "Africa" },
      { zone: "Asia/Karachi", code: "PK", region: "Asia" },
      { zone: "Asia/Dubai", code: "AE", region: "Asia" },
      { zone: "Asia/Kolkata", code: "IN", region: "Asia" },
      { zone: "Asia/Shanghai", code: "CN", region: "Asia" },
      { zone: "Asia/Tokyo", code: "JP", region: "Asia" },
      { zone: "Asia/Seoul", code: "KR", region: "Asia" },
      { zone: "Asia/Hong_Kong", code: "HK", region: "Asia" },
      { zone: "Asia/Singapore", code: "SG", region: "Asia" },
      { zone: "Asia/Bangkok", code: "TH", region: "Asia" },
      { zone: "Asia/Jakarta", code: "ID", region: "Asia" },
      { zone: "Asia/Manila", code: "PH", region: "Asia" },
      { zone: "Asia/Dhaka", code: "BD", region: "Asia" },
      { zone: "Asia/Tehran", code: "IR", region: "Asia" },
      { zone: "Asia/Baghdad", code: "IQ", region: "Asia" },
      { zone: "Asia/Riyadh", code: "SA", region: "Asia" },
      { zone: "Asia/Kabul", code: "AF", region: "Asia" },
      { zone: "Asia/Tashkent", code: "UZ", region: "Asia" },
      { zone: "Asia/Kathmandu", code: "NP", region: "Asia" },
      { zone: "Asia/Colombo", code: "LK", region: "Asia" },
      { zone: "Europe/London", code: "GB", region: "Europe" },
      { zone: "Europe/Paris", code: "FR", region: "Europe" },
      { zone: "Europe/Berlin", code: "DE", region: "Europe" },
      { zone: "Europe/Rome", code: "IT", region: "Europe" },
      { zone: "Europe/Madrid", code: "ES", region: "Europe" },
      { zone: "Europe/Amsterdam", code: "NL", region: "Europe" },
      { zone: "Europe/Brussels", code: "BE", region: "Europe" },
      { zone: "Europe/Vienna", code: "AT", region: "Europe" },
      { zone: "Europe/Zurich", code: "CH", region: "Europe" },
      { zone: "Europe/Stockholm", code: "SE", region: "Europe" },
      { zone: "Europe/Oslo", code: "NO", region: "Europe" },
      { zone: "Europe/Copenhagen", code: "DK", region: "Europe" },
      { zone: "Europe/Helsinki", code: "FI", region: "Europe" },
      { zone: "Europe/Athens", code: "GR", region: "Europe" },
      { zone: "Europe/Moscow", code: "RU", region: "Europe" },
      { zone: "Europe/Istanbul", code: "TR", region: "Europe" },
      { zone: "Europe/Warsaw", code: "PL", region: "Europe" },
      { zone: "Europe/Prague", code: "CZ", region: "Europe" },
      { zone: "Europe/Budapest", code: "HU", region: "Europe" },
      { zone: "Europe/Bucharest", code: "RO", region: "Europe" },
      { zone: "Europe/Dublin", code: "IE", region: "Europe" },
      { zone: "Europe/Lisbon", code: "PT", region: "Europe" },
      { zone: "America/New_York", code: "US", region: "North America" },
      { zone: "America/Chicago", code: "US", region: "North America" },
      { zone: "America/Denver", code: "US", region: "North America" },
      { zone: "America/Los_Angeles", code: "US", region: "North America" },
      { zone: "America/Toronto", code: "CA", region: "North America" },
      { zone: "America/Vancouver", code: "CA", region: "North America" },
      { zone: "America/Mexico_City", code: "MX", region: "North America" },
      { zone: "America/Phoenix", code: "US", region: "North America" },
      { zone: "America/Anchorage", code: "US", region: "North America" },
      { zone: "America/Honolulu", code: "US", region: "North America" },
      { zone: "America/Sao_Paulo", code: "BR", region: "South America" },
      { zone: "America/Buenos_Aires", code: "AR", region: "South America" },
      { zone: "America/Lima", code: "PE", region: "South America" },
      { zone: "America/Bogota", code: "CO", region: "South America" },
      { zone: "America/Santiago", code: "CL", region: "South America" },
      { zone: "America/Caracas", code: "VE", region: "South America" },
      { zone: "Australia/Sydney", code: "AU", region: "Oceania" },
      { zone: "Australia/Melbourne", code: "AU", region: "Oceania" },
      { zone: "Australia/Brisbane", code: "AU", region: "Oceania" },
      { zone: "Australia/Perth", code: "AU", region: "Oceania" },
      { zone: "Pacific/Auckland", code: "NZ", region: "Oceania" },
      { zone: "Pacific/Fiji", code: "FJ", region: "Oceania" }
    ];

    let allCountries = [...countries];

    function loadCountryList() {
      const list = document.getElementById("countryList");
      const pinnedList = document.getElementById("pinnedList");
      list.innerHTML = '';
      pinnedList.innerHTML = '';

      if (pinnedZones.length > 0) {
        document.getElementById("pinnedSection").classList.remove("hidden");
        pinnedZones.forEach(zone => {
          const item = countries.find(c => c.zone === zone);
          if (item) pinnedList.appendChild(createListItem(item, true));
        });
      } else {
        document.getElementById("pinnedSection").classList.add("hidden");
      }

      allCountries.forEach(item => {
        if (!pinnedZones.includes(item.zone)) {
          list.appendChild(createListItem(item, false));
        }
      });
    }

    function createListItem(item, isPinned) {
      const li = document.createElement("li");
      li.className = `cursor-pointer px-4 py-3 rounded-lg transition-all duration-200 
                      hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 
                      hover:translate-x-2 flex items-center gap-3 border border-transparent 
                      hover:border-blue-500/30 group ${currentTimezone === item.zone ? 'bg-blue-500/20 border-blue-500/50' : ''}`;

      li.innerHTML = `
        <img src="https://flagsapi.com/${item.code}/flat/24.png" class="w-6 h-6 rounded-sm shadow-lg">
        <div class="flex-1" onclick="selectCountry('${item.zone}', '${item.code}')">
          <div class="text-white font-medium">${item.zone.replace(/_/g, ' ')}</div>
          <div class="text-gray-500 text-xs">${item.region}</div>
        </div>
        <button onclick="togglePin('${item.zone}')" class="text-sm px-2 py-1 rounded hover:bg-blue-500/20 transition-all">
          ${isPinned ? 'Unpin' : 'Pin'}
        </button>
      `;

      return li;
    }

    function togglePin(zone) {
      if (pinnedZones.includes(zone)) {
        pinnedZones = pinnedZones.filter(z => z !== zone);
      } else {
        pinnedZones.push(zone);
      }
      localStorage.setItem('pinnedZones', JSON.stringify(pinnedZones));
      loadCountryList();
      showNotification(pinnedZones.includes(zone) ? 'Pinned!' : 'Unpinned!');
    }

    function selectCountry(zone, code) {
      currentTimezone = zone;
      currentCode = code;
      document.getElementById("countryName").innerText = zone.replace(/_/g, ' ');
      document.getElementById("flagImg").src = `https://flagsapi.com/${code}/flat/32.png`;
      document.getElementById("errorMsg").classList.add("hidden");
      loadCountryList();
      updateClock();
    }

    function updateClock() {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: currentTimezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        const [h, m, s] = timeStr.split(':');

        // Update digital
        document.getElementById("time").innerHTML =
          `${h}:${m}<span class="text-blue-400 animate-pulse">${s}</span>`;
        document.getElementById("analogTime").textContent = `${h}:${m}:${s}`;

        // Update analog
        const hour = parseInt(h);
        const minute = parseInt(m);
        const second = parseInt(s);

        const hourAngle = (hour % 12) * 30 + minute * 0.5;
        const minuteAngle = minute * 6;
        const secondAngle = second * 6;

        document.getElementById("hourHand").style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
        document.getElementById("minuteHand").style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
        document.getElementById("secondHand").style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

        const dateStr = now.toLocaleDateString('en-US', {
          timeZone: currentTimezone,
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        document.getElementById("date").innerText = dateStr;

      } catch (err) {
        console.error("Error:", err);
        document.getElementById("errorMsg").classList.remove("hidden");
      }
    }

    function copyTime() {
      const time = document.getElementById("time").textContent;
      navigator.clipboard.writeText(time);
      showNotification('Time copied!');
    }

    function shareTime() {
      const text = `Current time in ${currentTimezone}: ${document.getElementById("time").textContent}`;
      if (navigator.share) {
        navigator.share({ text });
      } else {
        navigator.clipboard.writeText(text);
        showNotification('Link copied!');
      }
    }

    function showNotification(msg) {
      const notif = document.getElementById("notification");
      notif.textContent = msg;
      notif.classList.remove("hidden");
      setTimeout(() => notif.classList.add("hidden"), 2000);
    }

    // Theme toggle
    document.getElementById("themeToggle").onclick = () => {
      isDarkMode = !isDarkMode;
      const body = document.getElementById("mainBody");
      const sidebar = document.getElementById("sidebar");
      const searchBox = document.getElementById("searchBox");
      const buttons = document.querySelectorAll("button");
      
     
    };

    // View toggle
    document.getElementById("viewToggle").onclick = () => {
      isDigitalView = !isDigitalView;
      document.getElementById("digitalView").classList.toggle("hidden");
      document.getElementById("analogView").classList.toggle("hidden");
      document.getElementById("viewText").textContent = isDigitalView ? 'Analog' : 'Digital';
    };

    // Search
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('searchBox').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        allCountries = countries.filter(item => 
          item.zone.toLowerCase().includes(query) || 
          item.region.toLowerCase().includes(query)
        );
        loadCountryList();
      });
    });

    // Mobile menu
    document.getElementById("menuBtn").onclick = () => {
      document.getElementById("sidebar").classList.toggle("-translate-x-full");
    };

    document.getElementById("countryList").onclick = (e) => {
      if (window.innerWidth < 640) {
        document.getElementById("sidebar").classList.add("-translate-x-full");
      }
    };

    setInterval(updateClock, 1000);
    loadCountryList();
    updateClock();

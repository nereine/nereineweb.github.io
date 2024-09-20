let div0 = document.getElementById('date'); // Serious info
let div1 = document.getElementById('serious'); // Serious info
let div2 = document.getElementById('therest'); // Additional info
let div3 = document.getElementById('defindi'); // Loading status indicator for general data

const addDate = (date) => {
	let p = document.createElement('p');
	p.innerHTML = `Updated on: ${date}</div>`;
	div0.appendChild(p);
}

const addSerious = (label, content) => {
	let p = document.createElement('p');
	p.innerHTML = `<strong><div class="serious">${label}: ${content}</div></strong>`;
	div1.appendChild(p);
}

const addTheRest = (label, content) => {
	let p = document.createElement('p');
	p.innerHTML = `<div>${label}: ${content}</div>`;
	div2.appendChild(p);
}

const commas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// General COVID-19 data
(async () => {

	const url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json';

    try {
	   const res = await fetch(url);
	   const dat = await res.json();
	   const thData = dat.THA;
	   div3.remove();

	   const date = {
		   "Date": thData.last_updated_date
	   };
	   for (let k in date) {
		   addDate(date[k])
	   };

	   const serious = {
	       "New Cases": thData.new_cases,
	       "New Deaths": thData.new_deaths,
	       "New Vaccinations": thData.new_vaccinations,
	   };
	   for (let k in serious) {
			val = commas(serious[k]);
			addSerious(k, val);
	   };

	   const etc = {
	       "Total Deaths": thData.total_deaths,
	       "Total Cases": thData.total_cases,
	       "Total Tests": thData.total_tests,
		   "Vaccinated": thData.people_vaccinated,
	       "Vaccinated per Hundred": thData.people_vaccinated_per_hundred,
	       "Fully Vaccinated": thData.people_fully_vaccinated,
	       "Fully Vaccinated per Hundred": thData.people_fully_vaccinated_per_hundred,
		   "New Cases per Million": thData.new_deaths_per_million
	   };
	   for (let k in etc) {
		   val = commas(etc[k]);
		   addTheRest(k, val);
	   };

    } catch(err) {
		div3.innerHTML = `<p class="serious">Error fetching data from <a href="${url}">OWID</a></p>`;
		console.log(`Failed to fetch vaccination data: ${err}`);
    }
})();


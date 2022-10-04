// fetch data from the API
const fetchData = async () => {
  try {
    const res = await fetch(
      'https://services.odata.org/TripPinRESTierService/(S(hespbvdrrmhquk5vqlzcpbro))/People'
    );
    const data = await res.json();
    return data.value;
  } catch (err) {
    return console.log(err);
  }
};

export default fetchData;

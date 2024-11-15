// Tab navigation logic
const tabs = document.querySelectorAll('.tab');
const categories = document.querySelectorAll('.category');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(tab => tab.classList.remove('active-tab'));
    categories.forEach(category => category.classList.remove('active'));

    tab.classList.add('active-tab');
    const selectedTab = tab.getAttribute('data-tab');
    document.getElementById(selectedTab).classList.add('active');
  });
});

// Conversion logic
function convert() {
  const value = parseFloat(document.querySelector('.category.active input').value);
  if (isNaN(value)) return;

  let result;
  if (document.getElementById('distance').classList.contains('active')) {
    // Distance Conversion Logic
    const unitFrom = document.getElementById('unitFromDistance').value;
    const unitTo = document.getElementById('unitToDistance').value;
    result = convertDistance(value, unitFrom, unitTo);
  } else if (document.getElementById('weight').classList.contains('active')) {
    // Weight Conversion Logic
    const unitFrom = document.getElementById('unitFromWeight').value;
    const unitTo = document.getElementById('unitToWeight').value;
    result = convertWeight(value, unitFrom, unitTo);
  } else if (document.getElementById('temperature').classList.contains('active')) {
    // Temperature Conversion Logic
    const unitFrom = document.getElementById('unitFromTemperature').value;
    const unitTo = document.getElementById('unitToTemperature').value;
    result = convertTemperature(value, unitFrom, unitTo);
  }

  document.getElementById('convertedValue').textContent = result;
}

document.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('input', convert);
});

// Conversion Functions (Distance, Weight, Temperature)

// Distance Conversion Logic
function convertDistance(value, from, to) {
  const conversions = {
    meters: 1,
    kilometers: 1000,
    miles: 1609.34,
    centimeters: 0.01,
    millimeters: 0.001,
    inches: 0.0254,
  };

  if (from === to) return value;
  return (value * conversions[from]) / conversions[to];
}

// Weight Conversion Logic
function convertWeight(value, from, to) {
  const conversions = {
    grams: 1,
    kilograms: 1000,
    pounds: 453.592,
    ounces: 28.3495,
    stones: 6350.29,
  };

  if (from === to) return value;
  return (value * conversions[from]) / conversions[to];
}

// Temperature Conversion Logic
function convertTemperature(value, from, to) {
  if (from === to) return value;

  if (from === 'celsius') {
    if (to === 'fahrenheit') return (value * 9/5) + 32;
    if (to === 'kelvin') return value + 273.15;
  }
  if (from === 'fahrenheit') {
    if (to === 'celsius') return (value - 32) * 5/9;
    if (to === 'kelvin') return (value - 32) * 5/9 + 273.15;
  }
  if (from === 'kelvin') {
    if (to === 'celsius') return value - 273.15;
    if (to === 'fahrenheit') return (value - 273.15) * 9/5 + 32;
  }
  return value;
}

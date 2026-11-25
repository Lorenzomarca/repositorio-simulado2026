const URL_GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search'

export async function buscarCoordenadas(cidade) {
  const resposta = await fetch(
    `${URL_GEOCODING}?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`
  )

  if (!resposta.ok) {
    throw new Error('Erro ao buscar a cidade.')
  }

  const dados = await resposta.json()

  if (!dados.results || dados.results.length === 0) {
    throw new Error('Cidade não encontrada.')
  }

  return dados.results[0]
}
const URL_PREVISAO = 'https://api.open-meteo.com/v1/forecast'

export async function buscarClima(coordenadas) {
  const parametros = new URLSearchParams({
    latitude: coordenadas.latitude,
    longitude: coordenadas.longitude,

    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'weather_code',
      'wind_speed_10m'
    ].join(','),

    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'uv_index_max',
      'sunrise',
      'sunset'
    ].join(','),

    timezone: 'auto',
    forecast_days: '10'
  })

  const resposta = await fetch(`${URL_PREVISAO}?${parametros}`)

  if (!resposta.ok) {
    throw new Error('Não foi possível buscar os dados meteorológicos.')
  }

  const dados = await resposta.json()

  return dados
}
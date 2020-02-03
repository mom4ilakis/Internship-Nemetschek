import sys
import requests
import click

API_KEY = "b91abb81348473629b33669fb955de64"
url = "http://api.openweathermap.org/data/2.5/weather"


@click.command()
@click.argument("location")
@click.option("--temp-unit")
def main(location, temp_unit):
    units = "imperial" if temp_unit == "F" else "metric"
    params = {"q": location, "units": units, "APPID": API_KEY}
    print(url)
    r = requests.get(url, params)
    extract_data(r.json(), temp_unit)


def extract_data(weather_response, temp_unit):
    clouds = weather_response["weather"][0]["description"]
    min_temp = weather_response["main"]["temp_min"]
    max_temp = weather_response["main"]["temp_max"]
    cur_temp = weather_response["main"]["temp"]
    feelsLikeTemp = weather_response["main"]["feels_like"]
    humidity = weather_response["main"]["humidity"]
    description = """Today weather is: {}, \nCurrent temperature is: {} {}, \
feels like: {} {}, min: {} {}, max: {} {}, humidity is: {}%""".format(
        clouds, cur_temp, temp_unit, feelsLikeTemp, temp_unit,
        min_temp, temp_unit, max_temp, temp_unit, humidity
    )
    print(description)


if __name__ == "__main__":
    main()

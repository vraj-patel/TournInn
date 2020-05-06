# https://www.basketball-reference.com/leagues/NBA_2019_games-october.html

import csv
import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver


def scrape_games(season_years, months):
    for season_year in season_years:
        csv_file = open(
            f'./ml_server/datasets/raw/games_{season_year-1}_{season_year}.csv', 'w')
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(['Home', 'Home Points', 'Visitor', 'Visitor Points', ])

        for month in months:
            url = f'https://www.basketball-reference.com/leagues/NBA_{season_year}_games-{month}.html'

            driver = webdriver.Chrome()
            driver.get(url)
            time.sleep(5)
            res = driver.execute_script(
                "return document.documentElement.outerHTML")
            driver.quit()

            soup = BeautifulSoup(res, 'lxml')

            table = soup.find('div', id='div_schedule').table.tbody

            rows = table.find_all('tr')

            for row in rows:

                try:
                    tds = row.find_all('td')

                    visitor_name = tds[1].a.text
                    visitor_pts = tds[2].text
                    home_name = tds[3].a.text
                    home_pts = tds[4].text
                except:
                    continue

                csv_writer.writerow([home_name, home_pts, visitor_name, visitor_pts])

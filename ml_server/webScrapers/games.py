# https://www.basketball-reference.com/leagues/NBA_2019_games-october.html

from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time

months = ['october', 'november', 'december', 'january',
          'february', 'march', 'april', 'may', 'june']


for seasonYear in range(2016, 2020):
    csv_file = open(
        f'./ml_server/datasets/games/games_{seasonYear-1}_{seasonYear}.csv', 'w')
    csvWriter = csv.writer(csv_file)
    csvWriter.writerow(['Date', 'Start Time', 'Home', 'Home Points',
                        'Visitor', 'Visitor Points', 'Winner',
                        'Attendance'])

    for month in months:
        url = f'https://www.basketball-reference.com/leagues/NBA_{seasonYear}_games-{month}.html'

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
                ths = row.find_all('th')
                tds = row.find_all('td')
                date = ths[0].a.text
                startTime = tds[0].text
                visitorName = tds[1].a.text
                visitorPts = tds[2].text
                homeName = tds[3].a.text
                homePts = tds[4].text
                attendance = tds[7].text

                if int(homePts) > int(visitorPts):
                    winner = homeName
                else:
                    winner = visitorName

            except Exception as e:
                continue

            csvWriter.writerow([date, startTime, homeName, homePts,
                                visitorName, visitorPts, winner,
                                attendance])

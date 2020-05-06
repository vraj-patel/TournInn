from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time


def scrape_team_standings(season_years):
    for season_year in season_years:
        url = f'https://www.basketball-reference.com/leagues/NBA_{season_year}_standings.html'
        driver = webdriver.Chrome()

        driver.get(url)
        time.sleep(5)
        res = driver.execute_script("return document.documentElement.outerHTML")
        driver.quit()

        soup = BeautifulSoup(res, 'lxml')
        table = soup.find('table', id='expanded_standings').find('tbody')
        rows = table.findChildren('tr', recursive=False)

        csv_file = open(
            f'./ml_server/datasets/raw/teamStandings_{season_year-1}_{season_year}.csv', 'w')
        csv_writer = csv.writer(csv_file)

        csv_writer.writerow(['Team Name', 'Wins', 'Losses'])

        for row in rows:
            stats = row.find_all('td')

            if len(stats) != 23:
                continue

            team_name = stats[0].a.text
            win_loss_record = stats[1].text.split('-')

            wins = int(win_loss_record[0])
            losses = int(win_loss_record[1])

            csv_writer.writerow([team_name, wins, losses])

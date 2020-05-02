from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time

for seasonYear in range(2009, 2021):
    seasonStatsUrl = f'https://fantasydata.com/nba/fantasy-basketball-leaders?scope=1&season={seasonYear}&seasontype=1&conference=1&date=03-11-2020'
    driver = webdriver.Chrome()

    driver.get(seasonStatsUrl)
    time.sleep(5)
    res = driver.execute_script("return document.documentElement.outerHTML")
    driver.quit()

    soup = BeautifulSoup(res, 'lxml')
    statsGrid = soup.find('div', id="stats_grid")

    namesColumn = statsGrid.find(
        'div', class_="k-grid-content-locked").table.tbody
    statsColumn = statsGrid.find(
        'div', class_="k-grid-content k-auto-scrollable").table.tbody

    names = namesColumn.find_all('tr')
    stats = statsColumn.find_all('tr')

    csv_file = open(
        f'./ml_server/datasets/seasonStats/seasonStats{seasonYear}.csv', 'w')
    csvWriter = csv.writer(csv_file)
    csvWriter.writerow(['name', 'team', 'pos', 'gms', 'pts', 'reb', 'ast', 'blk', 'stl',
                        'fg%', 'ft%', '3p%', 'ftm', '2pm', '3pm', 'to', 'min', 'dd2', 'td3', 'fpts'])

    for i in range(len(names)):
        name = names[i].a.text
        statsRow = stats[i].find_all('td')
        team = statsRow[0].a.text
        pos = statsRow[1].span.text
        gms = statsRow[2].span.text
        pts = statsRow[3].text
        reb = statsRow[4].text
        ast = statsRow[5].text
        blk = statsRow[6].text
        stl = statsRow[7].text
        fgperc = statsRow[8].text
        ftperc = statsRow[9].text
        threepperc = statsRow[10].text
        ftm = statsRow[11].text
        twopm = statsRow[12].text
        threepm = statsRow[13].text
        to = statsRow[14].text
        min = statsRow[15].text
        dd2 = statsRow[16].text
        td3 = statsRow[17].text
        fpts = statsRow[18].span.text
        csvWriter.writerow([name, team, pos, gms, pts, reb, ast, blk, stl,
                            fgperc, ftperc, threepperc, ftm, twopm, threepm, to, min, dd2, td3, fpts])

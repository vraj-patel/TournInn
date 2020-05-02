from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time

# Stats for Lebron James

for seasonYear in range(2004, 2021):
    url = f'https://www.basketball-reference.com/players/j/jamesle01/gamelog/{seasonYear}/'
    driver = webdriver.Chrome()

    driver.get(url)
    time.sleep(5)
    res = driver.execute_script("return document.documentElement.outerHTML")
    driver.quit()

    soup = BeautifulSoup(res, 'lxml')
    tableBody = soup.find(
        'table', class_="row_summable sortable stats_table now_sortable").tbody
    rows = tableBody.find_all('tr')

    csv_file = open(
        f'./ml_server/datasets/playerGameStats/gameStats{seasonYear}.csv', 'w')
    csvWriter = csv.writer(csv_file)

    csvWriter.writerow(['game', 'date', 'age', 'playerTeam', 'homeGame', 'opponent', 'result', 'mp', 'fg',
                        'fga', 'fg%', '3p', '3pa', '3p%', 'ft', 'fta', 'ft%', 'orb', 'drb',
                        'trb', 'ast', 'stl', 'blk', 'tov', 'pf', 'pts', 'gameScoreStat'])
    for i in range(len(rows)):
        stats = rows[i].find_all('td')

        if len(stats) < 6:
            continue

        game = stats[0].text
        date = stats[1].a.text
        age = stats[2].text
        playerTeam = stats[3].a.text
        homeGame = False if stats[4].text == '@'else True
        opponent = stats[5].a.text
        result = stats[6].text

        if len(stats) < 9:
            csvWriter.writerow([game, date, age, playerTeam, homeGame, opponent, result, '', '',
                                '', '', '', '', '', '', '', '', '', '',
                                '', '', '', '', '', '', '', ''])
            continue

        mp = stats[7].text
        fg = stats[9].text
        fga = stats[10].text
        fgperc = stats[11].text
        threep = stats[12].text
        threepa = stats[13].text
        threepperc = stats[14].text
        ft = stats[15].text
        fta = stats[16].text
        ftperc = stats[17].text
        orb = stats[18].text
        drb = stats[19].text
        trb = stats[20].text
        ast = stats[21].text
        stl = stats[22].text
        blk = stats[23].text
        tov = stats[24].text
        pf = stats[25].text
        pts = stats[26].text
        gameScoreStat = stats[27].text

        csvWriter.writerow([game, date, age, playerTeam, homeGame, opponent, result, mp, fg,
                            fga, fgperc, threep, threepa, threepperc, ft, fta, ftperc, orb, drb,
                            trb, ast, stl, blk, tov, pf, pts, gameScoreStat])

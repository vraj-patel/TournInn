from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time

# Stats for Lebron James

for seasonYear in range(2016, 2020):
    url = f'https://www.basketball-reference.com/leagues/NBA_{seasonYear}_totals.html'
    driver = webdriver.Chrome()

    driver.get(url)
    time.sleep(5)
    res = driver.execute_script("return document.documentElement.outerHTML")
    driver.quit()

    soup = BeautifulSoup(res, 'lxml')
    table = soup.find('table', id='totals_stats').tbody
    rows = table.find_all('tr')

    csv_file = open(
        f'./ml_server/datasets/playerStats/playerStats_{seasonYear-1}_{seasonYear}.csv', 'w')
    csvWriter = csv.writer(csv_file)

    csvWriter.writerow(['Name', 'Pos', 'Age', 'Tm', 'G', 'GS', 'MP',
                        'FG', 'FGA', 'FG%',
                        '3P', '3PA', '3P%',
                        '2P', '2PA', '2P%',
                        'eFG%',
                        'FT', 'FTA', 'FT%',
                        'ORB', 'DRB', 'TRB',
                        'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS'])

    for row in rows:
        stats = row.find_all('td')

        if (len(stats) < 29):
            continue

        name = stats[0].a.text
        pos = stats[1].text
        age = stats[2].text

        try:
            tm = stats[3].a.text
        except Exception as e:
            tm = stats[3].text

        g = stats[4].text
        gs = stats[5].text
        mp = stats[6].text
        fg = stats[7].text
        fga = stats[8].text
        fgperc = stats[9].text
        threep = stats[10].text
        threepa = stats[11].text
        threepperc = stats[12].text
        twop = stats[13].text
        twopa = stats[14].text
        twopperc = stats[15].text
        efgperc = stats[16].text
        ft = stats[17].text
        fta = stats[18].text
        ftperc = stats[19].text
        orb = stats[20].text
        drb = stats[21].text
        trb = stats[22].text
        ast = stats[23].text
        stl = stats[24].text
        blk = stats[25].text
        tov = stats[26].text
        pf = stats[27].text
        pts = stats[28].text

        csvWriter.writerow([name, pos, age, tm, g, gs, mp,
                            fg, fga, fgperc,
                            threep, threepa, threepperc,
                            twop, twopa, twopperc,
                            efgperc,
                            ft, fta, ftperc,
                            orb, drb, trb,
                            ast, stl, blk, tov, pf, pts])

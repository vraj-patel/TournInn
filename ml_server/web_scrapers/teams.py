# https://www.basketball-reference.com/leagues/NBA_2019_games-october.html

import csv
import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver


csv_file = open(f'./ml_server/datasets/raw/teams.csv', 'w')
csv_writer = csv.writer(csv_file)
csv_writer.writerow(['Name'])

url = 'https://www.basketball-reference.com/teams/'

driver = webdriver.Chrome()
driver.get(url)
time.sleep(5)
res = driver.execute_script(
    "return document.documentElement.outerHTML")
driver.quit()

soup = BeautifulSoup(res, 'lxml')

table = soup.find('table', id='teams_active').tbody
rows = table.find_all('tr', class_='full_table')

for row in rows:
    name = row.find('th').a.text
    csv_writer.writerow([name])

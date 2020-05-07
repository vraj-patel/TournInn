import csv
import pandas as pd
import mysql.connector

cnx = mysql.connector.connect(user='root', password='whatIsLife42?', host='localhost', database='TournInn')
cursor = cnx.cursor()
csv_file = open('./ml_server/datasets/raw/db_games_2017_2018.csv', 'w')
csv_writer = csv.writer(csv_file)

query = 'SELECT team1Name, team1Score, team2Name, team2Score, homeTeam FROM games'
cursor.execute(query)
rows = cursor.fetchall()
csv_writer.writerow(['Team 1', 'Team 1 Points', 'Team 2', 'Team 2 Points', 'Home Team'])
csv_writer.writerows(rows)

import csv
import pandas as pd
import mysql.connector

cnx = mysql.connector.connect(user='root', password='whatIsLife42?', host='localhost', database='TournInn', autocommit=True)
cursor = cnx.cursor()


def export_games():
    csv_data = pd.read_csv('./ml_server/datasets/raw/games_2017_2018.csv')

    for row in csv_data.itertuples():
        get_team1_id = f"SELECT id FROM teams WHERE name = '{row.Home}'"
        get_team2_id = f"SELECT id FROM teams WHERE name = '{row.Visitor}'"

        cursor.execute(get_team1_id)
        team1_id = cursor.fetchone()[0]
        home_team = row.Home

        cursor.execute(get_team2_id)
        team2_id = cursor.fetchone()[0]
        team1_pts = row._2
        team2_pts = row._4

        if team1_pts > team2_pts:
            winner_id = team1_id
        else:
            winner_id = team2_id

        query = f"""
            INSERT INTO TournInn.games
            (winnerId, team1Id, team2Id, team1Score, team2Score, team1Name, team2Name, home_team, tournamentId, seasonId)
            VALUES
            ({winner_id}, {team1_id}, {team2_id}, {team1_pts}, {team2_pts}, '{row.Home}', '{row.Visitor}', '{home_team}', 1, 3)
        """
        cursor.execute(query)


def export_team_standings():
    csv_data = pd.read_csv('./ml_server/datasets/raw/team_standings_2016_2017.csv')
    seasonId = 2
    for row in csv_data.itertuples():
        query = f"""
            INSERT INTO TournInn.teamStandings
            (teamRank, teamName, wins, losses, seasonId)
            VALUES
            ({row.Index + 1}, '{row._1}', {row.Wins}, {row.Losses}, {seasonId})
        """
        cursor.execute(query)


export_games()
export_team_standings()

cursor.close()
cnx.close()

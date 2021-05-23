import csv
import pandas as pd
import mysql.connector

cnx = mysql.connector.connect(user='root', password='whatIsLife42?', host='localhost', database='TournInn', autocommit=True)
cursor = cnx.cursor()

def export_teams():
    csv_data = pd.read_csv('./ml_server/datasets/raw/teams.csv')

    for row in csv_data.itertuples():
        insert_team = f"INSERT INTO TournInn.teams (name, divisionId) VALUES ('{row.Name}', 2);"
        cursor.execute(insert_team)

        

def export_games():
    csv_data = pd.read_csv('./ml_server/datasets/raw/games_2017_2018.csv')

    for row in csv_data.itertuples():
        get_team1_id = f"SELECT id FROM teams WHERE name = '{row.Home}'"
        get_team2_id = f"SELECT id FROM teams WHERE name = '{row.Visitor}'"
        get_home_team_id =  f"SELECT id FROM teams WHERE name = '{row.Home}'"

        cursor.execute(get_team1_id)
        team1_id = cursor.fetchone()[0]
        home_team = row.Home

        cursor.execute(get_team2_id)
        team2_id = cursor.fetchone()[0]
        team1_pts = row._2
        team2_pts = row._4

        cursor.execute(get_home_team_id)
        home_team_id = cursor.fetchone()[0]

        if team1_pts > team2_pts:
            winner_id = team1_id
        else:
            winner_id = team2_id

        query = f"""
            INSERT INTO TournInn.games
            (winnerId, team1Id, team2Id, team1Score, team2Score, homeTeamId, tournamentId, seasonId, sport)
            VALUES
            ({winner_id}, {team1_id}, {team2_id}, {team1_pts}, {team2_pts}, '{home_team_id}', 1, 1, 'basketball')
        """
        cursor.execute(query)


def export_team_standings():
    csv_data = pd.read_csv('./ml_server/datasets/raw/team_standings_2016_2017.csv')
    seasonId = 2
    for row in csv_data.itertuples():
        query = f'SELECT id FROM teams WHERE name = "{row._1}"'
        cursor.execute(query)
        teamid = cursor.fetchone()[0]

        query = f"""
            INSERT INTO TournInn.teamStandings
            (teamRank, teamName, wins, losses, seasonId, teamId)
            VALUES
            ({row.Index + 1}, '{row._1}', {row.Wins}, {row.Losses}, {seasonId}, {teamid})
        """
        cursor.execute(query)

# export_teams()
# export_games()
# export_team_standings()

cursor.close()
cnx.close()

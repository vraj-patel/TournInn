from web_scrapers import games, team_standings

season_years = [2016, 2017, 2018, 2019]
months = ['october', 'november', 'december', 'january', 'february', 'march', 'april', 'may', 'june']

games.scrape_games(season_years, months)
team_standings.scrape_team_standings(season_years)

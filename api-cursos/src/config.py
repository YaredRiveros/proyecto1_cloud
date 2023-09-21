class DevelopmentConfig():
    DEBUG=True
    MYSQL_HOST = "database-1.czslunqzhzce.us-east-1.rds.amazonaws.com"
    MYSQL_USER = 'admin'
    MYSQL_PASSWORD = 'lVqArHhM1o4ZMzivVsaD'
    MYSQL_DB = 'universidad'

config = {
    'development':DevelopmentConfig
}
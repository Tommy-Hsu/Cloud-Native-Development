from datetime import datetime


def GetLeftTime(endDate: datetime):
    endDate = datetime.strptime(endDate, "%Y %m %d")
    return datetime.strftime(datetime.strptime(str(endDate - datetime.now()).split('.')[0], "%d days, %H:%M:%S"), "%Y %m %d %H %M %S")